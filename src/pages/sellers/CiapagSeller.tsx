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
    faClock
} from '@fortawesome/free-solid-svg-icons';
import { faCcMastercard } from '@fortawesome/free-brands-svg-icons';
import { getCiapagSaldo, type CiapagSaldoResponse } from '../../api/ciapag';
import { ID_RECEBEDOR_CIAPAG } from '../../auth/auth';

// --- Dados Mocados ---

const invoices = [
    { date: 'Março, 01, 2024', id: '#MS-415646', amount: 'R$ 180' },
    { date: 'Fevereiro, 10, 2024', id: '#RV-126749', amount: 'R$ 250' },
    { date: 'Janeiro, 05, 2024', id: '#FB-212562', amount: 'R$ 560' },
    { date: 'Dezembro, 25, 2023', id: '#QW-103578', amount: 'R$ 120' },
    { date: 'Dezembro, 01, 2023', id: '#AR-803481', amount: 'R$ 300' },
];

const transactions = [
    {
        date: '27 Março 2024',
        items: [
            { icon: faArrowDown, color: 'text-red-500', title: 'Saque via PIX', date: '27 Mar 2024, às 12:30 PM', amount: '- R$ 2.500,00' },
            { icon: faArrowUp, color: 'text-green-500', title: 'Pagamento Recebido', date: '27 Mar 2024, às 04:30 AM', amount: '+ R$ 2.000,00' },
        ]
    },
    {
        date: '26 Março 2024',
        items: [
            { icon: faArrowUp, color: 'text-green-500', title: 'Pagamento Recebido', date: '26 Mar 2024, às 13:45 PM', amount: '+ R$ 750,00' },
            { icon: faArrowUp, color: 'text-green-500', title: 'Pagamento Recebido', date: '26 Mar 2024, às 12:30 PM', amount: '+ R$ 1.000,00' },
            { icon: faExclamationCircle, color: 'text-gray-500', title: 'Taxa de Serviço', date: '26 Mar 2024, às 05:00 AM', amount: '- R$ 22,00' },
        ]
    }
];

// --- Componente Principal ---

const CiapagSeller: React.FC = () => {
    const [saldoData, setSaldoData] = useState<CiapagSaldoResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSaldo = async () => {
            try {
                const data = await getCiapagSaldo(ID_RECEBEDOR_CIAPAG);
                setSaldoData(data);
            } catch (error) {
                console.error("Erro ao carregar saldo", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSaldo();
    }, []);

    const formatCurrency = (amount: number) => {
        // A API retorna o valor em centavos (inteiro), então dividimos por 100
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount / 100);
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Carregando informações financeiras...</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            {/* Cabeçalho */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Faturamento CiaPag</h1>
                <p className="text-gray-500">Gerencie suas transações e faturamento.</p>
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
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Faturas</h3>
                            <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors">Ver Todas</button>
                        </div>
                        <ul className="space-y-4">
                            {invoices.map((invoice, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-gray-700 text-sm">{invoice.date}</p>
                                        <p className="text-xs text-gray-500">{invoice.id}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-semibold text-gray-600 text-sm">{invoice.amount}</span>
                                        <a href="#" className="text-gray-500 hover:text-blue-600 flex items-center gap-1 text-xs font-bold">
                                            <FontAwesomeIcon icon={faFileInvoice} />
                                            PDF
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Suas Transações */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Suas Transações</h3>
                        <div className="space-y-6">
                            {transactions.map((group, groupIndex) => (
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
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CiapagSeller;