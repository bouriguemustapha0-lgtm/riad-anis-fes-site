import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en" | "es" | "ar";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "ar", label: "AR", flag: "🇲🇦" },
];

type Dict = {
  nav: { home: string; rooms: string; restaurant: string; amenities: string; location: string; contact: string };
  cta: { book: string; bookShort: string };
  hero: { badge: string; title: string; subtitle: string };
  welcome: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    highlights: string[];
  };
  rooms: {
    eyebrow: string;
    title: string;
    intro: string;
    list: { name: string; tagline: string; desc: string; features: string[] }[];
  };
  restaurant: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    badges: string[];
  };
  amenities: {
    eyebrow: string;
    title: string;
    groups: { title: string; items: string[] }[];
  };
  practical: {
    eyebrow: string;
    title: string;
    rows: [string, string][];
  };
  location: {
    eyebrow: string;
    title: string;
    intro: string;
    distances: [string, string][];
    osm: string;
  };
  reviews: { couples: string; breakfast: string; quote: string };
  finalCta: { title: string; subtitle: string };
  reservation: {
    eyebrow: string;
    title: string;
    subtitle: string;
    name: string;
    namePh: string;
    email: string;
    emailPh: string;
    phone: string;
    phonePh: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    guestsUnit: string;
    room: string;
    selectRoom: string;
    message: string;
    messagePh: string;
    submit: string;
    requiredHint: string;
  };
  footer: { address: string; license: string; nav: string; follow: string; cancel: string; rights: string };
  gallery: { eyebrow: string; title: string };
  wa: {
    greetingSimple: string;
    greetingHead: string;
    intent: string;
    labels: { name: string; email: string; phone: string; checkIn: string; checkOut: string; guests: string; room: string; message: string };
    thanks: string;
  };
};

