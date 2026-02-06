import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChevronDown, 
  faChevronUp, 
  faLeaf, 
  faPhone, 
  faEnvelope,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";
import { useOnScreen } from "./useOnScreen";
import logoImg from '../../assets/LogociaSite.png';

export default function FAQ() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderVisible = useOnScreen(headerRef, "-50px");
  
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "1- Quais as vantagens?",
      answer: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
             <div className="w-full md:w-auto flex justify-center">
                <div className="bg-blue-50 rounded-2xl p-6 w-32 h-32 flex items-center justify-center shadow-inner">
                   <FontAwesomeIcon icon={faLeaf} className="text-5xl text-green-500" />
                </div>
             </div>
             <p className="text-gray-600 flex-1 text-lg font-medium">
               Tanto compradores, quanto fornecedores, tem a sua disposição, recursos para negócio, rápido, seguro e eficaz.
             </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-6">
             <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3 text-lg">Para o comprador</h3>
                <p className="text-sm text-gray-600 text-justify leading-relaxed">
                  O Cia das Compras proporciona ao comprador economia de tempo e redução em custo na realização de uma cotação, como telefone, papeis; além de pesquisar o mercado, conseguindo ótimos preços na reposição de estoques e ainda participar numa comunidade de compras, unindo forças com outros compradores.
                </p>
             </div>
             <div className="flex items-center justify-center p-4">
                <img src={logoImg} alt="Cia das Compras" className="max-w-full h-auto opacity-90" />
             </div>
             <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3 text-lg">Para o Fornecedor</h3>
                <p className="text-sm text-gray-600 text-justify leading-relaxed">
                  Para o fornecedor, o Cia das Compras, proporciona economia no processo de vendas (exemplos: gasolina, telefone), coloca o fornecedor diante de seu cliente exatamente no momento da compra e amplia suas oportunidades de negócios com clientes novos de várias regiões.
                </p>
             </div>
          </div>
          <p className="text-center font-bold text-blue-600 text-lg pt-4">Sim! Nós podemos lhe oferecer inúmeras vantagens.</p>
        </div>
      )
    },
    {
      question: "2- Para o que serve esse site?",
      answer: "Uma ferramenta de trabalho para o comprador e uma oportunidade de melhores negócios tanto para fornecedor quanto para o comprador, sendo um ambiente amigável e prático aliado a todas as facilidades da internet."
    },
    {
      question: "3- Quem pode ser um comprador?",
      answer: "Loja de Autopeças, Frotista, Empresa de ônibus, Transportadora, Concessionária e outras empresas que comprem direto no atacado."
    },
    {
      question: "4- Quem pode ser um fornecedor?",
      answer: "Distribuidores, Indústrias e Representantes que vendem Autopeças e Acessórios no atacado."
    },
    {
      question: "5- Quanto custa para o comprador?",
      answer: "O cadastro é gratuito e temos as áreas de promoções. Já o sistema de cotação, funciona como assinatura mensal, onde o comprador tem acesso e utilização ilimitada ou limitada e também temos um plano grátis. Consulte-nos!"
    },
    {
      question: "6- Quanto custa para o fornecedor?",
      answer: "Para se cadastrar e responder às cotações, será cobrada uma taxa de manutenção do serviço de promoção de vendas baseados em suas vendas mensais pelo sistema. Temos outros serviços, como: Banners de publicidade, divulgação de promoções, e-mail e e-mail marketing. Entre em contato conosco para lhe enviaremos uma proposta."
    },
    {
      question: "7- Eu tenho um período de experiência gratuito?",
      answer: "Sim, o comprador tem 30 dias de experiência gratuita, passados os 30 dias, se desejar contratar o serviço, deverá escolher uns dos planos disponíveis ou mesmo o plano grátis. E o fornecedor após 30 dias de experiência, se desejar continuar pagará a taxa conforme suas vendas mensais."
    },
    {
      question: "8- O representante do distribuidor pode se cadastrar?",
      answer: "Sim, o representante é mais um fornecedor."
    },
    {
      question: "9- Os fornecedores vêem os preços uns dos outros?",
      answer: "Não, somente o comprador visualiza os preços dos diversos fornecedores que participaram de sua cotação. Os fornecedores vêem apenas o que os compradores querem comprar, e não os preços de seus concorrentes."
    },
    {
      question: "10- Os compradores vêem as cotações dos outros compradores?",
      answer: "Não, o comprador só visualiza suas cotações."
    },
    {
      question: "11- Eu consigo saber que fornecedor está participando de minhas cotações?",
      answer: "Sim, basta clicar na cotação e você verá uma relação com cada item solicitado, com seus fornecedores e preços. Além de saber também quais fornecedores acessaram suas cotações."
    },
    {
      question: "12- Como fico sabendo se o fornecedor recebeu o meu pedido ou não?",
      answer: "O sistema tem o registro dos seus pedidos enviados para os fornecedores. Inclusive, quando recebem o pedido, confirmam através de um comando que informa o comprador que seu pedido foi confirmado ou rejeitado pelo fornecedor."
    },
    {
      question: "13- É o Cia das Compras que envia o pedido para o fornecedor?",
      answer: "Não é a equipe do Cia das Compras, mas o próprio comprador que pode dar o comando de envio de pedido."
    },
    {
      question: "14- Como faço para ter um banner de publicidade?",
      answer: "Basta entrar em contato com nossa central que lhe enviaremos uma proposta."
    },
    {
      question: "15- Qual e a política de Privacidade?",
      answer: (
        <span>
          Divulgamos em nosso <a href="/privacidade" className="text-blue-600 font-bold hover:underline">Home a política de privacidade</a> da empresa.
        </span>
      )
    },
    {
      question: "16- O que faço para aderir ao sistema como comprador?",
      answer: "Cadastre-se e aguarde um e-mail com o treinamento. O sistema é muito simples de operar."
    },
    {
      question: "17- O que faço para aderir ao sistema como fornecedor?",
      answer: "Cadastre-se e aguarde um e-mail com o treinamento. O sistema é muito simples de operar."
    },
    {
      question: "18- Posso ser comprador e também fornecedor?",
      answer: "Você precisa estar de acordo com as condições das perguntas 3 e 4."
    },
    {
      question: "19- Como posso pagar minha mensalidade?",
      answer: "Você receberá mensalmente um boleto bancário, via e-mail."
    },
    {
      question: "20- É possível eu ter o sistema Cia das Compras (e-procurement) instalado em meu site, para o uso exclusivo de minha empresa?",
      answer: "Sim, nós desenvolvemos também nossa ferramenta em outros sites, mas apenas em usuários finais. Entre em contato com nossa central para maiores esclarecimentos."
    },
    {
      question: "21- O Cia das Compras pode ser usado para comprar outros produtos que não sejam do segmento automotivo?",
      answer: "Sim, podemos incluir segmentos novos, entre em contato conosco para melhores informações."
    },
    {
      question: "22- O que compreende o segmento de produtos automotivos para o Cia das Compras?",
      answer: "A comercialização no atacado de Autopeças e Acessórios e similares."
    },
    {
      question: "23- Como faço para cancelar o meu cadastro?",
      answer: "Basta nos enviar um e-mail solicitando o cancelamento, com 30 dias de antecedência."
    },
    {
      question: "24- Tenho alguns fornecedores que não utilizam o site, posso pedir para que se cadastrem?",
      answer: "Sim, quanto mais fornecedores tivermos, mais rico e competitivo fica nosso sistema."
    },
    {
      question: "25- O Cia das Compras vende sua solução de e-procurement para outros segmentos?",
      answer: "Sim, este tipo de serviço é diferenciado. Entre em contato com nossa Central, e daremos melhores informações."
    },
    {
      question: "26- Esse site é seguro?",
      answer: "Sim, todos os usuários acessam o site apenas com sua senha aprovada."
    },
    {
      question: "27- Existe um contrato de serviço?",
      answer: "Sim, existe um contrato que regulamenta nossa prestação de serviço, conforme divulgado no site, na área de cadastro."
    },
    {
      question: "28- Qual o telefone e e-mail de suporte?",
      answer: (
        <ul className="space-y-2">
            <li className="flex items-center gap-2"><FontAwesomeIcon icon={faPhone} className="text-blue-600" /> (19) 3212-1373</li>
            <li className="flex items-center gap-2"><FontAwesomeIcon icon={faPhone} className="text-green-600" /> (19) 99800-9230 (WhatsApp)</li>
            <li className="flex items-center gap-2"><FontAwesomeIcon icon={faPhone} className="text-green-600" /> (19) 99788-6616 (WhatsApp)</li>
            <li className="flex items-center gap-2"><FontAwesomeIcon icon={faEnvelope} className="text-purple-600" /> suporte@ciadascompras.com.br</li>
        </ul>
      )
    }
  ];

  return (
    <div className="overflow-x-hidden bg-gray-50 font-sans text-gray-800 pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-slate-900 text-white overflow-hidden">
         <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
         <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
         
         <div className="container mx-auto px-6 relative z-10 text-center" ref={headerRef}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6 backdrop-blur-sm">
                <FontAwesomeIcon icon={faQuestionCircle} className="text-3xl text-blue-300" />
            </div>
            <h1 className={`text-4xl md:text-5xl font-extrabold mb-6 tracking-tight transition-all duration-700 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Perguntas Frequentes
            </h1>
            <p className={`text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-100 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
               Tire suas dúvidas sobre o funcionamento, cadastro e planos do Cia das Compras.
            </p>
         </div>
      </section>

      {/* FAQ Accordion */}
      <section className="container mx-auto px-6 -mt-10 relative z-20 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-100 last:border-0">
                    <button
                        onClick={() => toggleAccordion(index)}
                        className={`w-full px-6 py-5 text-left flex items-center justify-between transition-colors duration-200 ${openIndex === index ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                    >
                        <span className={`font-bold text-lg ${openIndex === index ? 'text-blue-600' : 'text-gray-700'}`}>
                            {faq.question}
                        </span>
                        <FontAwesomeIcon 
                            icon={openIndex === index ? faChevronUp : faChevronDown} 
                            className={`text-sm transition-transform duration-300 ${openIndex === index ? 'text-blue-600' : 'text-gray-400'}`}
                        />
                    </button>
                    <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                            {typeof faq.answer === 'string' ? (
                                <p className="text-justify">{faq.answer}</p>
                            ) : (
                                faq.answer
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Still have questions? */}
      <section className="container mx-auto px-6 mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ainda tem dúvidas?</h3>
          <p className="text-gray-600 mb-8">Nossa equipe está pronta para ajudar você.</p>
          <a href="/contato" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
              Fale Conosco
          </a>
      </section>
    </div>
  );
}
