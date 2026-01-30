import {
  faUsers,
  faMoneyBillWave,
  faUserTie,
  faShoppingBag,
  faBullhorn,
  faFileContract,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function DashboardAdmin() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cia das Compras</h1>
          <p className="text-sm text-gray-500">Dashboard do Administrador</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Vendas de Hoje"
          value="R$ 53.000"
          percentage={55}
          icon={faMoneyBillWave}
        />
        <StatCard
          title="Novos Usuários"
          value="2,300"
          percentage={3}
          icon={faUsers}
        />
        <StatCard
          title="Novos Clientes"
          value="+3,462"
          percentage={-2}
          icon={faUserTie}
        />
        <StatCard
          title="Vendas Totais"
          value="R$ 103.430"
          percentage={5}
          icon={faShoppingBag}
        />
      </div>

      {/* Operational Row (Forms) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* User Management */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Gerenciar Usuários</h3>
          
          {/* Direct Access */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Usuário (acesso direto por e-mail)</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="e-mail" 
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                Ir
              </button>
            </div>
          </div>

          {/* User List Actions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lista de Usuários</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Selecione um usuário...</option>
              <option value="1">Exemplo Usuário 1</option>
              <option value="2">Exemplo Usuário 2</option>
            </select>
            
            <div className="flex flex-wrap gap-2">
              <ActionButton label="Ver" color="bg-gray-100 text-gray-700 hover:bg-gray-200" />
              <ActionButton label="Excluir" color="bg-red-50 text-red-600 hover:bg-red-100" />
              <ActionButton label="Editar" color="bg-blue-50 text-blue-600 hover:bg-blue-100" />
              <ActionButton label="Alterar Senha" color="bg-yellow-50 text-yellow-600 hover:bg-yellow-100" />
              <ActionButton label="Consultar" color="bg-purple-50 text-purple-600 hover:bg-purple-100" />
              <ActionButton label="Tempo de cadastro" color="bg-green-50 text-green-600 hover:bg-green-100" />
            </div>
          </div>
        </div>

        {/* Package Management */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Pacotão</h3>
          
          <div className="mb-4">
             <label className="block text-sm font-medium text-gray-700 mb-1">Selecione o Pacote</label>
             <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Selecione um pacote...</option>
              <option value="1">Pacote Exemplo - Segmento A</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
             <ActionButton label="Novo" color="bg-green-600 text-white hover:bg-green-700" />
             <ActionButton label="Excluir" color="bg-red-50 text-red-600 hover:bg-red-100" />
             <ActionButton label="Status" color="bg-blue-50 text-blue-600 hover:bg-blue-100" />
             <ActionButton label="Relatório" color="bg-gray-100 text-gray-700 hover:bg-gray-200" />
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
             <h4 className="text-sm font-bold text-gray-500 uppercase mb-3">Links Rápidos</h4>
             <div className="flex gap-4">
                <div className="h-12 w-32 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500 font-bold cursor-pointer hover:bg-gray-300 transition-colors">Ciapag</div>
                <div className="h-12 w-32 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500 font-bold cursor-pointer hover:bg-gray-300 transition-colors">Site</div>
             </div>
          </div>
        </div>
      </div>

      {/* Menu Grid (Replacing Left Column) */}
      <h3 className="text-xl font-bold text-gray-800 mb-4">Gerenciamento</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MenuSection 
          title="Comercial" 
          icon={faShoppingBag}
          items={[
            { label: "Cotações", href: "cotar/" },
            { label: "Promoções", href: "promocoes/" },
            { label: "Compra Rápida", href: "comprarapida/" },
            { label: "Listas de Preços", href: "negociacoes/" },
          ]} 
        />
        <MenuSection 
          title="Comunicação" 
          icon={faBullhorn}
          items={[
            { label: "Chamados", href: "chamado/listar.php" },
            { label: "Notícias", href: "noticias/" },
            { label: "E-mail Marketing", href: "marketing/" },
            { label: "Grupos de E-mail", href: "grupos/email2.php" },
          ]} 
        />
        <MenuSection 
          title="Cadastros" 
          icon={faFileContract}
          items={[
            { label: "Marcas", href: "marcas/editar.php" },
            { label: "Segmentos", href: "segmentos/editar.php" },
            { label: "Catálogo Eletrônico", href: "catalogo/editar_marca.php" },
            { label: "Banners", href: "banners_forns/banners_forn.php" },
          ]} 
        />
        <MenuSection 
          title="Relatórios & Sistema" 
          icon={faChartPie}
          items={[
            { label: "Rel. Comprador", href: "relatorios/relatorio_indexCompr.php" },
            { label: "Rel. Fornecedor", href: "relatorios/relatorio_index.php" },
            { label: "Logs de Erro", href: "log/falhas.php" },
            { label: "Busca", href: "busca/index.php" },
          ]} 
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, percentage, icon }: { title: string, value: string, percentage: number, icon: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex justify-between items-center transition-transform hover:scale-105 duration-300">
      <div>
        <p className="text-sm text-gray-500 font-semibold mb-1">{title}</p>
        <h4 className="text-xl font-bold text-gray-800">
          {value}
          <span className={`ml-2 text-xs font-bold ${percentage > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {percentage > 0 ? '+' : ''}{percentage}%
          </span>
        </h4>
      </div>
      <div className="w-12 h-12 rounded-xl bg-gradient-to-tl from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg">
        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  );
}

function MenuSection({ title, items, icon }: { title: string, items: { label: string, href: string }[], icon: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-full hover:shadow-md transition-shadow">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
            <FontAwesomeIcon icon={icon} />
        </div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index}>
            <a href={item.href} className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center group">
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2 group-hover:bg-blue-500 transition-colors"></span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ActionButton({ label, color }: { label: string, color: string }) {
    return (
        <button className={`${color} px-4 py-2 rounded-lg text-xs font-bold transition-colors`}>
            {label}
        </button>
    )
}
