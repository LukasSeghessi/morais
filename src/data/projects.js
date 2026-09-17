// TODO: essa lista vai vir do Supabase depois (tabela de projetos + fotos do Storage).
// Por enquanto, dados de exemplo pra montar o layout.
// Cada projeto tem um "id" -- e esse id que vai aparecer na URL, ex: /projetos/1

export const PROJECTS = [
  {
    id: "1",
    title: "Instalação Residencial",
    location: "São Paulo - SP",
    mainImage:
      "https://placehold.co/1000x500/0b2e4f/ffffff?text=Foto+Principal",
    description:
      "Sistema fotovoltaico instalado em telhado residencial, projetado para atender integralmente o consumo de energia da casa e gerar economia mensal na conta de luz.",
    power: "8,5 kWp",
    panels: "20 placas",
    gallery: [
      "https://placehold.co/400x300/0b2e4f/ffffff?text=Foto+1",
      "https://placehold.co/400x300/f5a623/0b2e4f?text=Foto+2",
      "https://placehold.co/400x300/0b2e4f/ffffff?text=Foto+3",
    ],
  },
  {
    id: "2",
    title: "Instalação Comercial",
    location: "Campinas - SP",
    mainImage:
      "https://placehold.co/1000x500/f5a623/0b2e4f?text=Foto+Principal",
    description:
      "Projeto elétrico e solar completo para galpão comercial de 200m², reduzindo significativamente os custos operacionais com energia.",
    power: "25 kWp",
    panels: "55 placas",
    gallery: [
      "https://placehold.co/400x300/0b2e4f/ffffff?text=Foto+1",
      "https://placehold.co/400x300/f5a623/0b2e4f?text=Foto+2",
      "https://placehold.co/400x300/0b2e4f/ffffff?text=Foto+3",
    ],
  },
  {
    id: "3",
    title: "Instalação Rural",
    location: "Interior de São Paulo",
    mainImage:
      "https://placehold.co/1000x500/0b2e4f/ffffff?text=Foto+Principal",
    description:
      "Instalação de painéis solares no telhado de uma igreja, aproveitando a grande área disponível para maximizar a geração de energia.",
    power: "40 kWp",
    panels: "90 placas",
    gallery: [
      "https://placehold.co/400x300/0b2e4f/ffffff?text=Foto+1",
      "https://placehold.co/400x300/f5a623/0b2e4f?text=Foto+2",
      "https://placehold.co/400x300/0b2e4f/ffffff?text=Foto+3",
    ],
  },
];