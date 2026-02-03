import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faArrowLeft,
  faEdit,
  faTrashAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { getPedido, getItensPedido } from "../../api/pedidos";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logoImg from '../../assets/LogociaSite.png';

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

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const [pedidoData, itensData] = await Promise.all([
          getPedido(id),
          getItensPedido(id)
        ]);

        const mapApiStatus = (status: number): Order['status'] => {
            if (status === 0) return 'pending';
            if (status === 1) return 'confirmed';
            if (status === -1) return 'rejected';
            return 'pending';
        };

        setOrder({
          id: pedidoData.id_pedido_ped,
          date: pedidoData.dt_data_ped,
          status: mapApiStatus(pedidoData.fl_status_ped),
          buyer: {
            name: pedidoData.lojista_nome || `Lojista #${pedidoData.id_lojista_cli}`,
            cnpj: pedidoData.lojista_cnpj || "Não informado",
            contact: pedidoData.lojista_contato || "",
            email: pedidoData.lojista_email || "",
            phone: pedidoData.lojista_telefone || "",
            address: `${pedidoData.lojista_endereco || ''}, ${pedidoData.lojista_numero || ''} ${pedidoData.lojista_bairro ? '- ' + pedidoData.lojista_bairro : ''}`,
            city: pedidoData.lojista_cidade || "",
            state: pedidoData.lojista_uf || ""
          },
          seller: {
            name: pedidoData.fornecedor_nome || `Fornecedor #${pedidoData.id_fornecedor_cli}`,
            cnpj: pedidoData.fornecedor_cnpj || "Não informado",
            contact: pedidoData.fornecedor_contato || "",
            email: pedidoData.fornecedor_email || "",
            phone: pedidoData.fornecedor_telefone || "",
            address: `${pedidoData.fornecedor_endereco || ''}, ${pedidoData.fornecedor_numero || ''} ${pedidoData.fornecedor_bairro ? '- ' + pedidoData.fornecedor_bairro : ''}`,
            city: pedidoData.fornecedor_cidade || "",
            state: pedidoData.fornecedor_uf || ""
          },
          items: (Array.isArray(itensData) ? itensData : []).map(item => ({
            id: item.ID_PECA_PEC, // Usando ID da peça como ID do item
            product: item.ID_PECA_PEC,
            brand: item.MARCA,
            quantity: item.NM_QUANTIDADE_PIP,
            unitPrice: item.VL_VALOR,
            subtotal: item.NM_QUANTIDADE_PIP * item.VL_VALOR
          })),
          total: pedidoData.vl_valor_ped,
          observations: pedidoData.tx_observacoes_ped || "",
          payment: {
              status: 'pending',
              method: 'A definir',
              installments: 1
          }
        });
      } catch (error) {
        console.error("Erro ao buscar detalhes do pedido:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [id]);

  const handleStatusChange = (newStatus: Order['status']) => {
    // Aqui entraria a lógica de chamada à API para atualizar o status
    if (order) {
        setOrder({ ...order, status: newStatus });
    }
  };

  const generatePDF = (action: 'save' | 'view' = 'save') => {
    if (!order) return;

    const doc = new jsPDF();
    
    const img = new Image();
    img.src = logoImg;

    img.onload = () => {
        // Logo
        doc.addImage(img, 'PNG', 14, 10, 40, 12);
        
        // Título e Dados Básicos
        doc.setFontSize(18);
        doc.text(`Pedido #${order.id}`, 14, 30);
        
        doc.setFontSize(10);
        doc.text(`Data: ${new Date(order.date).toLocaleString()}`, 14, 36);
        doc.text(`Status: ${order.status.toUpperCase()}`, 14, 41);

        doc.setLineWidth(0.5);
        doc.line(14, 45, 196, 45);

        // Dados do Comprador
        doc.setFontSize(12);
        doc.text("Comprador", 14, 52);
        doc.setFontSize(9);
        const buyerInfo = [
            order.buyer.name,
            `CNPJ: ${order.buyer.cnpj}`,
            `Email: ${order.buyer.email}`,
            `Tel: ${order.buyer.phone}`,
            `${order.buyer.address}`,
            `${order.buyer.city} - ${order.buyer.state}`
        ];
        doc.text(buyerInfo, 14, 58);

        // Dados do Fornecedor
        doc.setFontSize(12);
        doc.text("Fornecedor", 110, 52);
        doc.setFontSize(9);
        const sellerInfo = [
            order.seller.name,
            `CNPJ: ${order.seller.cnpj}`,
            `Email: ${order.seller.email}`,
            `Tel: ${order.seller.phone}`,
            `${order.seller.address}`,
            `${order.seller.city} - ${order.seller.state}`
        ];
        doc.text(sellerInfo, 110, 58);

        // Tabela de Itens
        const tableColumn = ["Peça", "Marca", "Qtd", "Valor Unit.", "Subtotal"];
        const tableRows = order.items.map(item => [
            item.product,
            item.brand,
            item.quantity,
            `R$ ${item.unitPrice.toFixed(2)}`,
            `R$ ${item.subtotal.toFixed(2)}`
        ]);

        autoTable(doc, {
            startY: 85,
            head: [tableColumn],
            body: tableRows,
            foot: [['', '', '', 'Total:', `R$ ${order.total.toFixed(2)}`]],
            theme: 'striped',
            headStyles: { fillColor: [41, 128, 185] },
            styles: { fontSize: 9 }
        });

        // Observações
        const finalY = (doc as any).lastAutoTable.finalY || 85;
        doc.setFontSize(10);
        doc.text("Observações:", 14, finalY + 10);
        doc.setFontSize(9);
        doc.text(order.observations || "Nenhuma observação.", 14, finalY + 15);

        if (action === 'view') {
            window.open(doc.output('bloburl'), '_blank');
        } else {
            doc.save(`Pedido_${order.id}.pdf`);
        }
    };
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

  if (loading) {
      return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  if (!order) {
      return <div className="text-center p-10 text-gray-500">Pedido não encontrado.</div>;
  }

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
            <button className="btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center" onClick={() => generatePDF('view')}>
                <FontAwesomeIcon icon={faEye} className="mr-2" /> Visualizar
            </button>
            <button className="btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center" onClick={() => generatePDF('save')}>
                <FontAwesomeIcon icon={faPrint} className="mr-2" /> Baixar PDF
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
