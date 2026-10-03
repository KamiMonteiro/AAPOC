import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { buscarFotosGaleria } from "@/lib/api";

type GalleryPhoto = {
  src: string;
  alt: string;
  href?: string; // Mantido caso queira colocar link do Instagram em alguma foto
};

// Fotos de fallback caso a API esteja temporariamente offline durante o desenvolvimento local
const fallbackPhotos: GalleryPhoto[] = [
  { src: "/img/momentos_1.jpeg", alt: "Ação de acolhimento AAPOC" },
  { src: "/img/momentos_2.jpeg", alt: "Ação de acolhimento AAPOC" },
  { src: "/img/momentos_3.jpeg", alt: "Ação de acolhimento AAPOC" },
  { src: "/img/momentos_4.jpeg", alt: "Ação de acolhimento AAPOC" },
];

const GallerySection = () => {
  // Busca fotos cadastradas dinamicamente no backend Django (CMS da AAPOC)
  const { data: fotosApi = [], isLoading } = useQuery({
    queryKey: ["aapoc-galeria-fotos"],
    queryFn: buscarFotosGaleria,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  // Utiliza as fotos da API dinâmica; se a API ainda estiver carregando ou vazia, usa fallback mínimo
  const allPhotos: GalleryPhoto[] = React.useMemo(() => {
    if (fotosApi.length > 0) {
      return fotosApi.map((foto) => ({
        src: foto.imagem,
        alt: foto.titulo || "Foto de eventos da instituição",
        href: foto.link_instagram || undefined,
      }));
    }
    return fallbackPhotos;
  }, [fotosApi]);

  // Controle do Carrossel
  const carouselRef = useRef<HTMLDivElement>(null);

  // Controle do Modal
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const prevModalImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev === null || prev === 0 ? allPhotos.length - 1 : prev - 1
    );
  };

  const nextModalImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev === null || prev === allPhotos.length - 1 ? 0 : prev + 1
    );
  };

  // Funções para rolar o carrossel
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section id="galeria" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-bold text-secondary uppercase tracking-widest">
            Galeria
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mt-2">
            Momentos da AAPOC
          </h2>
        </div>

        {/* Container do Carrossel com Setas */}
        <div className="relative group">
          {/* Seta Esquerda do Carrossel */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center focus:outline-none"
            aria-label="Rolar para a esquerda"
          >
            &#10094;
          </button>

          {/* Área de rolagem horizontal (Carrossel) */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-6 scroll-smooth snap-x snap-mandatory py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {allPhotos.map((photo, index) => {
              const isExternalLink = !!photo.href;
              const Container = isExternalLink ? "a" : "div";

              return (
                <Container
                  key={index}
                  href={isExternalLink ? photo.href : undefined}
                  target={isExternalLink ? "_blank" : undefined}
                  rel={isExternalLink ? "noopener noreferrer" : undefined}
                  onClick={!isExternalLink ? () => openModal(index) : undefined}
                  // Define a largura de cada foto no carrossel
                  className={`relative flex-none w-[280px] sm:w-[350px] md:w-[400px] snap-center overflow-hidden rounded-[2rem] transition-transform duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl ${
                    !isExternalLink ? "cursor-pointer" : ""
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-[300px] w-full object-cover"
                    loading="lazy"
                    draggable="false"
                  />
                </Container>
              );
            })}
          </div>

          {/* Seta Direita do Carrossel */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center focus:outline-none"
            aria-label="Rolar para a direita"
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* Modal / Lightbox (Abre ao clicar na foto) */}
      {selectedIndex !== null && allPhotos[selectedIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <button
            className="absolute top-6 right-6 text-white text-5xl font-light hover:text-gray-400 transition-colors z-50 focus:outline-none"
            onClick={closeModal}
          >
            &times;
          </button>

          <button
            className="absolute left-4 md:left-10 text-white text-5xl hover:text-gray-400 transition-colors z-50 focus:outline-none"
            onClick={prevModalImage}
          >
            &#10094;
          </button>

          <div className="relative max-h-[85vh] max-w-5xl flex items-center justify-center">
            <img
              src={allPhotos[selectedIndex].src}
              alt={allPhotos[selectedIndex].alt}
              className="max-h-[85vh] w-auto object-contain rounded-lg shadow-2xl select-none"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>

          <button
            className="absolute right-4 md:right-10 text-white text-5xl hover:text-gray-400 transition-colors z-50 focus:outline-none"
            onClick={nextModalImage}
          >
            &#10095;
          </button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;