import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faCogs,
  faFileAlt,
  faHourglassHalf,
  faChartArea,
  faList,
  faUndo,
  faCreditCard,
  faIndustry,
  faCartArrowDown,
  faDollarSign,
  faEnvelope,
  faStar,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useOnScreen } from "./useOnScreen";

export default function HowItWorks() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderVisible = useOnScreen(headerRef, "-50px");

  const buyerRef = useRef<HTMLDivElement>(null);
  const isBuyerVisible = useOnScreen(buyerRef, "-50px");

  const supplierRef = useRef<HTMLDivElement>(null);
  const isSupplierVisible = useOnScreen(supplierRef, "-50px");

  const [activeBuyerStep, setActiveBuyerStep] = useState(0);
  const [activeSupplierStep, setActiveSupplierStep] = useState(0);

  const buyerSteps = [
    {
      icon: faFileAlt,
      title: "Passo 1",
      description: "Os itens que você deseja cotar os preços podem ser digitados no site ou enviados via arquivo 'texto'. Também podemos integrar o seu software local com nosso sistema."
    },
    {
      icon: faHourglassHalf,
      title: "Passo 2",
      description: "Após enviar os itens para cotação, a resposta da pesquisa destes varia, dependendo do número de itens solicitados. Nossa média de resposta está entre uma e oito horas úteis."
    },
    {
      icon: faChartArea,
      title: "Passo 3",
      description: "Na resposta da cotação, você recebe no site os preços de todos os fornecedores que participaram, em ordem de melhor preço."
    },
    {
      icon: faList,
      title: "Passo 4",
      description: "Para finalizar, você tem a opção de fechar com os preços mais baixos ou transferir o item para outro fornecedor, mesmo que ele esteja em último lugar; isso, para resolver problemas com faturamento mínimo e para que você tenha total liberdade de escolha."
    },
    {
      icon: faUndo,
      title: "Passo 5",
      description: "Nesse pré-pedido, você pode alterar ou apagar os itens, e incluir outros itens que não foram cotados, na caixa de observações."
    },
    {
      icon: faCreditCard,
      title: "Passo 6",
      description: "Clicando no botão FECHAR PEDIDO, este é enviado para a área de vendas do fornecedor imediatamente, e o fornecedor, após receber o seu pedido, pode confirmá-lo. Essa informação volta para a sua Sala de Controle."
    }
  ];

  const supplierSteps = [
    {
      icon: faIndustry,
      title: "Passo 1",
      description: "Após ter conectado ao site, você entrará numa pagina exclusiva de sua empresa."
    },
    {
      icon: faCartArrowDown,
      title: "Passo 2",
      description: "Clique no link COTAÇÕES para acessar as cotações."
    },
    {
      icon: faList,
      title: "Passo 3",
      description: "Você verá uma relação das cotações ativas; com as seguintes informações: data de entrada, empresa compradora, localização e resumo da cotação."
    },
    {
      icon: faDollarSign,
      title: "Passo 4",
      description: "Na cotação, você visualizará os itens com um espaço para digitar o preço e marca e, se preferir, poderá baixar uma planilha para responder a cotação off-line e em seguida enviá-la através do site."
    },
    {
      icon: faEnvelope,
      title: "Passo 5",
      description: "Quando vier um retorno de PEDIDO, você receberá um e-mail com uma cópia, e na primeira página no tópico PEDIDOS PENDENTES, haverá um link com data e o nome da empresa compradora. Clicando na data, abrirá o pedido com os itens. Logo abaixo do corpo do pedido, terá uma caixa de observações, e o que você escrever nela será enviado para o comprador. Em seguida, basta clicar em um dos botões CONFIRMAR ou REJEITAR."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-gray-50 font-sans text-gray-800 pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-slate-900 text-white overflow-hidden">
         <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
         <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
         
         <div className="container mx-auto px-6 relative z-10 text-center" ref={headerRef}>
            <h1 className={`text-4xl md:text-5xl font-extrabold mb-6 tracking-tight transition-all duration-700 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Como Funciona
            </h1>
            <p className={`text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-100 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
               Entenda o fluxo de cotações e pedidos que conecta compradores e fornecedores de forma ágil e segura.
            </p>
         </div>
      </section>

      {/* Intro Cards */}
      <section className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 flex flex-col items-center text-center hover:shadow-2xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-6">
                    <FontAwesomeIcon icon={faCartPlus} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Recursos para o Comprador</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                    Pesquisar os melhores preços no mercado! Esse é o grande diferencial do Cia das Compras: poupando seu tempo e seu dinheiro.
                </p>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 flex flex-col items-center text-center hover:shadow-2xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl mb-6">
                    <FontAwesomeIcon icon={faCogs} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Recursos para o Fornecedor</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                    Além da ferramenta de cotação, você também poderá utilizar nosso sistema de promoção e lista de preços. Consulte-nos.
                </p>
            </div>
        </div>
      </section>

      {/* Buyer Flow */}
      <section className="py-20" ref={buyerRef}>
        <div className="container mx-auto px-6">
            <div className={`transition-all duration-1000 ${isBuyerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="text-center mb-12">
                    <span className="text-green-600 font-bold uppercase tracking-wider text-sm">Fluxo de Compras</span>
                    <h2 className="text-3xl font-bold text-gray-900 mt-2">Para o Comprador</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Cotação individual de suas necessidades de compras, pesquisa preços e condições no mercado de autopeças em nível nacional.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Steps Navigation */}
                    <div className="w-full md:w-1/3 space-y-2">
                        {buyerSteps.map((step, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveBuyerStep(index)}
                                className={`w-full text-left px-6 py-4 rounded-xl transition-all flex items-center gap-4 ${
                                    activeBuyerStep === index 
                                    ? 'bg-green-600 text-white shadow-lg transform scale-105' 
                                    : 'bg-white text-gray-600 hover:bg-green-50'
                                }`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${activeBuyerStep === index ? 'bg-white text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                                    {index + 1}
                                </div>
                                <span className="font-bold">{step.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* Step Content */}
                    <div className="w-full md:w-2/3 bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 min-h-[300px] flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl">
                                <FontAwesomeIcon icon={buyerSteps[activeBuyerStep].icon} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{buyerSteps[activeBuyerStep].title}</h3>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {buyerSteps[activeBuyerStep].description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Promotions & Clients */}
      <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-16">
                  <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Promoções</h3>
                      <p className="text-gray-600 mb-6 text-justify">
                          Nesta área, são divulgadas promoções de vários fornecedores, todas com a oportunidade de compras automáticas. Esse sistema possui uma versão própria, onde você entra no site, verifica as promoções, coloca as quantidades desejadas e envia o pedido para o fornecedor.
                      </p>
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-800 text-sm font-semibold">
                          <FontAwesomeIcon icon={faStar} className="mr-2" />
                          Área de acesso gratuito para cadastrados.
                      </div>
                  </div>
                  <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Principais Clientes</h3>
                      <div className="bg-gray-50 rounded-2xl p-6 h-64 overflow-y-auto custom-scrollbar">
                          <ul className="space-y-2 text-sm text-gray-600">
                              {[
                                  "3T AUTOPEÇAS - Araras",
                                  "ALBERTO CAIO TAMBORRINO - São Paulo",
                                  "AUTOPEÇAS MONTES PIRINEUS - São Paulo",
                                  "COMBREK FREIOS - São Paulo",
                                  "CARBWEL- São Paulo",
                                  "MARONEZ AUTO PEÇAS - Santa Bárbara D Oeste",
                                  "MELÃOCAR AUTO PEÇAS - São Paulo",
                                  "PARANA PEÇAS - São Paulo",
                                  "PRINCAR - Araraquara",
                                  "RECOMPEÇAS - Leme",
                                  "GAINER AUTOPEÇAS - São Paulo",
                                  "SCARIO AUTOPEÇAS - São Paulo",
                                  "SOUZA E SAMPAIO - São Paulo",
                                  "TARUMÃ AUTOPEÇAS - Valinhos",
                                  "V.BRONDANI - Palotina",
                                  "VIA VERDE - Manaus",
                                  "GLOBAL - Manaus",
                                  "VIMAP DISTR. PEÇAS - São Paulo",
                                  "W.V GOUVEIA - STOCK AUTOPEÇAS - Campinas-SP"
                              ].map((client, i) => (
                                  <li key={i} className="flex items-center gap-2">
                                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xs" />
                                      {client}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Supplier Flow */}
      <section className="py-20 bg-gray-50" ref={supplierRef}>
        <div className="container mx-auto px-6">
            <div className={`transition-all duration-1000 ${isSupplierVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="text-center mb-12">
                    <span className="text-purple-600 font-bold uppercase tracking-wider text-sm">Fluxo de Vendas</span>
                    <h2 className="text-3xl font-bold text-gray-900 mt-2">Para o Fornecedor</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Aumente suas vendas respondendo a cotações de compradores de todo o Brasil.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row-reverse gap-8 items-start">
                    {/* Steps Navigation */}
                    <div className="w-full md:w-1/3 space-y-2">
                        {supplierSteps.map((step, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveSupplierStep(index)}
                                className={`w-full text-left px-6 py-4 rounded-xl transition-all flex items-center gap-4 ${
                                    activeSupplierStep === index 
                                    ? 'bg-purple-600 text-white shadow-lg transform scale-105' 
                                    : 'bg-white text-gray-600 hover:bg-purple-50'
                                }`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${activeSupplierStep === index ? 'bg-white text-purple-600' : 'bg-gray-200 text-gray-500'}`}>
                                    {index + 1}
                                </div>
                                <span className="font-bold">{step.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* Step Content */}
                    <div className="w-full md:w-2/3 bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 min-h-[300px] flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl">
                                <FontAwesomeIcon icon={supplierSteps[activeSupplierStep].icon} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{supplierSteps[activeSupplierStep].title}</h3>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {supplierSteps[activeSupplierStep].description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold mb-12">O que dizem nossos clientes</h2>
              <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
                      <p className="italic text-gray-300 mb-6">"Sou comprador de uma loja de autopeças, e utilizo o CIA DAS COMPRAS há aproximadamente 3 anos. Ele me proporcionou uma grande economia de tempo, além de ter me proporcionado bom ganho financeiro."</p>
                      <div className="font-bold">Dener Magela</div>
                      <div className="text-sm text-gray-400">Maronez Autopeças - Santa Bárbara d'Oeste - SP</div>
                  </div>
                  <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
                      <p className="italic text-gray-300 mb-6">"Eu tive a sorte de encontrar este site e me tornei cliente da Cia das Compras há sete anos. Além de economizar muito tempo, reduzi os custos da minha empresa consideravelmente."</p>
                      <div className="font-bold">Ricardo Guimarães</div>
                      <div className="text-sm text-gray-400">Global - Rio de Janeiro - RJ</div>
                  </div>
                  <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
                      <p className="italic text-gray-300 mb-6">"Utilizo o site desde 2005 e tive muitos ganhos com ele, além de poder aumentar significativamente minhas margens de lucro. Não perco tempo com fornecedores, tudo é via sistema."</p>
                      <div className="font-bold">Marcio</div>
                      <div className="text-sm text-gray-400">V. Brondani Autopeças - Palotina - PR</div>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
          <div className="container mx-auto px-6">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">+55 (19) 3212-1373</h2>
              <p className="text-gray-600 mb-8">Estamos à disposição para tirar suas dúvidas.</p>
              <Link to="/contato" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
                  Fale Conosco
              </Link>
          </div>
      </section>
    </div>
  );
}
