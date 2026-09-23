import React from "react";

type Product = {
  src: string;
  alt: string;
};

const products: Product[] = [
  { src: "/img/Produtos.jpeg", alt: "Produtos AAPOC" },
  { src: "/img/produtos_2.jpeg", alt: "Produtos AAPOC" },
  { src: "/img/produtos_3.jpeg", alt: "Produtos AAPOC" },
];

const ProductsSection = () => {
  return (
    <section id="produtos" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Cabeçalho no modelo da galeria */}
        <div className="text-center mb-12">
          <span className="text-sm font-bold text-secondary uppercase tracking-widest">
            Produtos
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mt-2">
            Nossos Produtos
          </h2>
        </div>

        {/* Container das imagens centralizado */}
        <div className="flex flex-wrap justify-center gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="w-[280px] sm:w-[350px] md:w-[400px] overflow-hidden rounded-[2rem] shadow-sm hover:shadow-xl transition-transform duration-300 hover:-translate-y-2 bg-white"
            >
              <img
                src={product.src}
                alt={product.alt}
                className="h-[300px] w-full object-cover"
                loading="lazy"
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;