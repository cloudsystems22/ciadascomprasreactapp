import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faLandmark, 
    faWallet, 
    faCreditCard, 
    faPlus, 
    faCheck, 
    faArrowDown, 
    faArrowUp,
    faExclamationCircle,
    faFileInvoice,
    faCheckCircle,
    faClock,
    faTimes,
    faReceipt,
    faUser,
    faSearch
} from '@fortawesome/free-solid-svg-icons';
import { faCcMastercard } from '@fortawesome/free-brands-svg-icons';
import { getCiapagSaldo, getCiapagExtrato, getCiapagRecebiveis, getCiapagCobranca, type CiapagSaldoResponse, type ExtratoItem, type CiapagReceivable, type CiapagInvoiceDetail } from '../../api/ciapag';
import { ID_RECEBEDOR_CIAPAG } from '../../auth/auth';

// --- Dados Mocados ---
interface TransactionItem {
    icon: any;
    color: string;
    title: string;
    date: string;
    amount: string;
}

interface GroupedTransaction {
    date: string;
    items: TransactionItem[];
}

// --- Componente Principal ---

const CiapagSeller: React.FC = () => {
    const [saldoData, setSaldoData] = useState<CiapagSaldoResponse | null>(null);
    const [transactions, setTransactions] = useState<GroupedTransaction[]>([]);
    const [invoices, setInvoices] = useState<CiapagReceivable[]>([]);
    const [selectedInvoice, setSelectedInvoice] = useState<CiapagInvoiceDetail | null>(null);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [transactionsLoading, setTransactionsLoading] = useState(true);
    const [invoicesLoading, setInvoicesLoading] = useState(true);
    const [invoiceDetailLoading, setInvoiceDetailLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    });

    const fetchAllData = async () => {
        // Fetch Saldo
        try {
            const data = await getCiapagSaldo(ID_RECEBEDOR_CIAPAG);
            setSaldoData(data);
        } catch (error) {
            console.error("Erro ao carregar saldo", error);
        } finally {
            setLoading(false);
        }

        // Fetch Extrato
        setTransactionsLoading(true);
        try {
            const today = new Date();
            // Usando a data selecionada como início
            const endDate = today.toISOString().split('T')[0];

            const extratoData = await getCiapagExtrato(ID_RECEBEDOR_CIAPAG, selectedDate, endDate, 'available');

            const grouped = extratoData.data.reduce((acc, item) => {
                const d = new Date(item.created_at);
                const month = d.toLocaleString('pt-BR', { month: 'long' });
                const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
                const dateStr = `${d.getDate()} ${capitalizedMonth} ${d.getFullYear()}`;

                if (!acc[dateStr]) {
                    acc[dateStr] = [];
                }
                acc[dateStr].push(item);
                return acc;
            }, {} as Record<string, ExtratoItem[]>);

            const getTitle = (item: ExtratoItem): string => {
                switch (item.type) {
                    case 'payable': return 'Pagamento Recebido';
                    case 'transfer': return 'Saque via PIX';
                    case 'refund': return 'Reembolso';
                    case 'chargeback': return 'Estorno Recebido';
                    default: return 'Transação';
                }
            };

            const formattedTransactions: GroupedTransaction[] = Object.keys(grouped)
                .sort((a, b) => {
                    const dateA = new Date(a.replace(/(\d+) (\w+) (\d+)/, '$2 $1, $3'));
                    const dateB = new Date(b.replace(/(\d+) (\w+) (\d+)/, '$2 $1, $3'));
                    return dateB.getTime() - dateA.getTime();
                })
                .map(dateStr => ({
                    date: dateStr,
                    items: grouped[dateStr]
                        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                        .map((item: ExtratoItem): TransactionItem => {
                            const isCredit = item.amount > 0;
                            const d = new Date(item.created_at);
                            const monthShort = d.toLocaleString('pt-BR', { month: 'short' }).replace('.', '');
                            const time = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: true });

                            return {
                                icon: isCredit ? faArrowUp : faArrowDown,
                                color: isCredit ? 'text-green-500' : 'text-red-500',
                                title: getTitle(item),
                                date: `${d.getDate()} ${monthShort} ${d.getFullYear()}, às ${time}`,
                                amount: formatTransactionAmount(item.amount),
                            };
                        }),
                }));
            
            setTransactions(formattedTransactions);
        } catch (error) {
            console.error("Erro ao carregar extrato", error);
        } finally {
            setTransactionsLoading(false);
        }

        // Fetch Recebíveis (Faturas)
        setInvoicesLoading(true);
        try {
            const data = await getCiapagRecebiveis(ID_RECEBEDOR_CIAPAG, selectedDate);
            setInvoices(data);
        } catch (error) {
            console.error("Erro ao carregar faturas", error);
        } finally {
            setInvoicesLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, [selectedDate]);

    const handleOpenInvoice = async (chargeId: string) => {
        setIsInvoiceModalOpen(true);
        setInvoiceDetailLoading(true);
        setSelectedInvoice(null);
        try {
            const data = await getCiapagCobranca(chargeId);
            setSelectedInvoice(data);
        } catch (error) {
            console.error("Failed to fetch invoice details", error);
        } finally {
            setInvoiceDetailLoading(false);
        }
    };

    const handleCloseInvoice = () => {
        setIsInvoiceModalOpen(false);
        setSelectedInvoice(null);
    };

    const formatCurrency = (amount: number) => {
        // A API retorna o valor em centavos (inteiro), então dividimos por 100
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount / 100);
    };

    const formatTransactionAmount = (amount: number): string => {
        const value = amount / 100;
        const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Math.abs(value));
        if (amount > 0) {
            return `+ ${formatted}`;
        }
        return `- ${formatted}`;
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Carregando informações financeiras...</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            {/* Cabeçalho */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Faturamento CiaPag</h1>
                    <p className="text-gray-500">Gerencie suas transações e faturamento.</p>
                </div>
                <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                    <span className="text-sm text-gray-500 font-medium pl-2">Início:</span>
                    <input 
                        type="date" 
                        className="text-sm border border-gray-300 rounded px-2 py-1 outline-none focus:border-blue-500 text-gray-600"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <button onClick={fetchAllData} className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2">
                        <FontAwesomeIcon icon={faSearch} />
                        <span className="hidden sm:inline">Atualizar</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Coluna Esquerda Principal */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Cartão de Crédito */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-xl flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <h4 className="font-semibold">CiaPag</h4>
                                <FontAwesomeIcon icon={faCcMastercard} className="text-3xl" />
                            </div>
                            <div>
                                <p className="text-xs opacity-70">Saldo Disponível</p>
                                <p className="text-3xl font-bold mb-2">{saldoData ? formatCurrency(saldoData.available_amount) : 'R$ 0,00'}</p>
                                <div className="flex justify-between items-start">
                                    <p className="text-xl font-mono tracking-wider">**** **** **** 7852</p>
                                </div>
                            </div>
                        </div>

                        {/* Cards de Totais */}
                        <div className="space-y-4 flex flex-col justify-between">
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-4 bg-green-100">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Disponível</p>
                                    <p className="text-xl font-bold text-gray-800">{saldoData ? formatCurrency(saldoData.available_amount) : 'R$ 0,00'}</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-4 bg-yellow-100">
                                    <FontAwesomeIcon icon={faClock} className="text-yellow-500 text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Em espera</p>
                                    <p className="text-xl font-bold text-gray-800">{saldoData ? formatCurrency(saldoData.waiting_funds_amount) : 'R$ 0,00'}</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-4 bg-blue-100">
                                    <FontAwesomeIcon icon={faArrowUp} className="text-blue-500 text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Transferido</p>
                                    <p className="text-xl font-bold text-gray-800">{saldoData ? formatCurrency(saldoData.transferred_amount) : 'R$ 0,00'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Informações de Faturamento */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Dados do Recebedor</h3>
                        </div>
                        <div className="space-y-4">
                            {saldoData && saldoData.recipient && (
                                <div className="bg-gray-50 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-gray-100">
                                    <div>
                                        <h4 className="font-bold text-gray-800">{saldoData.recipient.name}</h4>
                                        <p className="text-sm text-gray-500 mt-1">Documento: <span className="font-medium text-gray-700">{saldoData.recipient.document}</span></p>
                                        <p className="text-sm text-gray-500">Email: <span className="font-medium text-gray-700">{saldoData.recipient.email}</span></p>
                                        <p className="text-sm text-gray-500">Status: <span className={`font-medium ${saldoData.recipient.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>{saldoData.recipient.status === 'active' ? 'Ativo' : saldoData.recipient.status}</span></p>
                                    </div>
                                    <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
                                        <span className="text-gray-400">ID: {saldoData.recipient.id}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Coluna Direita */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Faturas */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col h-[480px]">
                        <div className="flex justify-between items-center mb-4 flex-shrink-0">
                            <h3 className="text-lg font-bold text-gray-800">Faturas</h3>
                        </div>
                        <div className="overflow-y-auto flex-grow pr-2">
                            <ul className="space-y-4">
                            {invoicesLoading ? (
                                <div className="text-center py-4 text-gray-500 text-xs">Carregando faturas...</div>
                            ) : invoices.length > 0 ? (
                                invoices.map((invoice) => (
                                    <li 
                                        key={invoice.id} 
                                        className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200"
                                        onClick={() => handleOpenInvoice(invoice.charge_id)}
                                    >
                                        <div>
                                            <p className="font-semibold text-gray-700 text-sm">
                                                {new Date(invoice.payment_date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Orig: {new Date(invoice.original_payment_date).toLocaleDateString('pt-BR')}
                                            </p>
                                            <p className="text-xs text-gray-500">#{invoice.id}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-semibold text-gray-600 text-sm">{formatCurrency(invoice.amount)}</span>
                                            <button className="text-gray-500 hover:text-blue-600 flex items-center gap-1 text-xs font-bold">
                                                <FontAwesomeIcon icon={faFileInvoice} />
                                                PDF
                                            </button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <div className="text-center py-4 text-gray-500 text-xs">Nenhuma fatura encontrada.</div>
                            )}
                            </ul>
                        </div>
                    </div>

                    {/* Suas Transações */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col h-[480px]">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex-shrink-0">Suas Transações</h3>
                        <div className="space-y-6 overflow-y-auto flex-grow pr-2">
                            {transactionsLoading ? (
                                <div className="text-center py-8 text-gray-500">Carregando transações...</div>
                            ) : transactions.length > 0 ? (
                                transactions.map((group, groupIndex) => (
                                    <div key={groupIndex}>
                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">{group.date}</h4>
                                        <ul className="space-y-4">
                                            {group.items.map((item, itemIndex) => (
                                                <li key={itemIndex} className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${item.color.replace('text-', 'border-')} ${item.color.replace('text-', 'bg-').replace('500', '50')}`}>
                                                        <FontAwesomeIcon icon={item.icon} className={item.color} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                                                        <p className="text-xs text-gray-500">{item.date}</p>
                                                    </div>
                                                    <p className={`font-bold text-sm ${item.color}`}>{item.amount}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">Nenhuma transação encontrada para o mês atual.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Detalhes da Fatura */}
            {isInvoiceModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] animate-scale-in flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center flex-shrink-0">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faReceipt} className="text-blue-600" />
                                    Detalhes da Fatura
                                </h3>
                                {selectedInvoice && <p className="text-sm text-gray-500">ID: {selectedInvoice.id}</p>}
                            </div>
                            <button onClick={handleCloseInvoice} className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100">
                                <FontAwesomeIcon icon={faTimes} className="text-xl" />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6 overflow-y-auto flex-grow pr-4">
                            {invoiceDetailLoading ? (
                                <div className="flex justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                </div>
                            ) : selectedInvoice ? (
                                <>
                                    {/* Status and Amount */}
                                    <div className="flex flex-col sm:flex-row gap-4 justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Status</p>
                                            <span className={`px-3 py-1 rounded-full text-sm font-bold capitalize ${selectedInvoice.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {selectedInvoice.status === 'paid' ? 'Pago' : selectedInvoice.status}
                                            </span>
                                        </div>
                                        <div className="text-left sm:text-right">
                                            <p className="text-sm text-gray-500 mb-1">Valor Total</p>
                                            <p className="text-2xl font-bold text-gray-800">{formatCurrency(selectedInvoice.amount)}</p>
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
                                                <p className="font-medium text-gray-800">{selectedInvoice.customer.name}</p>
                                            </div>
                                            <div className="p-3 border border-gray-100 rounded-lg">
                                                <p className="text-gray-500 text-xs">Email</p>
                                                <p className="font-medium text-gray-800">{selectedInvoice.customer.email}</p>
                                            </div>
                                            <div className="p-3 border border-gray-100 rounded-lg">
                                                <p className="text-gray-500 text-xs">Documento</p>
                                                <p className="font-medium text-gray-800">{selectedInvoice.customer.document}</p>
                                            </div>
                                            <div className="p-3 border border-gray-100 rounded-lg">
                                                <p className="text-gray-500 text-xs">Telefone</p>
                                                <p className="font-medium text-gray-800">
                                                    ({selectedInvoice.customer.phones.mobile_phone.area_code}) {selectedInvoice.customer.phones.mobile_phone.number}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Transaction */}
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                            <FontAwesomeIcon icon={faCreditCard} className="text-gray-400" /> Transação
                                        </h4>
                                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                                        <FontAwesomeIcon icon={faCcMastercard} />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-800">{selectedInvoice.last_transaction.card.brand}</p>
                                                        <p className="text-xs text-gray-500">**** {selectedInvoice.last_transaction.card.last_four_digits}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-gray-800">{selectedInvoice.last_transaction.installments}x</p>
                                                    <p className="text-xs text-gray-500">Parcelas</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="text-gray-500 text-xs">NSU</p>
                                                    <p className="font-medium">{selectedInvoice.last_transaction.acquirer_nsu}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500 text-xs">Autorização</p>
                                                    <p className="font-medium">{selectedInvoice.last_transaction.acquirer_auth_code}</p>
                                                </div>
                                                <div className="col-span-2">
                                                    <p className="text-gray-500 text-xs">Mensagem da Adquirente</p>
                                                    <p className="font-medium text-green-600">{selectedInvoice.last_transaction.acquirer_message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Splits */}
                                    {selectedInvoice.last_transaction.split && (
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-3">Divisão de Pagamento (Split)</h4>
                                            <div className="space-y-2">
                                                {selectedInvoice.last_transaction.split.map((split: any) => (
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
                                <div className="text-center py-8 text-gray-500">Não foi possível carregar os detalhes da fatura.</div>
                            )}

                        </div>
                        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end flex-shrink-0">
                            <button onClick={handleCloseInvoice} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-colors">
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CiapagSeller;