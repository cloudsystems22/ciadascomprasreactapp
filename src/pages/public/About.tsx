import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHistory, 
  faBullseye, 
  faEye, 
  faHandHoldingHeart, 
  faBuilding, 
  faMapMarkerAlt, 
  faUsers 
} from "@fortawesome/free-solid-svg-icons";
import { useOnScreen } from "./useOnScreen";

export default function About() {
  const historyRef = useRef<HTMLDivElement>(null);
  const isHistoryVisible = useOnScreen(historyRef, "-50px");

  const mvvRef = useRef<HTMLDivElement>(null);
  const isMvvVisible = useOnScreen(mvvRef, "-50px");

  const servicesRef = useRef<HTMLDivElement>(null);
  const isServicesVisible = useOnScreen(servicesRef, "-50px");

  return (
    <div className="overflow-x-hidden bg-gray-50 font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-slate-900 text-white overflow-hidden">
         {/* Background decoration */}
         <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
         <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
         
         <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Quem Somos</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
               Conheça a história da Cia das Compras, nossa missão de inovação e os valores que guiam nosso trabalho no mercado automotivo.
            </p>
         </div>
      </section>

      {/* History Section */}
      <section ref={historyRef} className={`py-20 transition-all duration-1000 ease-out ${isHistoryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-600 to-cyan-400"></div>
            <div className="flex flex-col md:flex-row gap-10 items-start">
               <div className="md:w-1/4 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-3xl mb-4 shadow-sm">
                     <FontAwesomeIcon icon={faHistory} />
                  </div>
                  <span className="text-4xl font-black text-gray-200">2001</span>
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Fundação</span>
               </div>
               <div className="md:w-3/4">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa História</h2>
                  <div className="space-y-4 text-gray-600 text-justify leading-relaxed">
                    <p>
                        Em meados de 2001, iniciou-se nosso projeto de e-procurement para o segmento de produtos automotivos, 
                        com a junção de uma empresa de Tecnologia da Informação e uma Loja de Autopeças, unindo capacidade técnica com
                        conhecimento profundo de mercado.
                    </p>
                    <p>
                        Ao constatarmos que o processo de compras de uma loja de Autopeças demandava muitos dias e 
                        muito trabalho operacional, pensamos numa solução tecnológica que pudesse agilizar esse processo, além de ampliar oportunidades 
                        de negócios. Nossa meta seria trazer o mercado atacadista para dentro da tela do computador do comprador.
                    </p>
                    <p>
                        Em 2001, ficou pronta nossa primeira versão e esse projeto passou a se tornar realidade.
                    </p>
                    <p className="text-lg font-semibold text-blue-700 mt-4 border-l-4 border-blue-500 pl-4">
                        Hoje centenas de usuários compram e vendem milhares de peças pelo nosso sistema.
                    </p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values & Video */}
      <section ref={mvvRef} className={`py-16 bg-white transition-all duration-1000 ease-out ${isMvvVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
         <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
               {/* Left: Video */}
               <div className="w-full lg:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video group">
                     <iframe 
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/xS2iqBcoilY?ecver=1" 
                        title="Vídeo Institucional"
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                     ></iframe>
                  </div>
                  <p className="text-center text-sm text-gray-400 mt-3 italic">Conheça mais sobre nossa liderança e atuação.</p>
               </div>

               {/* Right: MVV Cards */}
               <div className="w-full lg:w-1/2 space-y-8">
                  {/* Missão */}
                  <div className="flex gap-5">
                     <div className="flex-shrink-0 mt-1">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
                            <FontAwesomeIcon icon={faBullseye} className="text-xl" />
                        </div>
                     </div>
                     <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Missão</h3>
                        <p className="text-gray-600 text-sm leading-relaxed text-justify">
                           Desenvolver um novo ambiente de negócios, focado em tecnologia de ponta, proporcionando aos nossos clientes compradores 
                           aumento em seus lucros e aproveitamento maior do seu tempo; e a nossos clientes fornecedores, 
                           ampliar suas oportunidades de negócio e reduzir custos de processos de vendas.
                        </p>
                     </div>
                  </div>

                  {/* Visão */}
                  <div className="flex gap-5">
                     <div className="flex-shrink-0 mt-1">
                        <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center shadow-sm">
                            <FontAwesomeIcon icon={faEye} className="text-xl" />
                        </div>
                     </div>
                     <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Visão</h3>
                        <p className="text-gray-600 text-sm leading-relaxed text-justify">
                           Liderança em e-procurement no setor de Autopeças e Acessórios na América Latina e grandes participações em outros segmentos.
                        </p>
                     </div>
                  </div>

                  {/* Valores */}
                  <div className="flex gap-5">
                     <div className="flex-shrink-0 mt-1">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-sm">
                            <FontAwesomeIcon icon={faHandHoldingHeart} className="text-xl" />
                        </div>
                     </div>
                     <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Valores</h3>
                        <p className="text-gray-600 text-sm leading-relaxed text-justify">
                           Trabalhar de uma forma transparente e idônea, garantindo aos nossos clientes total confiança no sistema, repartindo ganho com os nossos colaboradores, mantendo o foco nas necessidades dos clientes, estando totalmente correto com as leis do país e com os princípios éticos.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Company & Services */}
      <section ref={servicesRef} className={`py-20 transition-all duration-1000 ease-out ${isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
         <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">Nossa Estrutura</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {/* Card 1 */}
               <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-2xl mb-6">
                    <FontAwesomeIcon icon={faBuilding} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Empresa e Serviços</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                     A empresa S.D.Bastos Tecnologia ltda, através da marca Cia das Compras, atua no mercado de Autopeças como Integrador. Prestamos serviços de cotação eletrônica, pedido automático, sistema de promoções, representação de fábricas e publicidade.
                  </p>
               </div>

               {/* Card 2 */}
               <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center transform md:-translate-y-4">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 text-2xl mb-6">
                    <FontAwesomeIcon icon={faUsers} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Nossos Clientes</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                     Atendemos Lojas de Autopeças, Empresas de ônibus, Frotistas, Centros de Serviços, Concessionárias e outras empresas que comprem direto no atacado. Totalizamos aproximadamente 60.000 empresas no Brasil e Mercosul.
                  </p>
               </div>

               {/* Card 3 */}
               <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600 text-2xl mb-6">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Localização</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                     Estamos localizados em Campinas-SP, um dos maiores centros de tecnologia do país. Mantemos parcerias com excelentes empresas de tecnologia para garantir a melhor infraestrutura.
                  </p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
