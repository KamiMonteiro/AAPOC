import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-branco.svg";

const links = [
  { label: "Início", href: "#inicio" },
  { label: "Calendário", href: "#calendario" },
  { label: "Serviços", href: "#servicos" },
  { label: "Nossa História", href: "#historia" },
  { label: "Projetos", href: "#projetos" },
  { label: "Galeria", href: "#galeria" },
  { label: "Como Ajudar", href: "#ajudar" },
  { label: "Contato", href: "#contato" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary via-secondary to-hope backdrop-blur-md shadow-lg font-nav">
      <div className="container mx-auto flex items-center justify-between px-4">
        <a href="#inicio" className="flex items-center gap-3">
          <img src={logo} alt="AAPOC logo" className="h-[80px] w-[200px] rounded-2xl p-1 object-contain" />
          {/* <span className="text-2xl md:text-3xl font-extrabold tracking-wide text-white drop-shadow-sm">
            AAPOC
          </span> */}
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-sm font-semibold text-white/90 hover:text-white transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-gradient-to-r from-primary via-secondary to-hope border-t border-white/20">
          <ul className="flex flex-col py-4 px-6 gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block text-base font-semibold text-white/95 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
