// src/constants.ts

export type Language = "pt" | "en" | "es";

export const UI_STRINGS = {
  pt: {
    about: "Sobre",
    services: "Serviços",
    reviews: "Avaliações",
    location: "Localização",
    bookNow: "Agendar Agora",
    bookTreatment: "Agendar Tratamento",
    viewServices: "Ver Serviços",
    ourEssence: "A nossa essência",
    luxuryMeetsRelaxation: "Onde o luxo encontra o relaxamento",
    ourServices: "Nossos Serviços",
    servicesSubtitle: "Tratamentos exclusivos pensados para realçar a sua beleza natural com os melhores produtos do mercado.",
    duration: "Duração",
    price: "Preço",
    viewFullMenu: "Ver Menu Completo",
    realExperiences: "Experiências Reais",
    whatClientsSay: "O que dizem nossas clientes",
    visitUs: "Visite-nos",
    openingHours: "Horário de Funcionamento",
    seeOnGoogleMaps: "Ver no Google Maps",
    followUs: "Siga-nos",
    quickLinks: "Links Rápidos",
    privacy: "Privacidade",
    terms: "Termos",
    allRightsReserved: "Todos os direitos reservados.",
    tagline: "O seu refúgio de beleza no coração de Lisboa.",
    footerDescription: "O seu refúgio de beleza no coração de Lisboa. Especialistas em cuidados de unhas de luxo e experiências de bem-estar.",
    scroll: "Scroll",
    closed: "Fechado"
  },
  en: {
    about: "About",
    services: "Services",
    reviews: "Reviews",
    location: "Location",
    bookNow: "Book Now",
    bookTreatment: "Book Treatment",
    viewServices: "View Services",
    ourEssence: "Our Essence",
    luxuryMeetsRelaxation: "Where luxury meets relaxation",
    ourServices: "Our Services",
    servicesSubtitle: "Exclusive treatments designed to enhance your natural beauty with the best products on the market.",
    duration: "Duration",
    price: "Price",
    viewFullMenu: "View Full Menu",
    realExperiences: "Real Experiences",
    whatClientsSay: "What our clients say",
    visitUs: "Visit Us",
    openingHours: "Opening Hours",
    seeOnGoogleMaps: "See on Google Maps",
    followUs: "Follow Us",
    quickLinks: "Quick Links",
    privacy: "Privacy",
    terms: "Terms",
    allRightsReserved: "All rights reserved.",
    tagline: "Your beauty sanctuary in the heart of Lisbon.",
    footerDescription: "Your beauty sanctuary in the heart of Lisbon. Specialists in luxury nail care and wellness experiences.",
    scroll: "Scroll",
    closed: "Closed"
  },
  es: {
    about: "Sobre",
    services: "Servicios",
    reviews: "Reseñas",
    location: "Ubicación",
    bookNow: "Reservar Ahora",
    bookTreatment: "Reservar Tratamiento",
    viewServices: "Ver Servicios",
    ourEssence: "Nuestra esencia",
    luxuryMeetsRelaxation: "Donde el lujo se encuentra con la relajación",
    ourServices: "Nuestros Servicios",
    servicesSubtitle: "Tratamientos exclusivos diseñados para realzar tu belleza natural con los mejores productos del mercado.",
    duration: "Duración",
    price: "Precio",
    viewFullMenu: "Ver Menú Completo",
    realExperiences: "Experiencias Reales",
    whatClientsSay: "Lo que dicen nuestras clientes",
    visitUs: "Visítanos",
    openingHours: "Horario de Funcionamiento",
    seeOnGoogleMaps: "Ver en Google Maps",
    followUs: "Síguenos",
    quickLinks: "Enlaces Rápidos",
    privacy: "Privacidad",
    terms: "Términos",
    allRightsReserved: "Todos los derechos reservados.",
    tagline: "Tu santuario de belleza en el corazón de Lisboa.",
    footerDescription: "Tu santuario de belleza en el corazón de Lisboa. Especialistas en el cuidado de uñas de lujo y experiencias de bienestar.",
    scroll: "Scroll",
    closed: "Cerrado"
  }
};

