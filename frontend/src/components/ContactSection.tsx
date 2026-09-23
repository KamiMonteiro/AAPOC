import { MapPin, Phone, Instagram } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contato" className="bg-foreground text-primary-foreground">
      <div className="mx-auto py-20">
        <div className="text-center mb-12">
          <span className="text-sm font-bold text-accent uppercase tracking-widest">Fale Conosco</span>
          <h2 className="text-3xl md:text-5xl font-display font-black mt-2">Contato</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-bold text-lg">Endereço</h3>
            <p className="text-sm text-primary-foreground/70 mt-2 leading-relaxed">
              Av. São Sebastião, 4160<br />Quilombo, Cuiabá - MT
            </p>
          </div>

          <div className="text-center">
            <a
              href="https://api.whatsapp.com/send/?phone=5565999162284&text&type=phone_number&app_absent=0&utm_source=ig"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="font-bold text-lg">WhatsApp</h3>
              <p className="text-sm text-primary-foreground/70 mt-2">
                65 99216-2284
              </p>
            </a>
          </div>

          <div className="text-center">
            <a
              href="https://www.instagram.com/aapoc.oficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="w-14 h-14 bg-hope rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Instagram className="w-6 h-6 text-hope-foreground" />
              </div>
              <h3 className="font-bold text-lg">Instagram</h3>
              <p className="text-sm text-primary-foreground/70 mt-2">@aapocmt</p>
            </a>
          </div>
        </div>
    <iframe
        title="Localização AAPOC"
        src="https://maps.google.com/maps?q=-15.5801703,-56.0960613&z=18&output=embed"
        width="100%"
        height="220"
        style={{ border: 0, display: "block", paddingTop: 10}}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
        {/* Footer */}
        <div className="mt-5 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} AAPOC MT — Associação de Apoio aos Pacientes Oncológicos de Cuiabá.
          </p>
          <p className="text-xs text-primary-foreground/30 mt-1">
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
