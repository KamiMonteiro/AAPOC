import React, { useState, useRef } from "react";

type GalleryPhoto = {
  src: string;
  alt: string;
  href?: string; // Mantido caso queira colocar link do Instagram em alguma foto
};

const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/img/momentos_.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_2.jpeg",
    alt: "Foto de eventos da instituição",
  },
 
  {
    src: "/img/momentos_44.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_4.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_5.jpeg",
    alt: "Foto de eventos da instituição",
  },
   {
    src: "/img/momentos_46.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_1.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos.jpeg",
    alt:"Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_3.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_6.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_7.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_8.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_9.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_10.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_11.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_12.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_13.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_14.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_15.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_16.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_17.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_18.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_19.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_20.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_21.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_22.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_23.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_24.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_25.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_26.jpeg",
    alt: "Foto de eventos da instituição",
  },

  {
    src: "/img/momentos_27.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_28.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_29.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_30.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_31.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_32.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_33.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_34.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_35.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_36.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_37.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_38.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_39.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_40.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_41.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_42.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_43.jpeg",
    alt: "Foto de eventos da instituição",
  },
  {
    src: "/img/momentos_45.jpeg",
    alt: "Foto de eventos da instituição",
  },
   {
    src: "/img/momentos_47.jpeg",
    alt: "Foto de eventos da instituição",
  },
   {
    src: "/img/momentos_48.jpeg",
    alt: "Foto de eventos da instituição",
  },
   {
    src: "/img/momentos_49.jpeg",
    alt: "Foto de eventos da instituição",
  },

];

const GallerySection = () => {
  // Controle do Carrossel
  const carouselRef = useRef<HTMLDivElement>(null);

  // Controle do Modal
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const prevModalImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev === null || prev === 0 ? galleryPhotos.length - 1 : prev - 1
    );
  };

  const nextModalImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev === null || prev === galleryPhotos.length - 1 ? 0 : prev + 1
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
            {galleryPhotos.map((photo, index) => {
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
      {selectedIndex !== null && (
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
              src={galleryPhotos[selectedIndex].src}
              alt={galleryPhotos[selectedIndex].alt}
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