export const SALON_DATA = {
  name: "Bless Nails Lisbon",
  tagline: {
    pt: "O seu destino de eleição para tratamentos de unhas de luxo no centro de Lisboa.",
    en: "Your premier destination for luxury nail treatments in the center of Lisbon.",
    es: "Tu destino preferido para tratamientos de uñas de lujo en el centro de Lisboa."
  },
  description: {
    pt: "Entre na Bless Nails, o seu destino de eleição para tratamentos de unhas de luxo no centro de Lisboa. Desfrute de um ambiente sereno e sofisticado onde os nossos técnicos especializados proporcionam manicures, pedicures e nail art personalizada impecáveis. Utilizando apenas os melhores produtos, garantimos uma experiência de mimo que a deixa rejuvenescida e glamorosa.",
    en: "Step into Bless Nails, your premier destination for luxury nail treatments in the center of Lisbon. Indulge in a serene and sophisticated environment where our expert technicians provide impeccable manicures, pedicures, and bespoke nail art. Using only the finest products, we ensure a pampering experience that leaves you feeling rejuvenated and glamorous.",
    es: "Entra en Bless Nails, tu destino preferido para tratamientos de uñas de lujo en el centro de Lisboa. Disfruta de un ambiente sereno y sofisticado donde nuestros técnicos expertos ofrecen manicuras, pedicuras y nail art personalizado impecables. Utilizando solo los mejores productos, garantizamos una experiencia de mimo que te dejará rejuvenecida y glamurosa."
  },
  address: "Rua de O Século 154, 154, Príncipe Real, Lisboa",
  googleMapsUrl: "https://maps.google.com/?daddr=Rua%20de%20O%20S%C3%A9culo%20154%2C%20154%2C%20Lisboa%2C%201200-437",
  bookingUrl: "https://www.fresha.com/pt/a/bless-nails-lisbon-lisboa-rua-de-o-seculo-154-xcgfypxc/all-offer?venue=true",
  
  // AQUI ESTÁ A NOVA PROPRIEDADE PARA O EASTER EGG (MAPA)
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.123456789!2d-9.148!3d38.716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19337f7f7f7f7f%3A0x7f7f7f7f7f7f7f7f!2sRua%20de%20O%20S%C3%A9culo%20154%2C%201200-437%20Lisboa!5e0!3m2!1spt!2spt!4v1234567890",
  
  
  services:[
    {
  "name": "Bless Nails Lisbon",
  "tagline": {
    "pt": "O seu destino de eleição para tratamentos de unhas de luxo no centro de Lisboa.",
    "en": "Your premier destination for luxury nail treatments in the center of Lisbon.",
    "es": "Tu destino preferido para tratamientos de uñas de lujo en el centro de Lisboa."
  },
  "description": {
    "pt": "Entre na Bless Nails, o seu destino de eleição para tratamentos de unhas de luxo no centro de Lisboa. Desfrute de um ambiente sereno e sofisticado onde os nossos técnicos especializados proporcionam manicures, pedicures e nail art personalizada impecáveis. Utilizando apenas os melhores produtos, garantimos uma experiência de mimo que a deixa rejuvenescida e glamorosa.",
    "en": "Step into Bless Nails, your premier destination for luxury nail treatments in the center of Lisbon. Indulge in a serene and sophisticated environment where our expert technicians provide impeccable manicures, pedicures, and bespoke nail art. Using only the finest products, we ensure a pampering experience that leaves you feeling rejuvenated and glamorous.",
    "es": "Entra en Bless Nails, tu destino preferido para tratamientos de uñas de lujo en el centro de Lisboa. Disfruta de un ambiente sereno y sofisticado donde nuestros técnicos expertos ofrecen manicuras, pedicuras y nail art personalizado impecables. Utilizando solo los mejores productos, garantizamos una experiencia de mimo que te dejará rejuvenecida y glamurosa."
  },
  "address": "Rua de O Século 154, 154, Príncipe Real, Lisboa",
  "googleMapsUrl": "https://maps.google.com/?daddr=Rua%20de%20O%20S%C3%A9culo%20154%2C%20154%2C%20Lisboa%2C%201200-437",
  "bookingUrl": "https://www.fresha.com/pt/a/bless-nails-lisbon-lisboa-rua-de-o-seculo-154-xcgfypxc/all-offer?venue=true",
  "mapEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.123456789!2d-9.148!3d38.716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19337f7f7f7f7f%3A0x7f7f7f7f7f7f7f7f!2sRua%20de%20O%20S%C3%A9culo%20154%2C%201200-437%20Lisboa!5e0!3m2!1spt!2spt!4v1234567890",
  "services": [
    {
      "name": {
        "pt": "Manicure Verniz Gel | Gel Polish",
        "en": "Gel Polish Manicure",
        "es": "Manicura Esmalte Gel"
      },
      "price": "25",
      "duration": "1h",
      "description": {
        "pt": "Verniz gel de longa duração com acabamento impecável.",
        "en": "Long-lasting gel polish with an impeccable finish.",
        "es": "Esmalte en gel de larga duración con un acabado impecable."
      }
    },
    {
      "name": {
        "pt": "Manicure Clássica | The Manicure Classic",
        "en": "Classic Manicure",
        "es": "Manicura Clásica"
      },
      "price": "15",
      "duration": "1h",
      "description": {
        "pt": "Tratamento tradicional para mãos elegantes e cuidadas.",
        "en": "Traditional treatment for elegant and well-cared hands.",
        "es": "Tratamiento tradicional para manos elegantes y cuidadas."
      }
    },
    {
      "name": {
        "pt": "Pedicure Verniz Gel | Shellac Pedicure",
        "en": "Gel Polish Pedicure",
        "es": "Pedicura Esmalte Gel"
      },
      "price": "35",
      "duration": "1h",
      "description": {
        "pt": "Cuidado completo para pés com verniz gel duradouro.",
        "en": "Complete foot care with long-lasting gel polish.",
        "es": "Cuidado completo de pies con esmalte en gel duradero."
      }
    },
    {
      "name": {
        "pt": "Pedicure Clássico | Classic Pedicure",
        "en": "Classic Pedicure",
        "es": "Pedicura Clásica"
      },
      "price": "25",
      "duration": "1h",
      "description": {
        "pt": "O essencial para pés relaxados e unhas perfeitas.",
        "en": "The essential for relaxed feet and perfect nails.",
        "es": "Lo esencial para pies relajados y uñas perfectas."
      }
    },
    {
      "name": {
        "pt": "Serviço de Teste",
        "en": "",
        "es": ""
      },
      "price": "18",
      "duration": "1h",
      "description": {
        "pt": "Serviço de teste",
        "en": "",
        "es": ""
      }
    }
  ],
  "hours": [
    {
      "day": {
        "pt": "Segunda-feira",
        "en": "Monday",
        "es": "Lunes"
      },
      "time": "10:00 - 19:00"
    },
    {
      "day": {
        "pt": "Terça-feira",
        "en": "Tuesday",
        "es": "Martes"
      },
      "time": "10:00 - 19:00"
    },
    {
      "day": {
        "pt": "Quarta-feira",
        "en": "Wednesday",
        "es": "Miércoles"
      },
      "time": "10:00 - 19:00"
    },
    {
      "day": {
        "pt": "Quinta-feira",
        "en": "Thursday",
        "es": "Jueves"
      },
      "time": "10:00 - 19:00"
    },
    {
      "day": {
        "pt": "Sexta-feira",
        "en": "Friday",
        "es": "Viernes"
      },
      "time": "10:00 - 19:00"
    },
    {
      "day": {
        "pt": "Sábado",
        "en": "Saturday",
        "es": "Sábado"
      },
      "time": "10:00 - 19:00"
    },
    {
      "day": {
        "pt": "Domingo",
        "en": "Sunday",
        "es": "Domingo"
      },
      "time": "Fechado"
    }
  ],
  "features": {
    "pt": [
      "Produtos Veganos",
      "Pet Friendly",
      "Adequado para Crianças",
      "Acessível",
      "Empreendedorismo Feminino",
      "LGBTQ+ Friendly"
    ],
    "en": [
      "Vegan Products",
      "Pet Friendly",
      "Kid Friendly",
      "Accessible",
      "Female Entrepreneurship",
      "LGBTQ+ Friendly"
    ],
    "es": [
      "Productos Veganos",
      "Pet Friendly",
      "Apto para Niños",
      "Accesible",
      "Emprendimiento Femenino",
      "LGBTQ+ Friendly"
    ]
  },
  "reviews": [
    {
      "author": "Raquel B",
      "text": {
        "pt": "Maravilhoso, como sempre",
        "en": "Wonderful, as ever",
        "es": "Maravilloso, como siempre"
      },
      "rating": 5
    },
    {
      "author": "Olann",
      "text": {
        "pt": "Absolutamente amei este salão. O serviço foi impecável, a atenção aos detalhes excepcional.",
        "en": "Absolutely loved this salon. The service was impeccable, the attention to detail outstanding.",
        "es": "Absolutamente me encantó este salón. El servicio fue impecable, la atención al detalle excepcional."
      },
      "rating": 5
    },
    {
      "author": "Isabella L",
      "text": {
        "pt": "O atendimento é ótimo, a Stefanie é super delicada e detalhista. As unhas ficaram incríveis!",
        "en": "The service is great, Stefanie is super delicate and detailed. The nails looked incredible!",
        "es": "¡La atención es excelente, Stefanie es súper delicada y detallista. ¡Las uñas quedaron increíbles!"
      },
      "rating": 5
    }
  ]
}
    
  ],
  
  hours:[
    { day: { pt: "Segunda-feira", en: "Monday", es: "Lunes" }, time: "10:00 - 19:00" },
    { day: { pt: "Terça-feira", en: "Tuesday", es: "Martes" }, time: "10:00 - 19:00" },
    { day: { pt: "Quarta-feira", en: "Wednesday", es: "Miércoles" }, time: "10:00 - 19:00" },
    { day: { pt: "Quinta-feira", en: "Thursday", es: "Jueves" }, time: "10:00 - 19:00" },
    { day: { pt: "Sexta-feira", en: "Friday", es: "Viernes" }, time: "10:00 - 19:00" },
    { day: { pt: "Sábado", en: "Saturday", es: "Sábado" }, time: "10:00 - 19:00" },
    { day: { pt: "Domingo", en: "Sunday", es: "Domingo" }, time: "Fechado" }
  ],
  features: {
    pt:["Produtos Veganos", "Pet Friendly", "Adequado para Crianças", "Acessível", "Empreendedorismo Feminino", "LGBTQ+ Friendly"],
    en:["Vegan Products", "Pet Friendly", "Kid Friendly", "Accessible", "Female Entrepreneurship", "LGBTQ+ Friendly"],
    es:["Productos Veganos", "Pet Friendly", "Apto para Niños", "Accesible", "Emprendimiento Femenino", "LGBTQ+ Friendly"]
  },
  reviews:[
    {
      author: "Raquel B",
      text: {
        pt: "Maravilhoso, como sempre",
        en: "Wonderful, as ever",
        es: "Maravilloso, como siempre"
      },
      rating: 5
    },
    {
      author: "Olann",
      text: {
        pt: "Absolutamente amei este salão. O serviço foi impecável, a atenção aos detalhes excepcional.",
        en: "Absolutely loved this salon. The service was impeccable, the attention to detail outstanding.",
        es: "Absolutamente me encantó este salón. El servicio fue impecable, la atención al detalle excepcional."
      },
      rating: 5
    },
    {
      author: "Isabella L",
      text: {
        pt: "O atendimento é ótimo, a Stefanie é super delicada e detalhista. As unhas ficaram incríveis!",
        en: "The service is great, Stefanie is super delicate and detailed. The nails looked incredible!",
        es: "¡La atención es excelente, Stefanie es súper delicada y detallista. ¡Las uñas quedaron increíbles!"
      },
      rating: 5
    }
  ]
};