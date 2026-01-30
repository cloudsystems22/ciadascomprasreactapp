import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUserCircle, 
  faKey, 
  faChartPie, 
  faUser 
} from "@fortawesome/free-solid-svg-icons";
import LoginDropdown from "./LoginDropdown";

export default function PublicHeader() {
  // const { user, logout } = useAuth();

  return (
    <div className="absolute top-0 z-30 w-full py-4">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/40">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 font-bold text-gray-800 text-sm">
            Soft UI Dashboard
          </Link>

          {/* MENU */}
          <div className="hidden md:flex gap-6 text-gray-600 text-xs font-bold uppercase">
            <Link className="hover:text-gray-900 transition flex items-center gap-1" to="/dashboard">
              <span className="opacity-60"><FontAwesomeIcon icon={faChartPie} /></span> Dashboard
            </Link>
            <Link className="hover:text-gray-900 transition flex items-center gap-1" to="/profile">
              <span className="opacity-60"><FontAwesomeIcon icon={faUser} /></span> Profile
            </Link>
            <Link className="hover:text-gray-900 transition flex items-center gap-1" to="/cadastro">
              <span className="opacity-60"><FontAwesomeIcon icon={faUserCircle} /></span> Sign Up
            </Link>
            <Link className="hover:text-gray-900 transition flex items-center gap-1" to="/login">
              <span className="opacity-60"><FontAwesomeIcon icon={faKey} /></span> Sign In
            </Link>
          </div>

          {/* ACTION */}
          <div>
             <button className="bg-gradient-to-tl from-blue-600 to-cyan-400 text-white text-xs font-bold px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 uppercase">
                Free Download
             </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
