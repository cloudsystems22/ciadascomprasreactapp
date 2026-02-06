import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faHandshake, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useOnScreen } from "./useOnScreen";
import { getBannersForn, type BannerForn } from "../../api/banners";

export default function Suppliers() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderVisible = useOnScreen(headerRef, "-50px");

  const gridRef = useRef<HTMLDivElement>(null);
  const isGridVisible = useOnScreen(gridRef, "-100px");

  const listRef = useRef<HTMLDivElement>(null);
  const isListVisible = useOnScreen(listRef, "-100px");

  const ctaRef = useRef<HTMLDivElement>(null);
  const isCtaVisible = useOnScreen(ctaRef, "-100px");

  const [suppliersWithLogo, setSuppliersWithLogo] = useState<BannerForn[]>([]);
  const [suppliersTextOnly, setSuppliersTextOnly] = useState<BannerForn[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca fornecedores com logo
        const logos = await getBannersForn('logo');
        setSuppliersWithLogo(logos);

        // Busca fornecedores sem logo (texto)
        const texts = await getBannersForn('texto'); 
        setSuppliersTextOnly(texts);
      } catch (error) {
        console.error("Erro ao carregar fornecedores", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-x-hidden bg-gray-50 font-sans text-gray-800 pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-slate-900 text-white overflow-hidden">
         <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
         <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
         
         <div className="container mx-auto px-6 relative z-10 text-center" ref={headerRef}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6 backdrop-blur-sm">
                <FontAwesomeIcon icon={faTruck} className="text-3xl text-purple-300" />
            </div>
            <h1 className={`text-4xl md:text-5xl font-extrabold mb-6 tracking-tight transition-all duration-700 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Principais Fornecedores
            </h1>
            <p className={`text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-100 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
               Conectamos você aos maiores distribuidores e fabricantes de autopeças do Brasil, garantindo variedade, qualidade e os melhores preços.
            </p>
         </div>
      </section>

      {/* Suppliers Grid (With Logo) */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Nossos Parceiros</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Contamos com um grande número de distribuidores cadastrados que utilizam o site para expandir seus negócios e alcançar novos clientes em todo o território nacional.
            </p>
        </div>

        {/* Wrapper com a ref para garantir que a animação funcione independente do loading */}
        <div ref={gridRef} className={`transition-all duration-1000 ${isGridVisible ? 'opacity-100' : 'opacity-0'}`}>
            {loading ? (
                <div className="text-center py-20 text-gray-500">Carregando fornecedores...</div>
            ) : (
                <div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {suppliersWithLogo.map((supplier, index) => (
                    <div 
                      key={supplier.ID_BANNER_BAN}
                      className="bg-white rounded-2xl p-8 flex flex-col items-center text-center border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                      style={{ transitionDelay: `${Math.min(index * 50, 1000)}ms` }} // Limita o delay máximo
                    >
                      <div className="h-40 w-full flex items-center justify-center mb-6">
                          <a href={supplier.LINK_EMPRESA} target="_blank" rel="noopener noreferrer" className="block w-full h-full flex items-center justify-center">
                            <img 
                                src={`https://www.ciadascompras.com.br/img/${supplier.LOGO_GRANDE}`} 
                                alt={supplier.TITULO} 
                                className="max-h-full max-w-full object-contain" 
                            />
                          </a>
                      </div>
                      
                      <div className="space-y-2">
                          <h3 className="font-bold text-lg text-gray-900">{supplier.TITULO}</h3>
                          {supplier.SUBTITULO && <p className="text-sm text-gray-500">{supplier.SUBTITULO}</p>}
                          
                          {(supplier.FONE1 || supplier.FONE2) && (
                              <div className="pt-4 flex items-center justify-center gap-2 text-sm font-medium text-gray-700">
                                  <FontAwesomeIcon icon={faPhone} className="text-blue-500" />
                                  <span>
                                      {supplier.FONE1}
                                      {supplier.FONE1 && supplier.FONE2 && " - "}
                                      {supplier.FONE2}
                                  </span>
                              </div>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
            )}
        </div>
      </section>

      {/* Suppliers List (Text Only) */}
      {/* Wrapper com a ref para garantir visibilidade */}
      <div ref={listRef} className={`transition-all duration-1000 ${isListVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {!loading && suppliersTextOnly.length > 0 && (
              <section className="container mx-auto px-6 pb-20 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 mb-20">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Outros Fornecedores</h3>
                  <div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                      {suppliersTextOnly.map((supplier) => (
                          <div key={supplier.ID_BANNER_BAN} className="p-4 border-b border-gray-100 last:border-0 md:border-b-0">
                              <h4 className="font-bold text-gray-800 text-sm">{supplier.TITULO}</h4>
                              {supplier.SUBTITULO && <p className="text-xs text-gray-500 mt-1">{supplier.SUBTITULO}</p>}
                          </div>
                      ))}
                  </div>
              </section>
          )}
      </div>

      {/* Callout */}
      <section className="container mx-auto px-6 mb-20">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
              <h3 className="text-xl md:text-2xl font-bold text-blue-800">
                  Além de centenas de outros fornecedores disponíveis no site... <br className="hidden md:block" />
                  Você pode também indicar fornecedores ou representantes que você deseja.
              </h3>
          </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6" ref={ctaRef}>
        <div className={`bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-3xl p-12 shadow-2xl transition-all duration-1000 ${isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                        <FontAwesomeIcon icon={faHandshake} />
                        Seja um Fornecedor Parceiro
                    </h2>
                    <p className="text-purple-100 max-w-2xl">
                        Amplie suas oportunidades de negócio, reduza custos de vendas e conecte-se com milhares de compradores em todo o país.
                    </p>
                </div>
                <div className="flex-shrink-0">
                    <Link to="/cadastro?tipo=fornecedor" className="inline-block bg-white text-purple-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-gray-100 transition-colors text-lg transform hover:scale-105">
                        Cadastre-se Agora
                    </Link>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
