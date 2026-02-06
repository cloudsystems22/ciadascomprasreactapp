import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        type="button"
        onClick={scrollToTop}
        className={`
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
          bg-gradient-to-tl from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500
          text-white rounded-full shadow-lg shadow-blue-500/30
          transition-all duration-500 ease-in-out transform hover:scale-110
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
          flex items-center justify-center w-12 h-12
        `}
        aria-label="Voltar ao topo"
      >
        <FontAwesomeIcon icon={faArrowUp} className="h-5 w-5" />
      </button>
    </div>
  );
}