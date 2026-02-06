import { Outlet, Link } from "react-router-dom";
import PublicHeader from "../header/PublicHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt, faGlobe } from "@fortawesome/free-solid-svg-icons";
import logoImg from '../../assets/LogociaSite.png';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-gray-50">
      <PublicHeader />
      
      <main className="flex-1 relative w-full h-full pt-20">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-1">
              <img src={logoImg} alt="Cia das Compras" className="h-10 w-auto mb-4 brightness-0 invert opacity-80" />
              <p className="text-sm text-gray-400 leading-relaxed">
                Sua central de negócios automotivos. Conectando compradores e fornecedores com agilidade e segurança desde 2005.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Navegação</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/funcionalidades" className="hover:text-white transition-colors">Como Funciona</Link></li>
                <li><Link to="/planos" className="hover:text-white transition-colors">Planos e Preços</Link></li>
                <li><Link to="/cadastro" className="hover:text-white transition-colors">Cadastre-se</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Área do Cliente</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/termos" className="hover:text-white transition-colors">Termos de Uso</Link></li>
                <li><Link to="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
                <li><Link to="/sobre" className="hover:text-white transition-colors">Sobre Nós</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">Perguntas Frequentes</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Contato</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faPhone} className="mt-1 text-blue-500" />
                  <span>+55 (19) 3212-1373</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faEnvelope} className="mt-1 text-blue-500" />
                  <a href="mailto:webmaster@ciadascompras.com.br" className="hover:text-white transition-colors">webmaster@ciadascompras.com.br</a>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 text-blue-500" />
                  <span>Campinas - SP</span>
                </li>
              </ul>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><FontAwesomeIcon icon={faGlobe} size="lg" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><FontAwesomeIcon icon={faGlobe} size="lg" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><FontAwesomeIcon icon={faGlobe} size="lg" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><FontAwesomeIcon icon={faGlobe} size="lg" /></a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Cia das Compras. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
