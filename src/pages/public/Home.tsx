import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCheckCircle, 
  faShoppingCart, 
  faStore, 
  faSearchDollar, 
  faArrowRight,
  faPlayCircle
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useOnScreen } from "./useOnScreen";
import { useRef } from "react";
import SupplierCarousel from "../../components/common/SupplierCarousel";

export default function Home() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const isHeroTextVisible = useOnScreen(heroTextRef, "-50px");

  const heroImageRef = useRef<HTMLDivElement>(null);
  const isHeroImageVisible = useOnScreen(heroImageRef, "-50px");

  const statsRef = useRef<HTMLDivElement>(null);
  const areStatsVisible = useOnScreen(statsRef, "-50px");

  const buyersRef = useRef<HTMLElement>(null);
  const isBuyersVisible = useOnScreen(buyersRef, "-100px");

  const sellersRef = useRef<HTMLElement>(null);
  const isSellersVisible = useOnScreen(sellersRef, "-100px");

  const pricingRef = useRef<HTMLElement>(null);
  const isPricingVisible = useOnScreen(pricingRef, "-100px");

  const ctaRef = useRef<HTMLElement>(null);
  const isCtaVisible = useOnScreen(ctaRef, "-100px");

  return (
    <div className="overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
        {/* Background Shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div
              ref={heroTextRef}
              className={`lg:w-1/2 text-center lg:text-left transition-all duration-700 ease-out ${
                isHeroTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">
                Sua Central de Negócios
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Conectando <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Compradores</span> e <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Fornecedores</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                A plataforma mais completa para cotações de autopeças. Economize tempo e dinheiro com nosso sistema inteligente de compras e vendas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/cadastro?tipo=comprador" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                  <FontAwesomeIcon icon={faShoppingCart} /> Sou Comprador
                </Link>
                <Link to="/cadastro?tipo=fornecedor" className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-100 rounded-xl font-bold hover:border-blue-600 hover:bg-blue-50 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                  <FontAwesomeIcon icon={faStore} /> Sou Fornecedor
                </Link>
              </div>
            </div>
            <div
              ref={heroImageRef}
              className={`lg:w-1/2 relative transition-all duration-700 ease-out delay-200 ${
                isHeroImageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="relative rounded-2xl shadow-2xl bg-white p-4 border border-gray-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                 {/* Placeholder for a dashboard screenshot or hero image */}
                 <div className="aspect-video bg-gradient-to-tr from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                    <div className="text-gray-400 flex flex-col items-center">
                        <FontAwesomeIcon icon={faSearchDollar} className="text-6xl mb-4 opacity-20" />
                        <span className="text-sm font-medium opacity-50">Dashboard Preview</span>
                    </div>
                 </div>
                 {/* Floating Badges */}
                 <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-50 flex items-center gap-3 animate-bounce-slow">
                    <div className="bg-green-100 p-3 rounded-full text-green-600">
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Cotações</p>
                        <p className="text-sm font-bold text-gray-800">100% Online</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
            <div
              ref={statsRef}
              className={`grid grid-cols-2 md:grid-cols-4 gap-8 text-center transition-opacity duration-700 ${
                areStatsVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
                <div>
                    <h3 className="text-3xl font-bold text-blue-600">+1000</h3>
                    <p className="text-sm text-gray-500 font-medium">Empresas Cadastradas</p>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-blue-600">+500</h3>
                    <p className="text-sm text-gray-500 font-medium">Fornecedores Ativos</p>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-blue-600">24/7</h3>
                    <p className="text-sm text-gray-500 font-medium">Sistema Disponível</p>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-blue-600">Brasil</h3>
                    <p className="text-sm text-gray-500 font-medium">Atuação Nacional</p>
                </div>
            </div>
        </div>
      </section>

      {/* SUPPLIER CAROUSEL */}
      <SupplierCarousel />

      {/* FOR BUYERS */}
      <section ref={buyersRef} className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-16">
                <div
                  className={`md:w-1/2 order-2 md:order-1 transition-all duration-700 ease-out ${
                    isBuyersVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                  }`}
                >
                    <div className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
                        <div className="aspect-video bg-gray-900 relative">
                             {/* Placeholder for YouTube Video */}
                             <img src="https://images.unsplash.com/photo-1580273916550-e323be2ed532?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Compradores" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                             <div className="absolute inset-0 flex items-center justify-center">
                                <FontAwesomeIcon icon={faPlayCircle} className="text-6xl text-white opacity-80 group-hover:scale-110 transition-transform" />
                             </div>
                        </div>
                    </div>
                </div>
                <div
                  className={`md:w-1/2 order-1 md:order-2 transition-all duration-700 ease-out delay-200 ${
                    isBuyersVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                >
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-green-600 uppercase bg-green-100 rounded-full">
                        Para Compradores
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Encontre as melhores peças com o melhor preço</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Cadastre sua lista de produtos e receba cotações de centenas de fornecedores. Compare preços, condições e feche negócio com agilidade.
                    </p>
                    <ul className="space-y-4 mb-8">
                        {[
                            "Cotações de preços rápidas e eficientes",
                            "Comparativo inteligente de propostas",
                            "Gestão completa de pedidos",
                            "Acesso a promoções exclusivas"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-700">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <Link to="/cadastro?tipo=comprador" className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-2 group">
                        Começar a economizar <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* FOR SELLERS */}
      <section ref={sellersRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-16">
                <div
                  className={`md:w-1/2 transition-all duration-700 ease-out ${
                    isSellersVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                  }`}
                >
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-purple-600 uppercase bg-purple-100 rounded-full">
                        Para Fornecedores
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Aumente suas vendas e alcance novos clientes</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Tenha acesso a uma vitrine de oportunidades. Receba demandas de compradores de todo o Brasil e envie suas propostas de forma simples.
                    </p>
                    <ul className="space-y-4 mb-8">
                        {[
                            "Redução de custos com prospecção",
                            "Vendas assertivas no momento da necessidade",
                            "Novos clientes de várias regiões",
                            "Vitrine de promoções para lojistas"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-700">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-purple-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <Link to="/cadastro?tipo=fornecedor" className="text-purple-600 font-bold hover:text-purple-800 flex items-center gap-2 group">
                        Quero vender mais <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                <div
                  className={`md:w-1/2 transition-all duration-700 ease-out delay-200 ${
                    isSellersVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                >
                    <div className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
                        <div className="aspect-video bg-gray-900 relative">
                             {/* Placeholder for YouTube Video */}
                             <img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Fornecedores" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                             <div className="absolute inset-0 flex items-center justify-center">
                                <FontAwesomeIcon icon={faPlayCircle} className="text-6xl text-white opacity-80 group-hover:scale-110 transition-transform" />
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section ref={pricingRef} className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Planos Flexíveis</h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">Escolha o plano ideal para o tamanho do seu negócio. Experimente grátis por 30 dias.</p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Plan 1 */}
                <div
                  className={`border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 bg-white relative overflow-hidden ${
                    isPricingVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                >
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Econômico</h3>
                    <div className="text-4xl font-extrabold text-blue-600 mb-4">R$ 48<span className="text-sm text-gray-500 font-normal">/mês</span></div>
                    <ul className="text-left space-y-3 mb-8 text-gray-600 text-sm">
                        <li className="flex items-center gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-green-500" /> Até 1000 itens</li>
                        <li className="flex items-center gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-green-500" /> Suporte básico</li>
                    </ul>
                    <Link to="/cadastro" className="block w-full py-3 px-4 bg-gray-50 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors">Selecionar</Link>
                </div>

                {/* Plan 2 */}
                <div
                  className={`border-2 border-blue-600 rounded-2xl p-8 shadow-xl bg-white relative transform md:-translate-y-4 transition-all duration-500 delay-200 ${
                    isPricingVisible
                      ? 'opacity-100 translate-y-0 md:-translate-y-4'
                      : 'opacity-0 translate-y-10'
                  }`}
                >
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase">Popular</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Plus</h3>
                    <div className="text-4xl font-extrabold text-blue-600 mb-4">R$ 96<span className="text-sm text-gray-500 font-normal">/mês</span></div>
                    <ul className="text-left space-y-3 mb-8 text-gray-600 text-sm">
                        <li className="flex items-center gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-green-500" /> Até 2500 itens</li>
                        <li className="flex items-center gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-green-500" /> Suporte prioritário</li>
                        <li className="flex items-center gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-green-500" /> Relatórios avançados</li>
                    </ul>
                    <Link to="/cadastro" className="block w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">Selecionar</Link>
                </div>

                {/* Plan 3 */}
                <div
                  className={`border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 delay-300 bg-white ${
                    isPricingVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                >
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Premium</h3>
                    <div className="text-4xl font-extrabold text-gray-800 mb-4">Consulte</div>
                    <ul className="text-left space-y-3 mb-8 text-gray-600 text-sm">
                        <li className="flex items-center gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-green-500" /> Itens ilimitados</li>
                        <li className="flex items-center gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-green-500" /> Gerente de conta</li>
                        <li className="flex items-center gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-green-500" /> API de integração</li>
                    </ul>
                    <Link to="/contato" className="block w-full py-3 px-4 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-900 transition-colors">Fale Conosco</Link>
                </div>
            </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="container mx-auto px-6 text-center">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ${
                isCtaVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >Pronto para transformar seus negócios?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">Junte-se a milhares de empresas que já utilizam o Cia das Compras para otimizar seus processos.</p>
            <Link to="/cadastro" className="inline-block px-10 py-4 bg-white text-blue-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform">
                Criar Conta Grátis
            </Link>
            <p className="mt-4 text-sm opacity-70">Sem cartão de crédito necessário para começar.</p>
        </div>
      </section>
    </div>
  );
}
