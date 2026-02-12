import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faArrowLeft, 
    faSearch, 
    faFileInvoice, 
    faChevronLeft, 
    faChevronRight,
    faCalendarAlt,
    faFileExcel,
    faEye,
    faTimes,
    faReceipt,
    faUser,
    faCreditCard
} from '@fortawesome/free-solid-svg-icons';
import { getCiapagCobrancas, getCiapagCobranca, type CiapagInvoiceDetail } from '../../api/ciapag';
import { ID_RECEBEDOR_CIAPAG } from '../../auth/auth';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import ciapagLogo from '../../assets/Ciapag.png';

const ChargesPage: React.FC = () => {
    const [charges, setCharges] = useState<CiapagInvoiceDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [selectedCharge, setSelectedCharge] = useState<CiapagInvoiceDetail | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);
    
    // Filtros de Data (Padrão: últimos 30 dias)
    const [createdSince, setCreatedSince] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        return date.toISOString().split('T')[0];
    });
    const [createdUntil, setCreatedUntil] = useState(() => {
        return new Date().toISOString().split('T')[0];
    });

    const fetchCharges = async () => {
        setLoading(true);
        try {
            const data = await getCiapagCobrancas(
                ID_RECEBEDOR_CIAPAG, 
                createdSince, 
                createdUntil, 
                page, 
                pageSize
            );
            setCharges(data);
        } catch (error) {
            console.error("Erro ao buscar cobranças", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharges();
    }, [page]); // Recarrega quando a página muda

    const handleSearch = () => {
        setPage(1); // Reseta para a primeira página ao filtrar
        fetchCharges();
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(p => p - 1);
    };

    const handleNextPage = () => {
        // Se o número de itens retornados for menor que o tamanho da página, provavelmente é a última página
        if (charges.length === pageSize) setPage(p => p + 1);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount / 100);
    };

    const handleOpenCharge = async (id: string) => {
        setIsModalOpen(true);
        setDetailLoading(true);
        try {
            const data = await getCiapagCobranca(id);
            setSelectedCharge(data);
        } catch (error) {
            console.error("Erro ao buscar detalhes da cobrança", error);
        } finally {
            setDetailLoading(false);
        }
    };

    const handleCloseCharge = () => {
        setIsModalOpen(false);
        setSelectedCharge(null);
    };

    const generateInvoicePDF = (invoice: CiapagInvoiceDetail, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();

        const doc = new jsPDF();
        const img = new Image();
        img.src = ciapagLogo;

        img.onload = () => {
            // Logo
            doc.addImage(img, 'PNG', 14, 10, 35, 10);

            // Header
            doc.setFontSize(22);
            doc.setTextColor(40, 40, 40);
            doc.text("Recibo de Pagamento", 105, 20, { align: "center" });
            
            // Info Box
            doc.setDrawColor(220, 220, 220);
            doc.setFillColor(250, 250, 250);
            doc.roundedRect(14, 30, 182, 30, 3, 3, 'FD');
            
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text("Fatura", 20, 40);
            doc.text("Data", 80, 40);
            doc.text("Status", 140, 40);
            
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text(invoice.code, 20, 48);
            doc.text(new Date(invoice.created_at).toLocaleDateString('pt-BR'), 80, 48);
            
            const status = invoice.status === 'paid' ? 'PAGO' : invoice.status.toUpperCase();
            if (invoice.status === 'paid') doc.setTextColor(0, 128, 0);
            else doc.setTextColor(200, 150, 0);
            doc.text(status, 140, 48);
            
            // Customer
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(14);
            doc.text("Dados do Cliente", 14, 75);
            doc.setLineWidth(0.5);
            doc.line(14, 78, 196, 78);
            
            doc.setFontSize(10);
            doc.text(`Nome: ${invoice.customer.name}`, 14, 88);
            doc.text(`Documento: ${invoice.customer.document}`, 14, 94);
            doc.text(`Email: ${invoice.customer.email}`, 14, 100);
            
            // Payment Details
            doc.setFontSize(14);
            doc.text("Detalhes do Pagamento", 14, 115);
            doc.line(14, 118, 196, 118);
            
            doc.setFontSize(10);
            const transaction = invoice.last_transaction;
            if (transaction) {
                doc.text(`Método: ${invoice.payment_method === 'credit_card' ? 'Cartão de Crédito' : invoice.payment_method}`, 14, 128);
                if (transaction.card) {
                    doc.text(`Cartão: ${transaction.card.brand} **** ${transaction.card.last_four_digits}`, 14, 134);
                }
                doc.text(`Parcelas: ${transaction.installments}x`, 14, 140);
                doc.text(`NSU: ${transaction.acquirer_nsu}`, 14, 146);
            }
            
            // Total
            doc.setFillColor(240, 248, 255);
            doc.rect(14, 160, 182, 20, 'F');
            doc.setFontSize(16);
            doc.setTextColor(0, 0, 0);
            doc.text(`Valor Total: ${formatCurrency(invoice.amount)}`, 185, 173, { align: "right" });
            
            // Footer
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(`ID da Transação: ${invoice.id}`, 14, 280);
            doc.text("Gerado via Cia das Compras", 196, 280, { align: "right" });

            doc.save(`Fatura_${invoice.code}.pdf`);
        };
    };

    const handleExportExcel = () => {
        if (charges.length === 0) return;

        const data = charges.map(charge => ({
            'Código': charge.code,
            'Data': new Date(charge.created_at).toLocaleDateString('pt-BR'),
            'Cliente': charge.customer.name,
            'Documento': charge.customer.document,
            'Valor': (charge.amount / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            'Status': charge.status === 'paid' ? 'Pago' : 
                      charge.status === 'pending' ? 'Pendente' :
                      charge.status === 'failed' ? 'Falhou' :
                      charge.status === 'canceled' ? 'Cancelada' :
                      charge.status
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Cobranças");
        XLSX.writeFile(wb, `Cobrancas_${createdSince}_ate_${createdUntil}.xlsx`);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            {/* Header com Link de Navegação */}
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Relatório de Cobranças</h1>
                    <nav className="flex text-sm text-gray-500 mt-1">
                        <Link to="/seller/ciapag" className="hover:text-blue-600 transition-colors flex items-center">
                            <FontAwesomeIcon icon={faArrowLeft} className="mr-1" /> Voltar para Painel CiaPag
                        </Link>
                    </nav>
                </div>
            </div>

            {/* Filtros */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-6">
                <div className="flex flex-wrap gap-4 items-end">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">
                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                            Data Inicial
                        </label>
                        <input 
                            type="date" 
                            value={createdSince}
                            onChange={(e) => setCreatedSince(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-600"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">
                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                            Data Final
                        </label>
                        <input 
                            type="date" 
                            value={createdUntil}
                            onChange={(e) => setCreatedUntil(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-600"
                        />
                    </div>
                    <button 
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 h-[38px] shadow-sm"
                    >
                        <FontAwesomeIcon icon={faSearch} /> Filtrar
                    </button>
                    <button 
                        onClick={handleExportExcel}
                        disabled={charges.length === 0}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors flex items-center gap-2 h-[38px] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FontAwesomeIcon icon={faFileExcel} /> Exportar
                    </button>
                </div>
            </div>

            {/* Tabela */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-700 font-semibold uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-4 border-b border-gray-100">Código</th>
                                <th className="px-6 py-4 border-b border-gray-100">Data</th>
                                <th className="px-6 py-4 border-b border-gray-100">Cliente</th>
                                <th className="px-6 py-4 border-b border-gray-100">Valor</th>
                                <th className="px-6 py-4 border-b border-gray-100">Status</th>
                                <th className="px-6 py-4 border-b border-gray-100 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan={6} className="text-center py-12 text-gray-500">Carregando cobranças...</td></tr>
                            ) : charges.length === 0 ? (
                                <tr><td colSpan={6} className="text-center py-12 text-gray-500">Nenhuma cobrança encontrada para o período selecionado.</td></tr>
                            ) : (
                                charges.map(invoice => (
                                    <tr key={invoice.id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="px-6 py-4 font-medium text-blue-600">{invoice.code}</td>
                                        <td className="px-6 py-4">{new Date(invoice.created_at).toLocaleDateString('pt-BR')}</td>
                                        <td className="px-6 py-4 font-medium text-gray-800">{invoice.customer.name}</td>
                                        <td className="px-6 py-4 font-bold text-gray-700">{formatCurrency(invoice.amount)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${
                                                invoice.status === 'paid' ? 'bg-green-100 text-green-700' : 
                                                invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                invoice.status === 'failed' ? 'bg-red-100 text-red-700' :
                                                invoice.status === 'canceled' ? 'bg-gray-200 text-gray-600' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                                {invoice.status === 'paid' ? 'Pago' : 
                                                 invoice.status === 'pending' ? 'Pendente' :
                                                 invoice.status === 'failed' ? 'Falhou' :
                                                 invoice.status === 'canceled' ? 'Cancelada' :
                                                 invoice.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <button 
                                                    onClick={() => handleOpenCharge(invoice.id)}
                                                    className="text-gray-500 hover:text-blue-600 font-medium text-xs flex items-center gap-1 transition-colors"
                                                    title="Ver Detalhes"
                                                >
                                                    <FontAwesomeIcon icon={faEye} /> Detalhes
                                                </button>
                                                <button 
                                                    onClick={(e) => generateInvoicePDF(invoice, e)}
                                                    className="text-gray-500 hover:text-blue-600 font-medium text-xs flex items-center gap-1 transition-colors"
                                                    title="Baixar PDF"
                                                >
                                                    <FontAwesomeIcon icon={faFileInvoice} /> PDF
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Paginação */}
                <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
                    <span className="text-sm text-gray-500 font-medium">Página {page}</span>
                    <div className="flex gap-2">
                        <button 
                            onClick={handlePrevPage} 
                            disabled={page === 1}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 transition-colors shadow-sm"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} /> Anterior
                        </button>
                        <button 
                            onClick={handleNextPage}
                            disabled={charges.length < pageSize}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 transition-colors shadow-sm"
                        >
                            Próximo <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal de Detalhes */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] animate-scale-in flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center flex-shrink-0">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faReceipt} className="text-blue-600" />
                                    Detalhes da Cobrança
                                </h3>
                                {selectedCharge && <p className="text-sm text-gray-500">ID: {selectedCharge.id}</p>}
                            </div>
                            <button onClick={handleCloseCharge} className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100">
                                <FontAwesomeIcon icon={faTimes} className="text-xl" />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6 overflow-y-auto flex-grow pr-4">
                            {detailLoading ? (
                                <div className="flex justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                </div>
                            ) : selectedCharge ? (
                                <>
                                    {/* Status and Amount */}
                                    <div className="flex flex-col sm:flex-row gap-4 justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Status</p>
                                            <span className={`px-3 py-1 rounded-full text-sm font-bold capitalize ${
                                                selectedCharge.status === 'paid' ? 'bg-green-100 text-green-700' : 
                                                selectedCharge.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                selectedCharge.status === 'failed' ? 'bg-red-100 text-red-700' :
                                                selectedCharge.status === 'canceled' ? 'bg-gray-200 text-gray-600' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                                {selectedCharge.status === 'paid' ? 'Pago' : 
                                                 selectedCharge.status === 'pending' ? 'Pendente' :
                                                 selectedCharge.status === 'failed' ? 'Falhou' :
                                                 selectedCharge.status === 'canceled' ? 'Cancelada' :
                                                 selectedCharge.status}
                                            </span>
                                        </div>
                                        <div className="text-left sm:text-right">
                                            <p className="text-sm text-gray-500 mb-1">Valor Total</p>
                                            <p className="text-2xl font-bold text-gray-800">{formatCurrency(selectedCharge.amount)}</p>
                                        </div>
                                    </div>

                                    {/* Customer */}
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                            <FontAwesomeIcon icon={faUser} className="text-gray-400" /> Cliente
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                            <div className="p-3 border border-gray-100 rounded-lg">
                                                <p className="text-gray-500 text-xs">Nome</p>
                                                <p className="font-medium text-gray-800">{selectedCharge.customer.name}</p>
                                            </div>
                                            <div className="p-3 border border-gray-100 rounded-lg">
                                                <p className="text-gray-500 text-xs">Email</p>
                                                <p className="font-medium text-gray-800">{selectedCharge.customer.email}</p>
                                            </div>
                                            <div className="p-3 border border-gray-100 rounded-lg">
                                                <p className="text-gray-500 text-xs">Documento</p>
                                                <p className="font-medium text-gray-800">{selectedCharge.customer.document}</p>
                                            </div>
                                            <div className="p-3 border border-gray-100 rounded-lg">
                                                <p className="text-gray-500 text-xs">Telefone</p>
                                                <p className="font-medium text-gray-800">
                                                    ({selectedCharge.customer.phones.mobile_phone.area_code}) {selectedCharge.customer.phones.mobile_phone.number}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Transaction */}
                                    {selectedCharge.last_transaction && (
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                                <FontAwesomeIcon icon={faCreditCard} className="text-gray-400" /> Transação
                                            </h4>
                                            <div className="bg-white border border-gray-200 rounded-xl p-4">
                                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                                            <FontAwesomeIcon icon={faCreditCard} />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-800">{selectedCharge.last_transaction.card?.brand || 'Cartão'}</p>
                                                            <p className="text-xs text-gray-500">**** {selectedCharge.last_transaction.card?.last_four_digits || '****'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-gray-800">{selectedCharge.last_transaction.installments}x</p>
                                                        <p className="text-xs text-gray-500">Parcelas</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-gray-500 text-xs">NSU</p>
                                                        <p className="font-medium">{selectedCharge.last_transaction.acquirer_nsu}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500 text-xs">Autorização</p>
                                                        <p className="font-medium">{selectedCharge.last_transaction.acquirer_auth_code}</p>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <p className="text-gray-500 text-xs">Mensagem da Adquirente</p>
                                                        <p className="font-medium text-green-600">{selectedCharge.last_transaction.acquirer_message}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Splits */}
                                    {selectedCharge.last_transaction?.split && selectedCharge.last_transaction.split.length > 0 && (
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-3">Divisão de Pagamento (Split)</h4>
                                            <div className="space-y-2">
                                                {selectedCharge.last_transaction.split.map((split: any) => (
                                                    <div key={split.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm">
                                                        <span className="text-gray-700 font-medium">{split.recipient.name}</span>
                                                        <span className="font-bold text-gray-800">{formatCurrency(split.amount)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-8 text-gray-500">Não foi possível carregar os detalhes da cobrança.</div>
                            )}

                        </div>
                        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end gap-3 flex-shrink-0">
                            <button 
                                onClick={() => selectedCharge && generateInvoicePDF(selectedCharge)}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faFileInvoice} />
                                Baixar PDF
                            </button>
                            <button onClick={handleCloseCharge} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-colors">
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChargesPage;
