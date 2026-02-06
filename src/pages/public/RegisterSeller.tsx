import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCheck, 
  faTimes, 
  faStar, 
  faShoppingCart, 
  faStore 
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useOnScreen } from "./useOnScreen";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [userType, setUserType] = useState<'buyer' | 'seller'>('buyer');

  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderVisible = useOnScreen(headerRef, "-50px");

  const cardsRef = useRef<HTMLDivElement>(null);
  const areCardsVisible = useOnScreen(cardsRef, "-50px");

  return (
    <div className="overflow-x-hidden bg-gray-50 font-sans text-gray-800 pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-slate-900 text-white overflow-hidden">
         <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
         <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
         
         <div className="container mx-auto px-6 relative z-10 text-center" ref={headerRef}>
            <h1 className={`text-4xl md:text-5xl font-extrabold mb-6 tracking-tight transition-all duration-700 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Planos e Preços
            </h1>
            <p className={`text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-100 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
               Escolha o plano ideal para o seu negócio e comece a economizar hoje mesmo.
            </p>

            {/* Type Toggle */}
            <div className={`mt-10 inline-flex bg-slate-800 p-1 rounded-xl border border-slate-700 transition-all duration-700 delay-200 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <button 
                    onClick={() => setUserType('buyer')}
                    className={`px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${userType === 'buyer' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                    <FontAwesomeIcon icon={faShoppingCart} /> Compradores
                </button>
                <button 
                    onClick={() => setUserType('seller')}
                    className={`px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${userType === 'seller' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                    <FontAwesomeIcon icon={faStore} /> Fornecedores
                </button>
            </div>
         </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-6 -mt-16 relative z-20" ref={cardsRef}>
        {userType === 'buyer' ? (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Econômico */}
                <div className={`bg-white rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col transition-all duration-700 ${areCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-500 uppercase tracking-wider">Econômico</h3>
                        <div className="mt-4 flex items-baseline gap-1">
                            <span className="text-4xl font-extrabold text-gray-900">R$ 48</span>
                            <span className="text-gray-500 font-medium">/mês</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Ideal para pequenas oficinas.</p>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-start gap-3 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1" />
                            <span>Até <strong>1000 itens</strong> cotados por mês</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1" />
                            <span>Acesso a promoções</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1" />
                            <span>Suporte por e-mail</span>
                        </li>
                    </ul>
                    <Link to="/cadastro?plano=economico" className="w-full block text-center bg-blue-50 text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-100 transition-colors">
                        Começar Agora
                    </Link>
                </div>

                {/* Plus */}
                <div className={`bg-white rounded-3xl shadow-2xl border-2 border-blue-500 p-8 flex flex-col relative transform md:-translate-y-4 transition-all duration-700 delay-100 ${areCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl uppercase">
                        Mais Popular
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-blue-600 uppercase tracking-wider">Plus</h3>
                        <div className="mt-4 flex items-baseline gap-1">
                            <span className="text-5xl font-extrabold text-gray-900">R$ 96</span>
                            <span className="text-gray-500 font-medium">/mês</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Para lojas em crescimento.</p>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-start gap-3 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1" />
                            <span>Até <strong>2500 itens</strong> cotados por mês</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1" />
                            <span>Prioridade nas cotações</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1" />
                            <span>Relatórios de compras</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1" />
                            <span>Suporte prioritário</span>
                        </li>
                    </ul>
                    <Link to="/cadastro?plano=plus" className="w-full block text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
                        Assinar Plus
                    </Link>
                </div>

                {/* Premium */}
                <div className={`bg-white rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col transition-all duration-700 delay-200 ${areCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-500 uppercase tracking-wider">Premium</h3>
                        <div className="mt-4 flex items-baseline gap-1">
                            <span className="text-4xl font-extrabold text-gray-900">Consulte</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Para grandes redes e frotas.</p>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-start gap-3 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1" />
                            <span>Utilização <strong>Ilimitada</strong></span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1" />
                            <span>API de Integração</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1" />
                            <span>Gerente de conta dedicado</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1" />
                            <span>Customizações sob medida</span>
                        </li>
                    </ul>
                    <Link to="/contato" className="w-full block text-center bg-gray-800 text-white font-bold py-3 rounded-xl hover:bg-gray-900 transition-colors">
                        Fale Conosco
                    </Link>
                </div>
            </div>
        ) : (
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-3xl mx-auto border border-gray-100">
                <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                    <FontAwesomeIcon icon={faStore} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Planos para Fornecedores</h2>
                <p className="text-gray-600 mb-8">
                    Aumente suas vendas alcançando milhares de compradores em todo o Brasil. 
                    Nossos planos para fornecedores são baseados no volume de vendas e exposição desejada.
                </p>
                <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
                    <div className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-bold text-gray-900 mb-2">Pacote VIP</h4>
                        <p className="text-sm text-gray-600">Destaque sua marca com banners e prioridade nas cotações.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-bold text-gray-900 mb-2">Pacote Econômico</h4>
                        <p className="text-sm text-gray-600">Ideal para quem está começando a vender online.</p>
                    </div>
                </div>
                <Link to="/contato" className="inline-block bg-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-purple-700 transition-colors shadow-lg">
                    Consultar Condições
                </Link>
            </div>
        )}

        {/* Trial Banner */}
        <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-8 text-white text-center shadow-lg transform hover:scale-[1.01] transition-transform">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="text-3xl bg-white/20 w-16 h-16 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faStar} />
                </div>
                <div className="text-left">
                    <h3 className="text-2xl font-bold">Teste Grátis por 30 Dias!</h3>
                    <p className="text-green-50 font-medium">Cadastre-se agora e aproveite todas as funcionalidades sem compromisso.</p>
                </div>
                <div className="md:ml-auto">
                    <Link to="/cadastro" className="bg-white text-green-600 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-50 transition-colors">
                        Cadastrar Grátis
                    </Link>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
