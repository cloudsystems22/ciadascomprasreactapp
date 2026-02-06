import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faHandshake } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useOnScreen } from "./useOnScreen";

// Mock data for suppliers. In a real app, this would come from an API.
const suppliers = [
  { name: "Bosch", logo: "https://placehold.co/200x100/f0f4f8/4a5568?text=Bosch" },
  { name: "SKF", logo: "https://placehold.co/200x100/f0f4f8/4a5568?text=SKF" },
  { name: "Valeo", logo: "https://placehold.co/200x100/f0f4f8/4a5568?text=Valeo" },
  { name: "Magneti Marelli", logo: "https://placehold.co/200x100/f0f4f8/4a5568?text=Marelli" },
  { name: "Sachs", logo: "https://placehold.co/200x100/f0f4f8/4a5568?text=Sachs" },
  { name: "Fras-le", logo: "https://placehold.co/200x100/f0f4f8/4a5568?text=Fras-le" },
  { name: "Nakata", logo: "https://placehold.co/200x100/f0f4f8/4a5568?text=Nakata" },
  { name: "Cofap", logo: "https://placehold.co/200x100/f0f4f8/4a5568?text=Cofap" },
  { name: "NGK", logo: "https://placehold.co/200x100/f0f4f8/4a5568?text=NGK" },
  { name: "Dayco", logo: "https://placehold.co/200x100/f0f4f8/4a5568?text=Dayco" },
  { name: "Goodyear", logo: "https://placehold.co/200x100/f0f4f8/4a5568?text=Goodyear" },
  { name: "Pirelli", logo: "https://placehold.co/200x100/f0f4f8/4a5568?text=Pirelli" },
  { name: "3M", logo: "https://placehold.co/200x100/f0f4f8/4a5568?text=3M" },
  { name: "Hella", logo: "https://placehold.co/200x100/f0f4f8/4a5568?text=Hella" },
  { name: "Luk", logo: "https://placehold.co/200x100/f0f4f8/4a5568?text=LuK" },
  { name: "Gates", logo: "https://placehold.co/200x100/f0f4f8/4a5568?text=Gates" },
];

export default function Suppliers() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderVisible = useOnScreen(headerRef, "-50px");

  const gridRef = useRef<HTMLDivElement>(null);
  const isGridVisible = useOnScreen(gridRef, "-100px");

  const ctaRef = useRef<HTMLDivElement>(null);
  const isCtaVisible = useOnScreen(ctaRef, "-100px");

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

      {/* Suppliers Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Nossos Parceiros</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Contamos com um grande número de distribuidores cadastrados que utilizam o site para expandir seus negócios e alcançar novos clientes em todo o território nacional.
            </p>
        </div>

        <div 
          ref={gridRef}
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 transition-all duration-1000 ${isGridVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {suppliers.map((supplier, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 flex items-center justify-center aspect-square border border-gray-100 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              <img src={supplier.logo} alt={supplier.name} className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300" />
            </div>
          ))}
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