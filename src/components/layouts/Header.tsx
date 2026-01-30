import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserCircle, faCog, faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function IconButton({ icon }: { icon: any }) {
  return (
    <button className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-gray-100">
      <FontAwesomeIcon icon={icon} className="h-4 w-4" />
    </button>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-10 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left side: Breadcrumbs (Static for now) */}
        <div>
          <nav className="text-sm text-gray-500 mb-1">
            <ol className="list-reset flex">
              <li><span className="text-gray-400">Páginas</span></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-gray-800 font-medium">Dashboard</li>
            </ol>
          </nav>
          <h6 className="font-bold text-gray-800">Dashboard</h6>
        </div>

        {/* Right side: Controls */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Type here..." 
              className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all"
            />
          </div>
          
          <Link to="/login" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold text-sm">
            <FontAwesomeIcon icon={faUserCircle} className="h-4 w-4" />
            <span className="hidden sm:inline">Sign In</span>
          </Link>
          
          <IconButton icon={faCog} />
          <IconButton icon={faBell} />
        </div>
      </div>
    </header>
  );
}
