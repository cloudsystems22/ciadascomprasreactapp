import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignInAlt,
  faBars,
  faTimes,
  faHome,
  faCog,
  faTruck,
  faQuestionCircle,
  faPhone,
  faEnvelope,
  faFileInvoiceDollar,
  faInfoCircle,
  faShieldAlt,
  faAddressBook,
  faTags
} from "@fortawesome/free-solid-svg-icons";
import logoImg from '../../assets/LogociaSite.png';

export default function PublicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center w-full transition-all duration-300 font-sans">
      
      {/* SUBHEADER / TOP BAR */}
      {/* Recolhe quando rola a página para dar foco ao menu principal */}
      <div className={`w-full bg-slate-900 text-white transition-all duration-500 ease-in-out overflow-hidden ${isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-12 py-2 opacity-100'} hidden md:block`}>
        <div className="container mx-auto px-6 flex justify-between items-center text-xs font-medium tracking-wide">
            <div className="flex items-center gap-6">
                <span className="flex items-center gap-2 opacity-80"><FontAwesomeIcon icon={faPhone} /> +55 (19) 3212-1373</span>
                <a href="mailto:webmaster@ciadascompras.com.br" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity"><FontAwesomeIcon icon={faEnvelope} /> webmaster@ciadascompras.com.br</a>
            </div>
            <div className="flex items-center gap-6">
                <a href="https://ciadascompras.superlogica.net/clients/areadocliente" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition-colors flex items-center gap-1">
                    <FontAwesomeIcon icon={faFileInvoiceDollar} /> Acesso Boleto e NFSe
                </a>
                <Link to="/sobre" className="hover:text-blue-300 transition-colors flex items-center gap-1">
                    <FontAwesomeIcon icon={faInfoCircle} /> Sobre
                </Link>
                <Link to="/privacidade" className="hover:text-blue-300 transition-colors flex items-center gap-1">
                    <FontAwesomeIcon icon={faShieldAlt} /> Política de privacidade
                </Link>
                <Link to="/contato" className="hover:text-blue-300 transition-colors flex items-center gap-1">
                    <FontAwesomeIcon icon={faAddressBook} /> Contato
                </Link>
            </div>
        </div>
      </div>

      {/* MAIN NAVBAR (Soft UI Style) */}
      <nav 
        className={`w-[95%] max-w-7xl transition-all duration-300 rounded-2xl px-4 flex items-center justify-between mt-2 ${
            isScrolled 
            ? "bg-white/80 backdrop-blur-md shadow-lg border border-white/40 py-2" 
            : "bg-white/60 backdrop-blur-sm shadow-sm border border-white/30 py-3"
        }`}
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
           <img src={logoImg} alt="Cia das Compras" className="h-9 w-auto transition-transform group-hover:scale-105" />
           {/* <span className="font-bold text-gray-800 text-sm uppercase tracking-wider hidden lg:block">Ciadascompras</span> */}
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-1 bg-white/50 rounded-full px-2 py-1 border border-white/40 shadow-inner">
          <NavLink to="/" icon={faHome} label="Home" />
          <NavLink to="/planos" icon={faTags} label="Planos e Preços" />
          <NavLink to="/funcionalidades" icon={faCog} label="Como funciona" />
          <NavLink to="/fornecedores" icon={faTruck} label="Principais fornecedores" />
          <NavLink to="/faq" icon={faQuestionCircle} label="Perguntas Frequentes" />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="bg-gradient-to-tl from-blue-600 to-cyan-400 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 uppercase tracking-wide flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faSignInAlt} /> <span className="hidden sm:inline">Acesso ao Sistema</span>
          </Link>
          
          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden text-gray-600 text-xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full mt-2 px-4">
            <div className="bg-white/95 backdrop-blur-xl shadow-2xl border border-white/50 rounded-2xl py-6 px-6 flex flex-col gap-4 animate-fade-in-down">
                <MobileLink to="/" label="Home" icon={faHome} onClick={() => setMobileMenuOpen(false)} />
                <MobileLink to="/planos" label="Planos e Preços" icon={faTags} onClick={() => setMobileMenuOpen(false)} />
                <MobileLink to="/funcionalidades" label="Como funciona" icon={faCog} onClick={() => setMobileMenuOpen(false)} />
                <MobileLink to="/fornecedores" label="Principais fornecedores" icon={faTruck} onClick={() => setMobileMenuOpen(false)} />
                <MobileLink to="/faq" label="Perguntas Frequentes" icon={faQuestionCircle} onClick={() => setMobileMenuOpen(false)} />
                
                <hr className="border-gray-200 my-2" />
                
                <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 font-medium">
                    <a href="https://ciadascompras.superlogica.net/clients/areadocliente" className="hover:text-blue-600 flex items-center gap-2"><FontAwesomeIcon icon={faFileInvoiceDollar} /> Boleto e NFSe</a>
                    <Link to="/sobre" className="hover:text-blue-600 flex items-center gap-2"><FontAwesomeIcon icon={faInfoCircle} /> Sobre</Link>
                    <Link to="/privacidade" className="hover:text-blue-600 flex items-center gap-2"><FontAwesomeIcon icon={faShieldAlt} /> Privacidade</Link>
                    <Link to="/contato" className="hover:text-blue-600 flex items-center gap-2"><FontAwesomeIcon icon={faAddressBook} /> Contato</Link>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

function NavLink({ to, icon, label }: { to: string, icon: any, label: string }) {
    return (
        <Link to={to} className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-blue-600 hover:bg-white rounded-full transition-all flex items-center gap-2">
            <FontAwesomeIcon icon={icon} className="opacity-70" /> {label}
        </Link>
    )
}

function MobileLink({ to, label, icon, onClick }: { to: string, label: string, icon: any, onClick: () => void }) {
    return (
        <Link to={to} className="text-gray-700 font-bold hover:text-blue-600 text-sm flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors" onClick={onClick}>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                <FontAwesomeIcon icon={icon} />
            </div>
            {label}
        </Link>
    )
}