const fr: Dict = {
  nav: { home: "Accueil", rooms: "Chambres", restaurant: "Restaurant", amenities: "Équipements", location: "Localisation", contact: "Contact" },
  cta: { book: "Réserver maintenant", bookShort: "Réserver maintenant →" },
  hero: {
    badge: "⭐ 9,1/10 — Les couples adorent cet endroit",
    title: "Un refuge d'un autre temps, au cœur de Fès",
    subtitle: "Entre patios ombragés, zelliges centenaires et silence retrouvé, le Riad Anis Fes vous accueille à deux pas de la médina et du Palais royal.",
  },
  welcome: {
    eyebrow: "Bienvenue",
    title: "L'âme de Fès,\nsans le bruit",
    p1: "Ici, on ne réserve pas une chambre. On s'offre une parenthèse. Le Riad Anis Fes se love dans les ruelles de Fès, à seulement 200 mètres de la Place Batha, 400 mètres de la Medersa Bouanania et 500 mètres de la porte emblématique de Bab Bou Jeloud. Le Palais royal veille à 1,8 km, la Karaouiyne — la plus vieille université du monde — n'est qu'à un kilomètre.",
    p2: "Dès l'arrivée, un service de concierge vous guide. Le salon commun invite à la lenteur, la terrasse au grand ciel de Fès, et le Wi-Fi gratuit vous relie au monde — seulement quand vous le souhaitez.",
    highlights: ["Navette aéroport", "Non-fumeurs", "Wi-Fi gratuit", "Parking à proximité", "2 restaurants", "Chambres familiales", "Terrasse", "Chauffage"],
  },
  rooms: {
    eyebrow: "Chambres",
    title: "Des chambres pensées comme des cocons",
    intro: "Chaque hébergement s'ouvre sur un patio et se ferme sur un sommeil profond. Salle de bains privative, linge choisi avec soin, climatisation discrète : le confort ici ne se voit pas, il se ressent.",
    list: [
      { name: "Chambre Double", tagline: "Pour deux, ou pour soi.", desc: "Une bulle intime avec vue sur le patio.", features: ["Salle de bains privative", "Douche", "Sèche-cheveux", "Articles de toilette gratuits", "Serviettes et linge de lit fournis", "Climatisation", "Chauffage", "TV écran plat"] },
      { name: "Chambre Triple", tagline: "L'équilibre parfait.", desc: "Pour un petit groupe d'amis ou une famille resserrée.", features: ["Tous les équipements de la Double", "Lit d'appoint sur demande (gratuit, selon disponibilité)"] },
      { name: "Chambre Quadruple", tagline: "Le riad s'ouvre plus grand.", desc: "Pour vous accueillir à quatre, sans compromis sur le confort.", features: ["Tous les équipements de la Double", "Espace familial généreux"] },
    ],
  },
  restaurant: {
    eyebrow: "Restaurant & petit-déjeuner",
    title: "La table,\navant tout",
    p1: "On ne visite pas Fès sans s'attabler. Nos 2 restaurants proposent une cuisine marocaine généreuse — tajines mijotés, pastillas, épices choisies — avec des options végétariennes, halal et casher pour que personne ne reste sur sa faim.",
    p2: "Le matin commence en douceur avec un petit-déjeuner plébiscité par nos clients (8,1/10) : buffet, à la carte ou continental, décliné en versions anglaise/irlandaise complète, végétarienne, végétalienne, halal, sans gluten, casher ou américaine. Un café coule déjà en cuisine, et les enfants ont leur propre menu.",
    badges: ["Buffet", "À la carte", "Continental", "Végétarien", "Végétalien", "Halal", "Sans gluten", "Casher", "Menus enfants"],
  },
  amenities: {
    eyebrow: "Équipements",
    title: "Tout ce qu'il faut,\nrien de superflu",
    groups: [
      { title: "Bien-être & détente", items: ["Terrasse", "Salon commun", "Parasols", "Climatisation", "Chauffage", "Salon de coiffure/institut de beauté"] },
      { title: "Activités (en supplément)", items: ["Location de vélos", "Cours de cuisine", "Visite culturelle locale", "Balades à pied"] },
      { title: "Services", items: ["Service de concierge", "Bagagerie", "Bureau d'excursions", "Service de change", "Blanchisserie", "Pressing", "Nettoyage à sec", "Enregistrement/départ privé"] },
      { title: "Sécurité", items: ["Sécurité 24h/24", "Caméras de surveillance", "Détecteurs de fumée et de monoxyde de carbone", "Extincteurs", "Clés d'accès"] },
      { title: "Pratique", items: ["Parking à proximité (2€/jour)", "Navette aéroport (en supplément)", "Animaux acceptés, sans supplément", "Supérette sur place"] },
      { title: "Langues parlées", items: ["🇲🇦 Arabe", "🇬🇧 Anglais", "🇪🇸 Espagnol", "🇫🇷 Français"] },
    ],
  },
  practical: {
    eyebrow: "Infos pratiques",
    title: "Bon à savoir avant de venir",
    rows: [
      ["Arrivée", "de 14h00 à 00h00 (merci de prévenir à l'avance)"],
      ["Départ", "de 01h00 à 12h00"],
      ["Enfants", "bienvenue à partir de 13 ans"],
      ["Lits d'appoint", "gratuits, sur demande et selon disponibilité — pas de lits bébé"],
      ["Heures de silence", "08h00 – 22h00"],
      ["Fumeurs", "établissement non-fumeurs"],
      ["Animaux", "bienvenus, sans supplément"],
      ["Groupes", "au-delà de 3 chambres, conditions particulières"],
      ["Paiement", "Visa, Mastercard, Amex, Diners, JCB, Maestro, Discover, UnionPay, espèces"],
      ["Annulation", "conditions variables selon le type d'hébergement"],
    ],
  },
  location: {
    eyebrow: "Localisation",
    title: "Au cœur de tout,\nloin du bruit",
    intro: "Le Palais royal de Fès à 1,8 km. La Place Batha à 200 mètres. La Medersa Bouanania à 400 mètres. Bab Bou Jeloud à 500 mètres. La Karaouiyne à 1 km. La gare de Fès à 3,5 km. L'aéroport de Fès-Saïss à 17 km.",
    distances: [
      ["Place Batha", "200 m"],
      ["Medersa Bouanania", "400 m"],
      ["Bab Bou Jeloud", "500 m"],
      ["Karaouiyne", "1 km"],
      ["Palais royal de Fès", "1,8 km"],
      ["Gare de Fès", "3,5 km"],
      ["Aéroport Fès-Saïss", "17 km"],
    ],
    osm: "Distances calculées avec © OpenStreetMap.",
  },
  reviews: {
    couples: "Note donnée par les couples pour un séjour à deux",
    breakfast: "Note du petit-déjeuner",
    quote: "« Le genre d'adresse qu'on garde pour soi... jusqu'à ce qu'on ait envie d'en parler. »",
  },
  finalCta: {
    title: "Le prochain chapitre de votre séjour à Fès commence ici",
    subtitle: "Places limitées selon la saison — réservez dès maintenant sur WhatsApp.",
  },
  footer: {
    address: "Médina de Fès, Maroc",
    license: "Licence n° 00000XX0000",
    nav: "Navigation",
    follow: "Suivez-nous",
    cancel: "Politique d'annulation et de prépaiement variable selon l'hébergement choisi.",
    rights: "Tous droits réservés.",
  },
  gallery: { eyebrow: "Galerie", title: "Un aperçu, avant l'arrivée" },
  reservation: {
    eyebrow: "Réservation",
    title: "Réservez votre séjour",
    subtitle: "Remplissez ce court formulaire, nous vous répondons directement sur WhatsApp.",
    name: "Nom complet",
    namePh: "Votre nom",
    email: "Email",
    emailPh: "vous@exemple.com",
    phone: "Téléphone",
    phonePh: "+212 …",
    checkIn: "Arrivée",
    checkOut: "Départ",
    guests: "Voyageurs",
    guestsUnit: " pers.",
    room: "Chambre souhaitée",
    selectRoom: "Choisir une chambre",
    message: "Message (optionnel)",
    messagePh: "Une demande particulière ?",
    submit: "Réserver sur WhatsApp",
    requiredHint: "Le nom complet est requis.",
  },
  wa: {
    greetingSimple: "Bonjour Riad Anis Fes, je souhaite vérifier les disponibilités pour un séjour.",
    greetingHead: "Bonjour Riad Anis Fes,",
    intent: "Je souhaite vérifier les disponibilités pour un séjour :",
    labels: { name: "Nom", email: "Email", phone: "Téléphone", checkIn: "Arrivée", checkOut: "Départ", guests: "Voyageurs", room: "Chambre souhaitée", message: "Message" },
    thanks: "Merci !",
  },
};

