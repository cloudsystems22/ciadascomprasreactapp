import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faArrowLeft,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

// Tipos para os dados do pedido (Mock)
interface OrderItem {
  id: string;
  product: string;
  brand: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'paid' | 'canceled';
  buyer: {
    name: string;
    cnpj: string;
    contact: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
  };
  seller: {
    name: string;
    cnpj: string;
    contact: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
  };
  items: OrderItem[];
  total: number;
  observations: string;
  payment?: {
    status: 'pending' | 'paid' | 'failed' | 'canceled';
    method: string;
    installments: number;
  };
}

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role;

  // Mock de dados (simulando o retorno do banco de dados)
  const [order, setOrder] = useState<Order>({
    id: id || "12345",
    date: "2026-02-02T14:30:00",
    status: 'pending',
    buyer: {
      name: "Auto Peças Silva",
      cnpj: "12.345.678/0001-90",
      contact: "João Silva",
      email: "joao@autpecassilva.com.br",
      phone: "(11) 99999-9999",
      address: "Rua das Flores, 123",
      city: "São Paulo",
      state: "SP"
    },
    seller: {
      name: "Distribuidora Peças Top",
      cnpj: "98.765.432/0001-10",
      contact: "Maria Souza",
      email: "vendas@pecastop.com.br",
      phone: "(19) 3333-3333",
      address: "Av. Industrial, 456",
      city: "Campinas",
      state: "SP"
    },
    items: [
      { id: "1", product: "Amortecedor Dianteiro", brand: "Cofap", quantity: 2, unitPrice: 150.00, subtotal: 300.00 },
      { id: "2", product: "Pastilha de Freio", brand: "Bosch", quantity: 1, unitPrice: 80.00, subtotal: 80.00 },
    ],
    total: 380.00,
    observations: "Entrega urgente, se possível enviar até sexta-feira.",
    payment: {
        status: 'pending',
        method: 'Cartão de Crédito',
        installments: 3,
    }
  });

  const handleStatusChange = (newStatus: Order['status']) => {
    // Aqui entraria a lógica de chamada à API para atualizar o status
    setOrder({ ...order, status: newStatus });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed': return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Confirmado</span>;
      case 'rejected': return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">Rejeitado</span>;
      case 'paid': return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Pago</span>;
      case 'canceled': return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">Cancelado</span>;
      default: return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">Pendente</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Detalhes do Pedido #{order.id}</h1>
          <nav className="text-sm text-gray-500 mt-1">
            <ol className="list-reset flex items-center">
              <li>
                <Link to={role === 'seller' ? "/seller" : role === 'buyer' ? "/buyer" : "/admin"} className="hover:text-blue-600">
                    Sala de Controle
                </Link>
              </li>
              <li><span className="mx-2">/</span></li>
              <li className="text-gray-800 font-medium">Pedido #{order.id}</li>
            </ol>
          </nav>
        </div>
        <div className="flex gap-2">
            <button className="btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center" onClick={() => window.print()}>
                <FontAwesomeIcon icon={faPrint} className="mr-2" /> Imprimir
            </button>
            <button className="btn bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Voltar
            </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
            <div>
                <span className="text-gray-500 text-sm">Data do Pedido:</span>
                <div className="font-semibold text-gray-800">{new Date(order.date).toLocaleString()}</div>
            </div>
            <div className="text-right">
                <span className="text-gray-500 text-sm block mb-1">Status:</span>
                {getStatusBadge(order.status)}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Comprador */}
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-100 pb-2">Comprador</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li><span className="font-semibold text-gray-700">Nome:</span> {order.buyer.name}</li>
                    <li><span className="font-semibold text-gray-700">CNPJ:</span> {order.buyer.cnpj}</li>
                    <li><span className="font-semibold text-gray-700">Contato:</span> {order.buyer.contact}</li>
                    <li><span className="font-semibold text-gray-700">Email:</span> {order.buyer.email}</li>
                    <li><span className="font-semibold text-gray-700">Telefone:</span> {order.buyer.phone}</li>
                    <li><span className="font-semibold text-gray-700">Endereço:</span> {order.buyer.address}</li>
                    <li><span className="font-semibold text-gray-700">Cidade/UF:</span> {order.buyer.city}/{order.buyer.state}</li>
                </ul>
            </div>

            {/* Fornecedor */}
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-100 pb-2">Fornecedor</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li><span className="font-semibold text-gray-700">Nome:</span> {order.seller.name}</li>
                    <li><span className="font-semibold text-gray-700">CNPJ:</span> {order.seller.cnpj}</li>
                    <li><span className="font-semibold text-gray-700">Contato:</span> {order.seller.contact}</li>
                    <li><span className="font-semibold text-gray-700">Email:</span> {order.seller.email}</li>
                    <li><span className="font-semibold text-gray-700">Telefone:</span> {order.seller.phone}</li>
                    <li><span className="font-semibold text-gray-700">Endereço:</span> {order.seller.address}</li>
                    <li><span className="font-semibold text-gray-700">Cidade/UF:</span> {order.seller.city}/{order.seller.state}</li>
                </ul>
            </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-800">Itens do Pedido</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-700 font-semibold uppercase text-xs">
                    <tr>
                        <th className="px-6 py-3">Peça</th>
                        <th className="px-6 py-3">Marca/Obs</th>
                        <th className="px-6 py-3 text-center">Qtd</th>
                        <th className="px-6 py-3 text-right">Valor Unit.</th>
                        <th className="px-6 py-3 text-right">Subtotal</th>
                        {role === 'seller' && order.status === 'pending' && <th className="px-6 py-3 text-center">Ações</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {order.items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-800">{item.product}</td>
                            <td className="px-6 py-4">{item.brand}</td>
                            <td className="px-6 py-4 text-center">{item.quantity}</td>
                            <td className="px-6 py-4 text-right">R$ {item.unitPrice.toFixed(2)}</td>
                            <td className="px-6 py-4 text-right font-semibold text-gray-800">R$ {item.subtotal.toFixed(2)}</td>
                            {role === 'seller' && order.status === 'pending' && (
                                <td className="px-6 py-4 text-center">
                                    <button className="text-blue-600 hover:text-blue-800 mx-1" title="Editar"><FontAwesomeIcon icon={faEdit} /></button>
                                    <button className="text-red-600 hover:text-red-800 mx-1" title="Excluir"><FontAwesomeIcon icon={faTrashAlt} /></button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* Totals & Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Observations */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Observações</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 border border-gray-200">
                  {order.observations || "Nenhuma observação."}
              </div>
              
              {role === 'seller' && order.status === 'pending' && (
                  <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adicionar resposta/observação:</label>
                      <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" rows={3} placeholder="Escreva aqui..."></textarea>
                  </div>
              )}
          </div>

          {/* Totals */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Resumo Financeiro</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal:</span>
                        <span>R$ {order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Taxas/Encargos:</span>
                        <span>R$ 0,00</span>
                    </div>
                    <div className="border-t border-gray-100 my-2 pt-2 flex justify-between font-bold text-lg text-gray-800">
                        <span>Total:</span>
                        <span>R$ {order.total.toFixed(2)}</span>
                    </div>
                </div>
                {order.payment && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Pagamento</p>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">{order.payment.method} ({order.payment.installments}x)</span>
                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${order.payment.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {order.payment.status === 'paid' ? 'Pago' : 'Pendente'}
                            </span>
                        </div>
                    </div>
                )}
              </div>

              {/* Action Buttons for Seller */}
              {role === 'seller' && order.status === 'pending' && (
                  <div className="mt-6 grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => handleStatusChange('rejected')}
                        className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-medium transition-colors"
                      >
                          Rejeitar
                      </button>
                      <button 
                        onClick={() => handleStatusChange('confirmed')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors shadow-sm"
                      >
                          Confirmar
                      </button>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
}
