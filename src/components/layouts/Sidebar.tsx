import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoiceDollar,
  faTags,
  faBolt,
  faListAlt,
  faCreditCard,
  faShoppingBag,
  faBoxOpen,
  faCartArrowDown,
  faCertificate,
  faDollarSign,
  faUserTie,
  faFileAlt,
  faBook,
  faInfoCircle,
  faEnvelope,
  faAsterisk,
} from "@fortawesome/free-solid-svg-icons";

type UserRole = 'admin' | 'buyer' | 'seller';

interface SidebarProps {
  role?: UserRole;
}

function SidebarLink({ icon, label, href }: { icon: any, label: string, href: string }) {
  return (
    <Link to={href} className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors">
      <FontAwesomeIcon icon={icon} className="w-5 h-5 mr-3 text-gray-400" />
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );
}

export default function Sidebar({ role = 'admin' }: SidebarProps) {
  return (
    <aside className="w-64 h-screen fixed bg-white shadow-md flex flex-col z-20">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-center text-gray-800">Cia das Compras</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {role === 'admin' && (
          <>
            <div className="text-xs font-bold text-gray-400 uppercase mb-2 mt-4 px-3">Admin</div>
            <SidebarLink icon={faFileInvoiceDollar} label="Cotações" href="/admin/cotacoes" />
            <SidebarLink icon={faTags} label="Promoções" href="/admin/promocoes" />
            <SidebarLink icon={faBolt} label="Compra Rápida" href="/admin/compra-rapida" />
            <SidebarLink icon={faListAlt} label="Listas de Preços" href="/admin/listas-de-precos" />
            <SidebarLink icon={faCreditCard} label="Ciapag" href="/admin/ciapag" />
          </>
        )}

        {role === 'buyer' && (
           <>
            <div className="text-xs font-bold text-gray-400 uppercase mb-2 mt-4 px-3">Comprador</div>
            <SidebarLink icon={faShoppingBag} label="Meus Pedidos" href="/buyer/orders" />
            <SidebarLink icon={faFileInvoiceDollar} label="Cotações" href="/buyer/quotes" />
           </>
        )}

        {role === 'seller' && (
           <>
            <div className="text-xs font-bold text-gray-400 uppercase mb-2 mt-4 px-3">Vendedor</div>
            <SidebarLink icon={faCartArrowDown} label="Cotações" href="/seller/quotes" />
            <SidebarLink icon={faCertificate} label="Promoções" href="/seller/promotions" />
            <SidebarLink icon={faDollarSign} label="Lista de Preços" href="/seller/price-list" />
            <SidebarLink icon={faBolt} label="Políticas/Serviços" href="/seller/policies" />
            <SidebarLink icon={faUserTie} label="Perfil" href="/seller/profile" />
            <SidebarLink icon={faFileAlt} label="Relatórios" href="/seller/reports" />
            <SidebarLink icon={faBook} label="Catálogo Eletrônico" href="/seller/catalog" />
            <SidebarLink icon={faInfoCircle} label="Tutorial" href="/seller/tutorials" />
            <SidebarLink icon={faEnvelope} label="Indique" href="/seller/referral" />
            <SidebarLink icon={faAsterisk} label="CiaPag" href="/seller/ciapag" />
           </>
        )}
      </nav>
    </aside>
  );
}