const en: Dict = {
  nav: { home: "Home", rooms: "Rooms", restaurant: "Restaurant", amenities: "Amenities", location: "Location", contact: "Contact" },
  cta: { book: "Book now", bookShort: "Book now →" },
  hero: {
    badge: "⭐ 9.1/10 — Couples love this place",
    title: "A timeless retreat in the heart of Fès",
    subtitle: "Between shaded patios, century-old zelliges and rediscovered silence, Riad Anis Fes welcomes you a stone's throw from the medina and the Royal Palace.",
  },
  welcome: {
    eyebrow: "Welcome",
    title: "The soul of Fès,\nwithout the noise",
    p1: "Here, you don't book a room. You give yourself a parenthesis. Riad Anis Fes nestles in the alleys of Fès, just 200 metres from Place Batha, 400 metres from Medersa Bouanania and 500 metres from the iconic Bab Bou Jeloud gate. The Royal Palace watches over at 1.8 km, and the Karaouiyne — the world's oldest university — is only a kilometre away.",
    p2: "From arrival, a concierge service guides you. The common lounge invites you to slow down, the terrace opens onto the great sky of Fès, and free Wi-Fi keeps you connected — only when you want it.",
    highlights: ["Airport shuttle", "Non-smoking", "Free Wi-Fi", "Nearby parking", "2 restaurants", "Family rooms", "Terrace", "Heating"],
  },
  rooms: {
    eyebrow: "Rooms",
    title: "Rooms designed as cocoons",
    intro: "Each room opens onto a patio and closes onto deep sleep. Private bathroom, carefully chosen linens, discreet air conditioning: comfort here isn't seen, it's felt.",
    list: [
      { name: "Double Room", tagline: "For two, or for yourself.", desc: "An intimate bubble with a view of the patio.", features: ["Private bathroom", "Shower", "Hairdryer", "Free toiletries", "Towels and bed linen provided", "Air conditioning", "Heating", "Flat-screen TV"] },
      { name: "Triple Room", tagline: "The perfect balance.", desc: "For a small group of friends or a close-knit family.", features: ["All amenities of the Double", "Extra bed on request (free, subject to availability)"] },
      { name: "Quadruple Room", tagline: "The riad opens a little wider.", desc: "To welcome four of you without compromising on comfort.", features: ["All amenities of the Double", "Generous family space"] },
    ],
  },
  restaurant: {
    eyebrow: "Restaurant & breakfast",
    title: "The table,\nfirst and foremost",
    p1: "You don't visit Fès without sitting down to eat. Our 2 restaurants serve generous Moroccan cuisine — slow-cooked tajines, pastillas, chosen spices — with vegetarian, halal and kosher options so no one leaves hungry.",
    p2: "The morning starts gently with a breakfast praised by our guests (8.1/10): buffet, à la carte or continental, in full English/Irish, vegetarian, vegan, halal, gluten-free, kosher or American versions. Coffee is already brewing in the kitchen, and children have their own menu.",
    badges: ["Buffet", "À la carte", "Continental", "Vegetarian", "Vegan", "Halal", "Gluten-free", "Kosher", "Kids menus"],
  },
  amenities: {
    eyebrow: "Amenities",
    title: "Everything you need,\nnothing you don't",
    groups: [
      { title: "Wellbeing & relaxation", items: ["Terrace", "Common lounge", "Sun umbrellas", "Air conditioning", "Heating", "Hair salon/beauty parlour"] },
      { title: "Activities (surcharge)", items: ["Bike rental", "Cooking classes", "Local cultural tour", "Walking tours"] },
      { title: "Services", items: ["Concierge service", "Luggage storage", "Tour desk", "Currency exchange", "Laundry", "Ironing", "Dry cleaning", "Private check-in/check-out"] },
      { title: "Safety", items: ["24-hour security", "CCTV", "Smoke and CO detectors", "Fire extinguishers", "Key access"] },
      { title: "Practical", items: ["Nearby parking (€2/day)", "Airport shuttle (surcharge)", "Pets allowed, no charge", "On-site convenience store"] },
      { title: "Languages spoken", items: ["🇲🇦 Arabic", "🇬🇧 English", "🇪🇸 Spanish", "🇫🇷 French"] },
    ],
  },
  practical: {
    eyebrow: "Practical info",
    title: "Good to know before you come",
    rows: [
      ["Check-in", "from 2:00 pm to 12:00 am (please notify in advance)"],
      ["Check-out", "from 1:00 am to 12:00 pm"],
      ["Children", "welcome from age 13"],
      ["Extra beds", "free, on request and subject to availability — no cots"],
      ["Quiet hours", "8:00 am – 10:00 pm"],
      ["Smoking", "non-smoking property"],
      ["Pets", "welcome, no charge"],
      ["Groups", "beyond 3 rooms, special conditions"],
      ["Payment", "Visa, Mastercard, Amex, Diners, JCB, Maestro, Discover, UnionPay, cash"],
      ["Cancellation", "conditions vary by accommodation type"],
    ],
  },
  location: {
    eyebrow: "Location",
    title: "At the heart of everything,\nfar from the noise",
    intro: "The Royal Palace of Fès at 1.8 km. Place Batha at 200 metres. Medersa Bouanania at 400 metres. Bab Bou Jeloud at 500 metres. Karaouiyne at 1 km. Fès train station at 3.5 km. Fès-Saïss airport at 17 km.",
    distances: [
      ["Place Batha", "200 m"],
      ["Medersa Bouanania", "400 m"],
      ["Bab Bou Jeloud", "500 m"],
      ["Karaouiyne", "1 km"],
      ["Royal Palace of Fès", "1.8 km"],
      ["Fès train station", "3.5 km"],
      ["Fès-Saïss Airport", "17 km"],
    ],
    osm: "Distances calculated with © OpenStreetMap.",
  },
  reviews: {
    couples: "Rating given by couples for a stay for two",
    breakfast: "Breakfast rating",
    quote: "\u201CThe kind of address you keep to yourself\u2026 until you want to talk about it.\u201D",
  },
  finalCta: {
    title: "The next chapter of your stay in Fès begins here",
    subtitle: "Limited availability by season — book now on WhatsApp.",
  },
  footer: {
    address: "Medina of Fès, Morocco",
    license: "Licence n° 00000XX0000",
    nav: "Navigation",
    follow: "Follow us",
    cancel: "Cancellation and prepayment policy varies by chosen accommodation.",
    rights: "All rights reserved.",
  },
  gallery: { eyebrow: "Gallery", title: "A glimpse, before you arrive" },
  reservation: {
    eyebrow: "Booking",
    title: "Book your stay",
    subtitle: "Fill in this short form — we reply directly on WhatsApp.",
    name: "Full name",
    namePh: "Your name",
    email: "Email",
    emailPh: "you@example.com",
    phone: "Phone",
    phonePh: "+212 …",
    checkIn: "Check-in",
    checkOut: "Check-out",
    guests: "Guests",
    guestsUnit: " guests",
    room: "Preferred room",
    selectRoom: "Choose a room",
    message: "Message (optional)",
    messagePh: "Any special request?",
    submit: "Book on WhatsApp",
    requiredHint: "Full name is required.",
  },
  wa: {
    greetingSimple: "Hello Riad Anis Fes, I'd like to check availability for a stay.",
    greetingHead: "Hello Riad Anis Fes,",
    intent: "I'd like to check availability for a stay:",
    labels: { name: "Name", email: "Email", phone: "Phone", checkIn: "Check-in", checkOut: "Check-out", guests: "Guests", room: "Preferred room", message: "Message" },
    thanks: "Thank you!",
  },
};

