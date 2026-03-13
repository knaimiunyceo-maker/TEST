import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { 
  Menu, X, ChevronDown, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { 
    label: "Experiences", 
    href: "/experiences",
    submenu: [
      { label: "Self-Defense", href: "/experiences/self-defense" },
      { label: "Language Practice", href: "/experiences/language-practice" },
      { label: "Visual Storytelling", href: "/experiences/visual-storytelling" }
    ]
  },
  { 
    label: "Destinations", 
    href: "/destinations",
    submenu: [
      { label: "Casablanca", href: "/destinations/casablanca" },
      { label: "Marrakech", href: "/destinations/marrakech" },
      { label: "Agadir", href: "/destinations/agadir" }
    ]
  },
  { label: "Activities", href: "/activities" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "About", href: "/about" }
];

const PageLayout = ({ children, showBackButton = true }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const location = useLocation();

  const toggleSubmenu = (label) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <div className="min-h-screen bg-warmwhite">
      {/* Navigation */}
      <header className="bg-ocean text-white py-4 px-4 sm:px-6 lg:px-12 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-syne font-bold text-xl text-white hover:text-sand transition-colors">
            THE BRIDGE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative group">
                {item.submenu ? (
                  <>
                    <Link 
                      to={item.href}
                      className={`font-dm text-sm flex items-center gap-1 py-2 transition-colors ${
                        location.pathname.startsWith(item.href) ? "text-sand" : "text-white hover:text-sand"
                      }`}
                    >
                      {item.label}
                      <ChevronDown size={14} />
                    </Link>
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="bg-white rounded-lg shadow-xl py-2 min-w-[200px]">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            className="block px-4 py-2 font-dm text-sm text-ocean hover:bg-sand/20 transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link 
                    to={item.href}
                    className={`font-dm text-sm py-2 transition-colors ${
                      location.pathname === item.href ? "text-sand" : "text-white hover:text-sand"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Button asChild className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-6 font-dm text-sm">
              <Link to="/book">Book Now</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
          <nav className="mt-4 pb-4 border-t border-white/20 pt-4">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className="w-full flex items-center justify-between py-3 font-dm text-white"
                    >
                      {item.label}
                      <ChevronDown size={16} className={`transition-transform duration-200 ${openSubmenu === item.label ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-200 ${openSubmenu === item.label ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="pl-4 pb-2">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            className="block py-2 font-dm text-sm text-white/80 hover:text-sand transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className="block py-3 font-dm text-white hover:text-sand transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Button asChild className="w-full mt-4 bg-sunset hover:bg-sunset/90 text-white rounded-full transition-transform active:scale-95">
              <Link to="/book" onClick={() => setMobileMenuOpen(false)}>Réserver</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-ocean py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-syne font-bold text-white mb-4">THE BRIDGE</h3>
              <p className="font-dm text-white/60 text-sm">Travel • Practice • Experience</p>
            </div>
            <div>
              <h4 className="font-dm font-semibold text-white mb-3 text-sm">Experiences</h4>
              <ul className="space-y-2">
                <li><Link to="/experiences/self-defense" className="font-dm text-white/60 text-sm hover:text-sand">Self-Defense</Link></li>
                <li><Link to="/experiences/language-practice" className="font-dm text-white/60 text-sm hover:text-sand">Language Practice</Link></li>
                <li><Link to="/experiences/visual-storytelling" className="font-dm text-white/60 text-sm hover:text-sand">Visual Storytelling</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-dm font-semibold text-white mb-3 text-sm">Destinations</h4>
              <ul className="space-y-2">
                <li><Link to="/destinations/casablanca" className="font-dm text-white/60 text-sm hover:text-sand">Casablanca</Link></li>
                <li><Link to="/destinations/marrakech" className="font-dm text-white/60 text-sm hover:text-sand">Marrakech</Link></li>
                <li><Link to="/destinations/agadir" className="font-dm text-white/60 text-sm hover:text-sand">Agadir</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-dm font-semibold text-white mb-3 text-sm">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="font-dm text-white/60 text-sm hover:text-sand">About</Link></li>
                <li><Link to="/how-it-works" className="font-dm text-white/60 text-sm hover:text-sand">How it Works</Link></li>
                <li><Link to="/activities" className="font-dm text-white/60 text-sm hover:text-sand">Activities</Link></li>
                <li><Link to="/cgv" className="font-dm text-white/60 text-sm hover:text-sand">CGV</Link></li>
                <li><Link to="/mentions-legales" className="font-dm text-white/60 text-sm hover:text-sand">Mentions légales</Link></li>
                <li><Link to="/confidentialite" className="font-dm text-white/60 text-sm hover:text-sand">Confidentialité</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-6 text-center">
            <p className="font-dm text-white/60 text-xs">
              © {new Date().getFullYear()} THE BRIDGE — UNYCEO France. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
