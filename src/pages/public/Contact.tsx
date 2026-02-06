import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faPaperPlane,
  faCheckCircle,
  faComment,
  faGlobe
} from "@fortawesome/free-solid-svg-icons";
import { useOnScreen } from "./useOnScreen";

export default function Contact() {
  const formRef = useRef<HTMLDivElement>(null);
  const isFormVisible = useOnScreen(formRef, "-50px");

  const infoRef = useRef<HTMLDivElement>(null);
  const isInfoVisible = useOnScreen(infoRef, "-50px");

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulação de envio
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <div className="overflow-x-hidden bg-gray-50 font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-slate-900 text-white overflow-hidden">
         {/* Background decoration */}
         <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
         <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

         <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Fale Conosco</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
               Estamos prontos para atender você. Entre em contato para tirar dúvidas, enviar sugestões ou solicitar suporte.
            </p>
         </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Contact Info */}
          <div
            ref={infoRef}
            className={`w-full lg:w-1/3 space-y-8 transition-all duration-1000 ease-out ${isInfoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações de Contato</h2>
              <p className="text-gray-600 mb-8">
                Nossa equipe está disponível de segunda a sexta, das 8h às 18h.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Telefone</h3>
                  <p className="text-gray-600">+55 (19) 3212-1373</p>
                  <p className="text-sm text-gray-500 mt-1">Atendimento comercial e suporte</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
                  <FontAwesomeIcon icon={faComment} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">WhatsApp</h3>
                  <p className="text-gray-600">+55 (19) 99999-9999</p>
                  <p className="text-sm text-gray-500 mt-1">Resposta rápida</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">E-mail</h3>
                  <a href="mailto:webmaster@ciadascompras.com.br" className="text-blue-600 hover:underline">webmaster@ciadascompras.com.br</a>
                  <p className="text-sm text-gray-500 mt-1">Para assuntos gerais</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Endereço</h3>
                  <p className="text-gray-600">Campinas - SP</p>
                  <p className="text-sm text-gray-500 mt-1">Brasil</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Redes Sociais</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors shadow-sm">
                  <FontAwesomeIcon icon={faGlobe} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white transition-colors shadow-sm">
                  <FontAwesomeIcon icon={faGlobe} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-800 hover:text-white transition-colors shadow-sm">
                  <FontAwesomeIcon icon={faGlobe} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            ref={formRef}
            className={`w-full lg:w-2/3 bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 transition-all duration-1000 ease-out delay-200 ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Envie uma mensagem</h2>
            <p className="text-gray-500 mb-8">Preencha o formulário abaixo e entraremos em contato o mais breve possível.</p>

            {formStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-fade-in-up">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Mensagem Enviada!</h3>
                <p className="text-green-700">Obrigado pelo contato. Responderemos em breve.</p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="mt-6 text-green-700 font-semibold hover:underline"
                >
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold text-gray-700">Nome Completo</label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-gray-700">E-mail</label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-bold text-gray-700">Telefone / WhatsApp</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-bold text-gray-700">Assunto</label>
                    <select
                      id="subject"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50 focus:bg-white"
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="comercial">Comercial</option>
                      <option value="suporte">Suporte Técnico</option>
                      <option value="financeiro">Financeiro</option>
                      <option value="parceria">Parceria</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold text-gray-700">Mensagem</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                    placeholder="Como podemos ajudar?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {formStatus === 'submitting' ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} /> Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