const es: Dict = {
  nav: { home: "Inicio", rooms: "Habitaciones", restaurant: "Restaurante", amenities: "Servicios", location: "Ubicación", contact: "Contacto" },
  cta: { book: "Reservar ahora", bookShort: "Reservar ahora →" },
  hero: {
    badge: "⭐ 9,1/10 — A las parejas les encanta este lugar",
    title: "Un refugio de otro tiempo, en el corazón de Fez",
    subtitle: "Entre patios sombreados, zelliges centenarios y un silencio reencontrado, el Riad Anis Fes le da la bienvenida a dos pasos de la medina y del Palacio Real.",
  },
  welcome: {
    eyebrow: "Bienvenido",
    title: "El alma de Fez,\nsin el ruido",
    p1: "Aquí no se reserva una habitación. Uno se regala un paréntesis. El Riad Anis Fes se acurruca en las callejuelas de Fez, a solo 200 metros de la Plaza Batha, 400 metros de la Medersa Bouanania y 500 metros de la emblemática puerta de Bab Bou Jeloud. El Palacio Real vela a 1,8 km, y la Karaouiyne — la universidad más antigua del mundo — está a solo un kilómetro.",
    p2: "Desde la llegada, un servicio de conserjería le guía. El salón común invita a la calma, la terraza al gran cielo de Fez, y el Wi-Fi gratuito le conecta con el mundo — solo cuando lo desee.",
    highlights: ["Traslado aeropuerto", "No fumadores", "Wi-Fi gratis", "Aparcamiento cercano", "2 restaurantes", "Habitaciones familiares", "Terraza", "Calefacción"],
  },
  rooms: {
    eyebrow: "Habitaciones",
    title: "Habitaciones pensadas como capullos",
    intro: "Cada alojamiento se abre a un patio y se cierra a un sueño profundo. Baño privado, ropa de cama cuidadosamente elegida, aire acondicionado discreto: el confort aquí no se ve, se siente.",
    list: [
      { name: "Habitación Doble", tagline: "Para dos, o para uno.", desc: "Una burbuja íntima con vistas al patio.", features: ["Baño privado", "Ducha", "Secador", "Artículos de aseo gratis", "Toallas y ropa de cama incluidas", "Aire acondicionado", "Calefacción", "TV de pantalla plana"] },
      { name: "Habitación Triple", tagline: "El equilibrio perfecto.", desc: "Para un pequeño grupo de amigos o una familia unida.", features: ["Todos los servicios de la Doble", "Cama supletoria bajo petición (gratis, según disponibilidad)"] },
      { name: "Habitación Cuádruple", tagline: "El riad se abre un poco más.", desc: "Para acogerles a cuatro, sin renunciar al confort.", features: ["Todos los servicios de la Doble", "Amplio espacio familiar"] },
    ],
  },
  restaurant: {
    eyebrow: "Restaurante y desayuno",
    title: "La mesa,\nante todo",
    p1: "No se visita Fez sin sentarse a la mesa. Nuestros 2 restaurantes ofrecen una cocina marroquí generosa — tajines cocinados a fuego lento, pastillas, especias escogidas — con opciones vegetarianas, halal y kósher para que nadie se quede con hambre.",
    p2: "La mañana empieza suave con un desayuno muy valorado por nuestros clientes (8,1/10): bufé, a la carta o continental, en versiones inglesa/irlandesa completa, vegetariana, vegana, halal, sin gluten, kósher o americana. El café ya se prepara en la cocina, y los niños tienen su propio menú.",
    badges: ["Bufé", "A la carta", "Continental", "Vegetariano", "Vegano", "Halal", "Sin gluten", "Kósher", "Menús infantiles"],
  },
  amenities: {
    eyebrow: "Servicios",
    title: "Todo lo necesario,\nnada superfluo",
    groups: [
      { title: "Bienestar y descanso", items: ["Terraza", "Salón común", "Sombrillas", "Aire acondicionado", "Calefacción", "Peluquería/salón de belleza"] },
      { title: "Actividades (con suplemento)", items: ["Alquiler de bicicletas", "Clases de cocina", "Visita cultural local", "Paseos a pie"] },
      { title: "Servicios", items: ["Conserjería", "Consigna", "Mostrador de excursiones", "Cambio de divisa", "Lavandería", "Planchado", "Tintorería", "Check-in/out privado"] },
      { title: "Seguridad", items: ["Seguridad 24 h", "Cámaras de vigilancia", "Detectores de humo y CO", "Extintores", "Acceso con llave"] },
      { title: "Práctico", items: ["Aparcamiento cercano (2 €/día)", "Traslado al aeropuerto (con suplemento)", "Mascotas admitidas, sin cargo", "Tienda en el establecimiento"] },
      { title: "Idiomas hablados", items: ["🇲🇦 Árabe", "🇬🇧 Inglés", "🇪🇸 Español", "🇫🇷 Francés"] },
    ],
  },
  practical: {
    eyebrow: "Información práctica",
    title: "Bueno saberlo antes de venir",
    rows: [
      ["Llegada", "de 14:00 a 00:00 (avise con antelación)"],
      ["Salida", "de 01:00 a 12:00"],
      ["Niños", "bienvenidos a partir de 13 años"],
      ["Camas supletorias", "gratis, bajo petición y según disponibilidad — sin cunas"],
      ["Horas de silencio", "08:00 – 22:00"],
      ["Fumar", "establecimiento para no fumadores"],
      ["Mascotas", "bienvenidas, sin cargo"],
      ["Grupos", "más de 3 habitaciones, condiciones especiales"],
      ["Pago", "Visa, Mastercard, Amex, Diners, JCB, Maestro, Discover, UnionPay, efectivo"],
      ["Cancelación", "condiciones variables según el tipo de alojamiento"],
    ],
  },
  location: {
    eyebrow: "Ubicación",
    title: "En el centro de todo,\nlejos del ruido",
    intro: "El Palacio Real de Fez a 1,8 km. La Plaza Batha a 200 metros. La Medersa Bouanania a 400 metros. Bab Bou Jeloud a 500 metros. La Karaouiyne a 1 km. La estación de Fez a 3,5 km. El aeropuerto de Fès-Saïss a 17 km.",
    distances: [
      ["Plaza Batha", "200 m"],
      ["Medersa Bouanania", "400 m"],
      ["Bab Bou Jeloud", "500 m"],
      ["Karaouiyne", "1 km"],
      ["Palacio Real de Fez", "1,8 km"],
      ["Estación de Fez", "3,5 km"],
      ["Aeropuerto Fès-Saïss", "17 km"],
    ],
    osm: "Distancias calculadas con © OpenStreetMap.",
  },
  reviews: {
    couples: "Nota dada por las parejas para una estancia en pareja",
    breakfast: "Nota del desayuno",
    quote: "«El tipo de dirección que se guarda para uno mismo… hasta que dan ganas de contarlo.»",
  },
  finalCta: {
    title: "El próximo capítulo de su estancia en Fez comienza aquí",
    subtitle: "Plazas limitadas según la temporada — reserve ya por WhatsApp.",
  },
  footer: {
    address: "Medina de Fez, Marruecos",
    license: "Licencia n° 00000XX0000",
    nav: "Navegación",
    follow: "Síganos",
    cancel: "Política de cancelación y prepago variable según el alojamiento elegido.",
    rights: "Todos los derechos reservados.",
  },
  gallery: { eyebrow: "Galería", title: "Un vistazo, antes de llegar" },
  reservation: {
    eyebrow: "Reserva",
    title: "Reserve su estancia",
    subtitle: "Rellene este breve formulario — le respondemos directamente por WhatsApp.",
    name: "Nombre completo",
    namePh: "Su nombre",
    email: "Email",
    emailPh: "usted@ejemplo.com",
    phone: "Teléfono",
    phonePh: "+212 …",
    checkIn: "Llegada",
    checkOut: "Salida",
    guests: "Viajeros",
    guestsUnit: " pers.",
    room: "Habitación deseada",
    selectRoom: "Elegir habitación",
    message: "Mensaje (opcional)",
    messagePh: "¿Alguna petición especial?",
    submit: "Reservar por WhatsApp",
    requiredHint: "El nombre completo es obligatorio.",
  },
  wa: {
    greetingSimple: "Hola Riad Anis Fes, me gustaría comprobar la disponibilidad para una estancia.",
    greetingHead: "Hola Riad Anis Fes,",
    intent: "Me gustaría comprobar la disponibilidad para una estancia:",
    labels: { name: "Nombre", email: "Email", phone: "Teléfono", checkIn: "Llegada", checkOut: "Salida", guests: "Viajeros", room: "Habitación deseada", message: "Mensaje" },
    thanks: "¡Gracias!",
  },
};

