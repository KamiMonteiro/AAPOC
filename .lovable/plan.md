## Novo visual da Navbar

**Mudanças em `src/components/Navbar.tsx`:**

1. **Remover** o texto "Cuiabá - MT" ao lado do logo.
2. **Fundo:** gradiente vibrante usando as cores da AAPOC (rosa → laranja → azul), com leve blur ao rolar.
3. **Logo "AAPOC":** em branco, com peso bold e leve sombra para destacar sobre o gradiente.
4. **Links do menu:** fonte Montserrat (sans arredondada e moderna), em branco com opacidade 90%, hover com underline animado e leve aumento de brilho.
5. **Botão de menu mobile:** ícone branco, em destaque sobre o gradiente.
6. **Menu mobile aberto:** mantém o mesmo gradiente para consistência visual.

**Detalhes técnicos:**
- Importar a fonte **Montserrat** no `index.html` (Google Fonts).
- Adicionar `font-nav` no `tailwind.config.ts` apontando para Montserrat, para isolar a fonte da navbar das demais (Playfair/Nunito ficam intactas no resto do site).
- Gradiente aplicado via classe Tailwind: `bg-gradient-to-r from-primary via-secondary to-hope` (tokens já existentes no design system).
- Borda inferior trocada por sombra sutil para um look mais "flutuante".

Nenhum outro componente é afetado — só a navbar.