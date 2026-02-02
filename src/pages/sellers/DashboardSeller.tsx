import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faClock,
  faCheckCircle,
  faTimesCircle,
  faChartLine,
  faChartPie,
  faFileExcel,
  faFileAlt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function DashboardSeller() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [exportLayout, setExportLayout] = useState("XML");

  // Dados fictícios para o dashboard
  const stats = [
    { label: "Total de Pedidos", value: "1,234", icon: faShoppingBag, color: "bg-blue-500" },
    { label: "Pendente", value: "23", icon: faClock, color: "bg-yellow-500" },
    { label: "Ok", value: "1,150", icon: faCheckCircle, color: "bg-green-500" },
    { label: "Rejeitados", value: "61", icon: faTimesCircle, color: "bg-red-500" },
  ];

  const recentOrders = [
    { id: "#ORD-001", customer: "Auto Peças Silva", date: "02/02/2026", total: "R$ 450,00", status: "Pendente" },
    { id: "#ORD-002", customer: "Mecânica Jato", date: "01/02/2026", total: "R$ 1.200,00", status: "Ok" },
    { id: "#ORD-003", customer: "Centro Automotivo X", date: "01/02/2026", total: "R$ 890,00", status: "Ok" },
    { id: "#ORD-004", customer: "Oficina do Zé", date: "31/01/2026", total: "R$ 150,00", status: "Rejeitados" },
    { id: "#ORD-005", customer: "Auto Center Top", date: "30/01/2026", total: "R$ 2.350,00", status: "Ok" },
  ];

  const toggleOrder = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((orderId) => orderId !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

  const toggleAll = () => {
    if (selectedOrders.length === recentOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(recentOrders.map((o) => o.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho da Página */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard do Vendedor</h1>
          <p className="text-gray-500">Visão geral das suas vendas e pedidos recentes</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Date Picker */}
            <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 flex-1 sm:flex-none">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400 mr-2" />
                <span className="text-sm text-gray-500 mr-2 whitespace-nowrap">Data:</span>
                <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="text-sm font-semibold text-gray-800 outline-none bg-transparent w-full sm:w-auto"
                />
            </div>

            {/* Export Buttons */}
            <div className="flex gap-2">
                <button 
                    onClick={() => setIsExportModalOpen(true)}
                    className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm" 
                    title="Exportar TXT"
                >
                    <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                    TXT
                </button>
                <button className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-colors shadow-sm" title="Exportar Excel">
                    <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
                    Excel
                </button>
            </div>
        </div>
      </div>

      {/* Grid de Estatísticas (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 flex items-center border border-gray-100 hover:shadow-md transition-shadow">
            <div className={`${stat.color} p-4 rounded-lg text-white mr-4 shadow-sm`}>
              <FontAwesomeIcon icon={stat.icon} className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Seção de Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Vendas (Barras CSS) */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 text-lg">Vendas Mensais</h3>
            <div className="p-2 bg-gray-50 rounded-full">
                <FontAwesomeIcon icon={faChartLine} className="text-blue-500" />
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2 px-2 pb-2 border-b border-gray-100">
             {/* Barras simuladas com CSS */}
             {[40, 65, 45, 80, 55, 90].map((h, i) => (
                <div key={i} className="w-full bg-blue-50 rounded-t-md relative group h-full flex items-end">
                    <div 
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md transition-all duration-500 hover:from-blue-700 hover:to-blue-500 relative" 
                        style={{ height: `${h}%` }}
                    >
                        {/* Tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-lg transition-opacity whitespace-nowrap z-10">
                            R$ {h * 100},00
                        </div>
                    </div>
                </div>
             ))}
          </div>
          <div className="flex justify-between mt-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
              <span>Ago</span><span>Set</span><span>Out</span><span>Nov</span><span>Dez</span><span>Jan</span>
          </div>
        </div>

        {/* Gráfico de Status (Pizza CSS) */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 text-lg">Pedidos por Status</h3>
            <div className="p-2 bg-gray-50 rounded-full">
                <FontAwesomeIcon icon={faChartPie} className="text-purple-500" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 h-64">
             {/* Representação visual de Pizza com CSS Conic Gradient */}
             <div className="relative w-48 h-48 rounded-full shadow-inner" style={{
                 background: 'conic-gradient(#EAB308 0% 60%, #22C55E 60% 95%, #EF4444 95% 100%)'
             }}>
                 <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center flex-col shadow-sm">
                     <span className="text-3xl font-bold text-gray-800">1.2k</span>
                     <span className="text-xs text-gray-500 font-medium uppercase">Total</span>
                 </div>
             </div>
             
             {/* Legenda */}
             <div className="flex flex-col gap-3 text-sm">
                  <div className="flex items-center"><span className="w-3 h-3 bg-yellow-500 rounded-full mr-2 shadow-sm"></span> <span className="text-gray-600">Pendente (60%)</span></div>
                  <div className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-2 shadow-sm"></span> <span className="text-gray-600">Ok (35%)</span></div>
                  <div className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-2 shadow-sm"></span> <span className="text-gray-600">Rejeitados (5%)</span></div>
             </div>
          </div>
        </div>
      </div>

      {/* Tabela de Pedidos Recentes */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 text-lg">Pedidos Recentes</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline">Ver todos</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-700 font-semibold uppercase text-xs tracking-wider">
                    <tr>
                        <th className="px-6 py-4 border-b border-gray-100 w-4">
                            <input 
                                type="checkbox" 
                                checked={selectedOrders.length === recentOrders.length && recentOrders.length > 0} 
                                onChange={toggleAll}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                        </th>
                        <th className="px-6 py-4 border-b border-gray-100">ID</th>
                        <th className="px-6 py-4 border-b border-gray-100">Cliente</th>
                        <th className="px-6 py-4 border-b border-gray-100">Data</th>
                        <th className="px-6 py-4 border-b border-gray-100">Total</th>
                        <th className="px-6 py-4 border-b border-gray-100">Status</th>
                        <th className="px-6 py-4 border-b border-gray-100 text-right">Ação</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-blue-50/30 transition-colors">
                            <td className="px-6 py-4 border-b border-gray-100">
                                <input 
                                    type="checkbox" 
                                    checked={selectedOrders.includes(order.id)} 
                                    onChange={() => toggleOrder(order.id)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                            </td>
                            <td className="px-6 py-4 font-medium text-blue-600">{order.id}</td>
                            <td className="px-6 py-4 font-medium text-gray-800">{order.customer}</td>
                            <td className="px-6 py-4 text-gray-500">{order.date}</td>
                            <td className="px-6 py-4 font-medium text-gray-800">{order.total}</td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border
                                    ${order.status === 'Pendente' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' : ''}
                                    ${order.status === 'Ok' ? 'bg-green-50 text-green-700 border-green-100' : ''}
                                    ${order.status === 'Rejeitados' ? 'bg-red-50 text-red-700 border-red-100' : ''}
                                `}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Link to={`/order/${order.id.replace('#', '')}`} className="text-gray-400 hover:text-blue-600 font-medium transition-colors">
                                    Detalhes
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* Modal de Exportação */}
      {isExportModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-all">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Exportar Pedidos</h3>
            <p className="mb-4 text-sm text-gray-600">
              Selecione o layout do arquivo para exportar os <span className="font-semibold">{selectedOrders.length}</span> pedidos selecionados:
            </p>
            
            <div className="space-y-3 mb-6">
              {["XML", "TXT5", "TXT7", "TXT8", "TXT20"].map((layout) => (
                <label key={layout} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="exportLayout"
                    value={layout}
                    checked={exportLayout === layout}
                    onChange={(e) => setExportLayout(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3 text-gray-700 font-medium">{layout}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsExportModalOpen(false)} 
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  console.log(`Exportando ${selectedOrders.length} pedidos como ${exportLayout}`);
                  setIsExportModalOpen(false);
                }} 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={selectedOrders.length === 0}
              >
                Exportar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