const ar: Dict = {
  nav: { home: "الرئيسية", rooms: "الغرف", restaurant: "المطعم", amenities: "الخدمات", location: "الموقع", contact: "اتصل بنا" },
  cta: { book: "احجز الآن", bookShort: "احجز الآن ←" },
  hero: {
    badge: "⭐ 9,1/10 — يعشق الأزواج هذا المكان",
    title: "ملاذ من زمن آخر، في قلب فاس",
    subtitle: "بين الأفنية الظليلة والزليج العتيق والسكينة المستعادة، يستقبلكم رياض أنيس فاس على بُعد خطوات من المدينة العتيقة والقصر الملكي.",
  },
  welcome: {
    eyebrow: "أهلاً بكم",
    title: "روح فاس،\nبلا ضجيج",
    p1: "هنا لا تحجز غرفة، بل تمنح نفسك استراحة. يتوارى رياض أنيس فاس في أزقة فاس، على بُعد 200 متر فقط من ساحة البطحاء، و400 متر من مدرسة بوعنانية، و500 متر من باب أبو الجلود الشهير. القصر الملكي على مسافة 1,8 كم، وجامعة القرويين — أقدم جامعة في العالم — على بُعد كيلومتر واحد.",
    p2: "منذ الوصول، يرافقكم خدمة الاستقبال. الصالون المشترك يدعو إلى التمهل، والسطح إلى سماء فاس الفسيحة، والواي فاي المجاني يصلكم بالعالم — وقتما شئتم فقط.",
    highlights: ["نقل من المطار", "غير المدخنين", "واي فاي مجاني", "موقف قريب", "مطعمان", "غرف عائلية", "شرفة", "تدفئة"],
  },
  rooms: {
    eyebrow: "الغرف",
    title: "غرف مصممة كأعشاش هادئة",
    intro: "تنفتح كل غرفة على فناء وتغلق على نوم عميق. حمام خاص، أفرشة مختارة بعناية، تكييف هادئ: الراحة هنا لا تُرى، بل تُحسّ.",
    list: [
      { name: "غرفة مزدوجة", tagline: "لشخصين، أو لنفسك.", desc: "فقاعة حميمة مطلة على الفناء.", features: ["حمام خاص", "دش", "مجفف شعر", "لوازم استحمام مجانية", "مناشف وأفرشة", "تكييف", "تدفئة", "تلفاز مسطح"] },
      { name: "غرفة ثلاثية", tagline: "التوازن المثالي.", desc: "لمجموعة صغيرة من الأصدقاء أو عائلة صغيرة.", features: ["جميع تجهيزات المزدوجة", "سرير إضافي عند الطلب (مجاني، حسب التوفر)"] },
      { name: "غرفة رباعية", tagline: "الرياض يتسع أكثر.", desc: "لاستقبالكم أربعة دون التنازل عن الراحة.", features: ["جميع تجهيزات المزدوجة", "مساحة عائلية وفيرة"] },
    ],
  },
  restaurant: {
    eyebrow: "المطعم والفطور",
    title: "المائدة،\nقبل كل شيء",
    p1: "لا تُزار فاس دون الجلوس إلى المائدة. يقدم مطعمانا مطبخاً مغربياً كريماً — طواجن، بسطيلة، توابل مختارة — مع خيارات نباتية وحلال وكوشير.",
    p2: "يبدأ الصباح بلطف بفطور يحبه ضيوفنا (8,1/10): بوفيه، قائمة طعام أو كونتيننتال، بنسخ إنجليزية/إيرلندية كاملة، نباتية، فيغن، حلال، خالية من الغلوتين، كوشير أو أمريكية. القهوة تُعدّ بالفعل، وللأطفال قائمتهم الخاصة.",
    badges: ["بوفيه", "قائمة طعام", "كونتيننتال", "نباتي", "فيغن", "حلال", "خالٍ من الغلوتين", "كوشير", "قوائم للأطفال"],
  },
  amenities: {
    eyebrow: "الخدمات",
    title: "كل ما يلزم،\nلا شيء زائد",
    groups: [
      { title: "الاسترخاء", items: ["شرفة", "صالون مشترك", "مظلات", "تكييف", "تدفئة", "صالون تجميل/حلاقة"] },
      { title: "أنشطة (بمقابل)", items: ["كراء الدراجات", "دروس طبخ", "زيارة ثقافية محلية", "جولات سيراً"] },
      { title: "الخدمات", items: ["كونسيرج", "حفظ الأمتعة", "مكتب رحلات", "صرف العملات", "مغسلة", "كي", "تنظيف جاف", "تسجيل خاص"] },
      { title: "الأمن", items: ["أمن 24/24", "كاميرات مراقبة", "أجهزة إنذار حريق وأول أكسيد الكربون", "طفايات", "دخول بمفتاح"] },
      { title: "عملي", items: ["موقف قريب (2€/يوم)", "نقل من المطار (بمقابل)", "الحيوانات مسموحة دون رسوم", "متجر في الموقع"] },
      { title: "اللغات", items: ["🇲🇦 العربية", "🇬🇧 الإنجليزية", "🇪🇸 الإسبانية", "🇫🇷 الفرنسية"] },
    ],
  },
  practical: {
    eyebrow: "معلومات عملية",
    title: "من الجيد معرفته قبل القدوم",
    rows: [
      ["الوصول", "من 14:00 إلى 00:00 (يرجى الإخبار مسبقاً)"],
      ["المغادرة", "من 01:00 إلى 12:00"],
      ["الأطفال", "مرحّب بهم ابتداءً من 13 سنة"],
      ["أسرّة إضافية", "مجانية عند الطلب وحسب التوفر — لا توجد أسرّة للرضّع"],
      ["ساعات الهدوء", "08:00 – 22:00"],
      ["التدخين", "منع التدخين"],
      ["الحيوانات", "مرحّب بها، مجاناً"],
      ["المجموعات", "أكثر من 3 غرف: شروط خاصة"],
      ["الدفع", "Visa وMastercard وAmex وDiners وJCB وMaestro وDiscover وUnionPay والنقد"],
      ["الإلغاء", "شروط متغيرة حسب نوع الإقامة"],
    ],
  },
  location: {
    eyebrow: "الموقع",
    title: "في قلب كل شيء،\nبعيداً عن الضجيج",
    intro: "القصر الملكي بفاس على 1,8 كم. ساحة البطحاء على 200 متر. مدرسة بوعنانية على 400 متر. باب أبو الجلود على 500 متر. القرويين على 1 كم. محطة قطار فاس على 3,5 كم. مطار فاس سايس على 17 كم.",
    distances: [
      ["ساحة البطحاء", "200 م"],
      ["مدرسة بوعنانية", "400 م"],
      ["باب أبو الجلود", "500 م"],
      ["القرويين", "1 كم"],
      ["القصر الملكي بفاس", "1,8 كم"],
      ["محطة قطار فاس", "3,5 كم"],
      ["مطار فاس سايس", "17 كم"],
    ],
    osm: "المسافات محسوبة بواسطة © OpenStreetMap.",
  },
  reviews: {
    couples: "التقييم الذي منحه الأزواج لإقامة لشخصين",
    breakfast: "تقييم الفطور",
    quote: "«من العناوين التي يحتفظ بها المرء لنفسه… حتى تأتيه الرغبة في الحديث عنها.»",
  },
  finalCta: {
    title: "يبدأ الفصل التالي من إقامتكم في فاس هنا",
    subtitle: "الأماكن محدودة حسب الموسم — احجزوا الآن عبر واتساب.",
  },
  footer: {
    address: "مدينة فاس، المغرب",
    license: "رخصة رقم 00000XX0000",
    nav: "التصفح",
    follow: "تابعونا",
    cancel: "سياسة الإلغاء والدفع المسبق تختلف حسب الإقامة المختارة.",
    rights: "جميع الحقوق محفوظة.",
  },
  gallery: { eyebrow: "معرض الصور", title: "لمحة قبل الوصول" },
  reservation: {
    eyebrow: "الحجز",
    title: "احجز إقامتك",
    subtitle: "املأ هذا النموذج القصير — نرد عليك مباشرة عبر واتساب.",
    name: "الاسم الكامل",
    namePh: "اسمك",
    email: "البريد الإلكتروني",
    emailPh: "you@example.com",
    phone: "الهاتف",
    phonePh: "+212 …",
    checkIn: "الوصول",
    checkOut: "المغادرة",
    guests: "المسافرون",
    guestsUnit: " ضيف",
    room: "الغرفة المطلوبة",
    selectRoom: "اختر غرفة",
    message: "رسالة (اختياري)",
    messagePh: "أي طلب خاص؟",
    submit: "احجز عبر واتساب",
    requiredHint: "الاسم الكامل مطلوب.",,
  },
  wa: {
    greetingSimple: "مرحباً رياض أنيس فاس، أودّ الاستفسار عن توفر إقامة.",
    greetingHead: "مرحباً رياض أنيس فاس،",
    intent: "أودّ الاستفسار عن توفر إقامة:",
    labels: { name: "الاسم", email: "البريد الإلكتروني", phone: "الهاتف", checkIn: "الوصول", checkOut: "المغادرة", guests: "المسافرون", room: "الغرفة المطلوبة", message: "رسالة" },
    thanks: "شكراً!",
  },
};

export const DICTS: Record<Lang, Dict> = { fr, en, es, ar };
export type { Dict };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  useEffect(() => {
    try {
      const saved = (typeof window !== "undefined" && window.localStorage.getItem("riad-lang")) as Lang | null;
      if (saved && DICTS[saved]) setLangState(saved);
    } catch {}
  }, []);
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { window.localStorage.setItem("riad-lang", l); } catch {}
  };
  return (
    <LangContext.Provider value={{ lang, setLang, t: DICTS[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useT() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useT must be used within LanguageProvider");
  return ctx;
}