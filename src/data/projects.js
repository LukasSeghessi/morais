// TODO: essa lista vai vir do Supabase depois (tabela de projetos + fotos do Storage).
// Por enquanto, dados de exemplo pra montar o layout.
// Cada projeto tem um "id" -- e esse id que vai aparecer na URL, ex: /projetos/1

export const PROJECTS = [
  {
    id: "1",
    title: "Projeto 1",
    location: "São Paulo - SP",
    mainImage:
      "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/church-1.jpg",
    description:
      "Sistema fotovoltaico instalado em telhado residencial, projetado para atender integralmente o consumo de energia da casa e gerar economia mensal na conta de luz.",
    power: "8,5 kWp",
    panels: "20 placas",
    
  },
  {
    id: "2",
    title: "Projeto 2",
    location: "Campinas - SP",
    mainImage:
      "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/come-1.jpg",
    description:
      "Projeto elétrico e solar completo para galpão comercial de 200m², reduzindo significativamente os custos operacionais com energia.",
    power: "25 kWp",
    panels: "55 placas",
    gallery: [
      "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/come-2.jpg",
      "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/come-3.jpg",
      
    ],
  },
  {
    id: "3",
    title: "Projeto 3",
    location: "Interior de São Paulo",
    mainImage:
      "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/rural-1.jpg",
      
    description:
      "Instalação de painéis solares no telhado de uma igreja, aproveitando a grande área disponível para maximizar a geração de energia.",
    power: "40 kWp",
    panels: "90 placas",
    gallery: [
      "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/rural-2.jpg",
      "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/rural-3.jpg",
      "https://emsikwkemdavawyfzvdi.supabase.co/storage/v1/object/public/img/rural-4.jpg",
    ],
  },
];