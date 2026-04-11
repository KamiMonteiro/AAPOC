import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Início", href: "#inicio" },
  { label: "Calendário", href: "#calendario" },
  { label: "Serviços", href: "#servicos" },
  { label: "Nossa História", href: "#historia" },
  { label: "Como Ajudar", href: "#ajudar" },
  { label: "Contato", href: "#contato" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <a href="#inicio" className="flex items-center gap-2">
          <span className="text-2xl font-display font-bold text-primary">AAPOC</span>
          <span className="text-sm text-muted-foreground font-body hidden sm:block">Cuiabá - MT</span>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-b border-border">
          <ul className="flex flex-col py-4 px-6 gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block text-base font-semibold text-foreground/80 hover:text-primary"
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
