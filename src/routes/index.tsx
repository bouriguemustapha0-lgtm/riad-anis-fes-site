import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LanguageProvider, useT, LANGS, type Lang, type Dict } from "@/i18n";
import heroPatioAsset from "@/assets/hero-patio.jpg.asset.json";
import roomDoubleAsset from "@/assets/room-double.jpg.asset.json";
import roomTripleAsset from "@/assets/room-triple.jpg.asset.json";
import roomQuadAsset from "@/assets/room-quad.jpg.asset.json";
import restaurantAsset from "@/assets/restaurant.jpg.asset.json";
import terraceAsset from "@/assets/terrace.jpg.asset.json";
import medinaNightAsset from "@/assets/medina-night.jpg.asset.json";
import breakfastAsset from "@/assets/breakfast.jpg.asset.json";
import dinnerZelligeAsset from "@/assets/dinner-zellige.jpg.asset.json";
import moroccanMealAsset from "@/assets/moroccan-meal.jpg.asset.json";
import logoAsset from "@/assets/riad-anis-logo.jpg.asset.json";

const heroPatio = heroPatioAsset.url;
const roomDouble = roomDoubleAsset.url;
const roomTriple = roomTripleAsset.url;
const roomQuad = roomQuadAsset.url;
const restaurantImg = restaurantAsset.url;
const terraceImg = terraceAsset.url;
const medinaNight = medinaNightAsset.url;
const breakfastImg = breakfastAsset.url;
const dinnerZellige = dinnerZelligeAsset.url;
const moroccanMeal = moroccanMealAsset.url;
const logoUrl = logoAsset.url;

const WHATSAPP_PHONE = "212661504917";

function buildWhatsAppUrl({
  checkIn,
  checkOut,
  guests,
  room,
  name,
  email,
  phone,
  notes,
  wa,
  locale,
}: {
  checkIn?: string;
  checkOut?: string;
  guests?: number | string;
  room?: string;
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
  wa: Dict["wa"];
  locale: string;
}) {
  const fmt = (d?: string) => {
    if (!d) return "";
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return d;
    return dt.toLocaleDateString(locale, { day: "2-digit", month: "long", year: "numeric" });
  };
  const clean = (s?: string, max = 200) => (s ?? "").trim().slice(0, max);
  const lines = [
    wa.greetingHead,
    wa.intent,
  ];
  const cname = clean(name, 100);
  if (cname) lines.push(`• ${wa.labels.name} : ${cname}`);
  const cemail = clean(email, 255);
  if (cemail) lines.push(`• ${wa.labels.email} : ${cemail}`);
  const cphone = clean(phone, 30);
  if (cphone) lines.push(`• ${wa.labels.phone} : ${cphone}`);
  if (checkIn) lines.push(`• ${wa.labels.checkIn} : ${fmt(checkIn)}`);
  if (checkOut) lines.push(`• ${wa.labels.checkOut} : ${fmt(checkOut)}`);
  if (guests) lines.push(`• ${wa.labels.guests} : ${guests}`);
  if (room) lines.push(`• ${wa.labels.room} : ${room}`);
  const cnotes = clean(notes, 500);
  if (cnotes) lines.push(`• ${wa.labels.message} : ${cnotes}`);
  lines.push(wa.thanks);
  return `https://wa.me/${WHATSAPP_PHONE}?text=` + encodeURIComponent(lines.join("\n"));
}

function useWhatsAppUrl() {
  const { t, lang } = useT();
  const locale = lang === "fr" ? "fr-FR" : lang === "es" ? "es-ES" : lang === "ar" ? "ar-MA" : "en-GB";
  const simple = `https://wa.me/${WHATSAPP_PHONE}?text=` + encodeURIComponent(t.wa.greetingSimple);
  return {
    simple,
    withRoom: (room: string) => buildWhatsAppUrl({ room, wa: t.wa, locale }),
  };
}

const GALLERY: { src: string; alt: string }[] = [
  { src: dinnerZellige, alt: "Table marocaine dressée devant une fontaine en zelliges" },
  { src: moroccanMeal, alt: "Repas marocain complet servi sur une mosaïque bleue" },
  { src: breakfastImg, alt: "Petit-déjeuner servi devant un mur en mosaïque" },
  { src: terraceImg, alt: "Terrasse du riad avec vue sur la médina de Fès" },
  { src: medinaNight, alt: "Médina de Fès de nuit avec minarets illuminés" },
  { src: heroPatio, alt: "Patio intérieur du riad avec fontaine en zelliges" },
];

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? 0 : (i + 1) % GALLERY.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? 0 : (i - 1 + GALLERY.length) % GALLERY.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <section id="galerie" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--terracotta)]">
            Galerie
          </p>
          <h2 className="font-serif text-4xl leading-tight text-[color:var(--burnt)] md:text-5xl">
            Un aperçu, avant l'arrivée
          </h2>
        </div>
        <div className="reveal mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {GALLERY.map((g, i) => (
            <button
              key={g.src}
              type="button"
              onClick={() => setOpen(i)}
              className={`hover-zoom group relative overflow-hidden rounded-2xl ${
                i === 0 || i === 3 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"
              }`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-0 bg-[color:var(--burnt)]/0 transition-colors group-hover:bg-[color:var(--burnt)]/20" />
            </button>
          ))}
        </div>
      </div>
      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[color:var(--burnt)]/95 p-4 backdrop-blur"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            aria-label="Fermer"
            className="absolute right-6 top-6 text-3xl text-[color:var(--ivory)]"
            onClick={() => setOpen(null)}
          >
            ×
          </button>
          <button
            type="button"
            aria-label="Précédent"
            className="absolute left-4 text-3xl text-[color:var(--ivory)] md:left-8"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((i) => (i === null ? 0 : (i - 1 + GALLERY.length) % GALLERY.length));
            }}
          >
            ‹
          </button>
          <img
            src={GALLERY[open].src}
            alt={GALLERY[open].alt}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            aria-label="Suivant"
            className="absolute right-4 text-3xl text-[color:var(--ivory)] md:right-8"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((i) => (i === null ? 0 : (i + 1) % GALLERY.length));
            }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
});

function useNav() {
  const { t } = useT();
  return [
    { href: "#accueil", label: t.nav.home },
    { href: "#chambres", label: t.nav.rooms },
    { href: "#restaurant", label: t.nav.restaurant },
    { href: "#equipements", label: t.nav.amenities },
    { href: "#localisation", label: t.nav.location },
    { href: "#contact", label: t.nav.contact },
  ];
}

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function CtaButton({ children, variant = "primary", className = "" }: { children: React.ReactNode; variant?: "primary" | "ghost"; className?: string }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-[color:var(--burnt)] shadow-[0_8px_24px_-8px_color-mix(in_oklab,var(--terracotta)_60%,transparent)]"
      : "border border-current text-current hover:bg-current/10";
  const { simple } = useWhatsAppUrl();
  return (
    <a
      href={simple}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </a>
  );
}

function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useT();
  const [open, setOpen] = useState(false);
  const current = LANGS.find((l) => l.code === lang)!;
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        aria-label="Language"
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium tracking-wide transition-colors ${
          dark
            ? "border-[color:var(--burnt)]/20 text-[color:var(--burnt)] hover:bg-[color:var(--burnt)]/5"
            : "border-white/30 text-white/95 hover:bg-white/10"
        }`}
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && (
        <ul className="absolute end-0 mt-2 min-w-[8rem] overflow-hidden rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--ivory)] py-1 text-[color:var(--burnt)] shadow-xl z-50">
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); setLang(l.code as Lang); setOpen(false); }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-[color:var(--gold)]/10 ${
                  l.code === lang ? "font-semibold text-[color:var(--terracotta)]" : ""
                }`}
              >
                <span>{l.flag}</span>
                <span>{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Header() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const { t } = useT();
  const NAV = useNav();
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[color:var(--ivory)]/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href="#accueil"
          aria-label="Riad Anis Fes — Accueil"
          className="flex items-center gap-3"
        >
          <img
            src={logoUrl}
            alt="Logo Riad Anis Fes"
            className={`h-11 w-11 rounded-full object-cover ring-1 transition-all duration-500 md:h-12 md:w-12 ${
              scrolled ? "ring-[color:var(--gold)]/40" : "ring-white/40 bg-white/10"
            }`}
          />
          <span
            className={`font-serif text-lg tracking-wide md:text-xl ${
              scrolled ? "text-[color:var(--burnt)]" : "text-white"
            }`}
          >
            Riad <span className="text-[color:var(--gold)]">Anis</span> Fes
          </span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`text-sm font-medium transition-colors hover:text-[color:var(--terracotta)] ${
                scrolled ? "text-[color:var(--burnt)]" : "text-white/90"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher dark={scrolled} />
          <CtaButton>{t.cta.book}</CtaButton>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher dark={scrolled} />
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className={`${scrolled ? "text-[color:var(--burnt)]" : "text-white"}`}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-[color:var(--gold)]/30 bg-[color:var(--ivory)] px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-[color:var(--burnt)]"
              >
                {n.label}
              </a>
            ))}
            <CtaButton>{t.cta.book}</CtaButton>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const { t } = useT();
  return (
    <section id="accueil" className="relative min-h-screen w-full overflow-hidden">
      <img
        src={heroPatio}
        alt="Patio du Riad Anis Fes au coucher du soleil"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--burnt)]/60 via-[color:var(--burnt)]/30 to-[color:var(--burnt)]/70" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center text-white">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-widest uppercase backdrop-blur">
          {t.hero.badge}
        </span>
        <h1 className="max-w-3xl text-balance font-serif text-5xl leading-[1.05] md:text-7xl">
          {t.hero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-balance text-base text-white/90 md:text-lg">
          {t.hero.subtitle}
        </p>
        <div className="mt-10">
          <CtaButton>{t.cta.book}</CtaButton>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-bounce">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

const HIGHLIGHT_ICONS = ["🚐", "🚭", "📶", "🅿️", "🍽️", "👨‍👩‍👧", "☀️", "🔥"];

function Welcome() {
  const { t } = useT();
  const [title1, title2] = t.welcome.title.split("\n");
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center md:gap-16">
        <div className="reveal">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--terracotta)]">
            {t.welcome.eyebrow}
          </p>
          <h2 className="font-serif text-4xl leading-tight text-[color:var(--burnt)] md:text-5xl">
            {title1}<br /> {title2}
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-[color:var(--burnt)]/80">
            <p>{t.welcome.p1}</p>
            <p>{t.welcome.p2}</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {t.welcome.highlights.map((label, i) => (
              <div key={label} className="flex flex-col items-start gap-2">
                <span className="text-2xl">{HIGHLIGHT_ICONS[i]}</span>
                <span className="text-xs font-medium text-[color:var(--burnt)]/70">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal hover-zoom rounded-2xl">
          <img
            src={heroPatio}
            alt="Patio intérieur du riad avec zelliges"
            loading="lazy"
            className="aspect-[4/5] w-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}

const ROOM_IMAGES = [roomDouble, roomTriple, roomQuad];

function Rooms() {
  const { t } = useT();
  const { withRoom } = useWhatsAppUrl();
  return (
    <section id="chambres" className="relative bg-[color:var(--burnt)] py-24 text-[color:var(--ivory)] md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--gold)]">
            {t.rooms.eyebrow}
          </p>
          <h2 className="font-serif text-4xl leading-tight md:text-5xl">
            {t.rooms.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[color:var(--ivory)]/70">
            {t.rooms.intro}
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {t.rooms.list.map((r, i) => (
            <article
              key={r.name}
              className="reveal group flex flex-col overflow-hidden rounded-2xl bg-[color:var(--ivory)]/5 backdrop-blur"
            >
              <div className="hover-zoom aspect-[4/3]">
                <img
                  src={ROOM_IMAGES[i]}
                  alt={r.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-2xl text-[color:var(--ivory)]">{r.name}</h3>
                <p className="mt-2 text-sm italic text-[color:var(--gold)]">{r.tagline}</p>
                <p className="mt-3 text-sm text-[color:var(--ivory)]/70">{r.desc}</p>
                <ul className="mt-5 space-y-1.5 text-xs text-[color:var(--ivory)]/60">
                  {r.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[color:var(--gold)]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-[color:var(--ivory)]/10">
                  <a
                    href={withRoom(r.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--gold)] transition-colors hover:text-[color:var(--ivory)]"
                  >
                    {t.cta.bookShort}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Restaurant() {
  const { t } = useT();
  const [title1, title2] = t.restaurant.title.split("\n");
  return (
    <section id="restaurant" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-5 md:items-center">
          <div className="reveal md:col-span-2">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--terracotta)]">
              {t.restaurant.eyebrow}
            </p>
            <h2 className="font-serif text-4xl leading-tight text-[color:var(--burnt)] md:text-5xl">
              {title1}<br /> {title2}
            </h2>
            <div className="mt-8 space-y-5 text-[color:var(--burnt)]/80">
              <p>{t.restaurant.p1}</p>
              <p>{t.restaurant.p2}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {t.restaurant.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-[color:var(--terracotta)]/30 bg-[color:var(--terracotta)]/5 px-3 py-1 text-xs text-[color:var(--terracotta)]"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div className="reveal md:col-span-3">
            <div className="hover-zoom rounded-2xl">
              <img
                src={restaurantImg}
                alt="Table marocaine dressée avec tajines et thé à la menthe"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="hover-zoom rounded-2xl">
                <img
                  src={moroccanMeal}
                  alt="Repas marocain servi sur mosaïque bleue"
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-2xl object-cover"
                />
              </div>
              <div className="hover-zoom rounded-2xl">
                <img
                  src={breakfastImg}
                  alt="Petit-déjeuner du riad"
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const AMENITIES = [
  {
    title: "Bien-être & détente",
    items: [
      "Terrasse",
      "Salon commun",
      "Parasols",
      "Climatisation",
      "Chauffage",
      "Salon de coiffure/institut de beauté",
    ],
  },
  {
    title: "Activités (en supplément)",
    items: [
      "Location de vélos",
      "Cours de cuisine",
      "Visite culturelle locale",
      "Balades à pied",
    ],
  },
  {
    title: "Services",
    items: [
      "Service de concierge",
      "Bagagerie",
      "Bureau d'excursions",
      "Service de change",
      "Blanchisserie",
      "Pressing",
      "Nettoyage à sec",
      "Enregistrement/départ privé",
    ],
  },
  {
    title: "Sécurité",
    items: [
      "Sécurité 24h/24",
      "Caméras de surveillance",
      "Détecteurs de fumée et de monoxyde de carbone",
      "Extincteurs",
      "Clés d'accès",
    ],
  },
  {
    title: "Pratique",
    items: [
      "Parking à proximité (2€/jour)",
      "Navette aéroport (en supplément)",
      "Animaux acceptés, sans supplément",
      "Supérette sur place",
    ],
  },
  {
    title: "Langues parlées",
    items: ["🇲🇦 Arabe", "🇬🇧 Anglais", "🇪🇸 Espagnol", "🇫🇷 Français"],
  },
];

function Amenities() {
  return (
    <section id="equipements" className="relative bg-[color:var(--ivory)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--terracotta)]">
            Équipements
          </p>
          <h2 className="font-serif text-4xl leading-tight text-[color:var(--burnt)] md:text-5xl">
            Tout ce qu'il faut,<br /> rien de superflu
          </h2>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((group) => (
            <div
              key={group.title}
              className="reveal rounded-2xl border border-[color:var(--gold)]/30 bg-white/50 p-8 backdrop-blur"
            >
              <h3 className="font-serif text-xl text-[color:var(--burnt)]">{group.title}</h3>
              <ul className="mt-5 space-y-2 text-sm text-[color:var(--burnt)]/75">
                {group.items.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--terracotta)]" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const INFOS = [
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
];

function PracticalInfo() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--terracotta)]">
            Infos pratiques
          </p>
          <h2 className="font-serif text-4xl leading-tight text-[color:var(--burnt)] md:text-5xl">
            Bon à savoir avant de venir
          </h2>
        </div>
        <dl className="reveal mt-16 divide-y divide-[color:var(--gold)]/30 border-y border-[color:var(--gold)]/30">
          {INFOS.map(([k, v]) => (
            <div key={k} className="grid gap-2 py-5 md:grid-cols-4 md:gap-6">
              <dt className="font-serif text-lg text-[color:var(--burnt)]">{k}</dt>
              <dd className="text-sm text-[color:var(--burnt)]/75 md:col-span-3">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const DISTANCES = [
  ["Place Batha", "200 m"],
  ["Medersa Bouanania", "400 m"],
  ["Bab Bou Jeloud", "500 m"],
  ["Karaouiyne", "1 km"],
  ["Palais royal de Fès", "1,8 km"],
  ["Gare de Fès", "3,5 km"],
  ["Aéroport Fès-Saïss", "17 km"],
];

function Location() {
  return (
    <section id="localisation" className="relative bg-[color:var(--majorelle)] py-24 text-[color:var(--ivory)] md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <div className="reveal">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--gold)]">
              Localisation
            </p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Au cœur de tout,<br /> loin du bruit
            </h2>
            <p className="mt-6 text-[color:var(--ivory)]/75">
              Le Palais royal de Fès à 1,8 km. La Place Batha à 200 mètres. La Medersa Bouanania à 400 mètres.
              Bab Bou Jeloud à 500 mètres. La Karaouiyne à 1 km. La gare de Fès à 3,5 km. L'aéroport de
              Fès-Saïss à 17 km.
            </p>
            <ul className="mt-8 space-y-3">
              {DISTANCES.map(([place, dist]) => (
                <li
                  key={place}
                  className="flex items-center justify-between border-b border-[color:var(--ivory)]/15 pb-3 text-sm"
                >
                  <span className="text-[color:var(--ivory)]/90">{place}</span>
                  <span className="font-serif text-lg text-[color:var(--gold)]">{dist}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-[color:var(--ivory)]/50">
              Distances calculées avec © OpenStreetMap.
            </p>
          </div>
          <div className="reveal overflow-hidden rounded-2xl border border-[color:var(--ivory)]/10 shadow-2xl">
            <iframe
              title="Localisation Riad Anis Fes"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-4.99%2C34.058%2C-4.97%2C34.068&layer=mapnik&marker=34.063%2C-4.98"
              className="h-[500px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal grid gap-12 md:grid-cols-2">
          <div className="text-center md:text-left">
            <div className="font-serif text-8xl leading-none text-[color:var(--terracotta)] md:text-9xl">
              9,1<span className="text-4xl text-[color:var(--burnt)]/40 md:text-5xl">/10</span>
            </div>
            <p className="mt-3 text-sm uppercase tracking-widest text-[color:var(--burnt)]/60">
              Note donnée par les couples pour un séjour à deux
            </p>
          </div>
          <div className="text-center md:text-left">
            <div className="font-serif text-8xl leading-none text-[color:var(--majorelle)] md:text-9xl">
              8,1<span className="text-4xl text-[color:var(--burnt)]/40 md:text-5xl">/10</span>
            </div>
            <p className="mt-3 text-sm uppercase tracking-widest text-[color:var(--burnt)]/60">
              Note du petit-déjeuner
            </p>
          </div>
        </div>
        <blockquote className="reveal mt-20 mx-auto max-w-3xl text-center">
          <p className="font-serif text-2xl italic leading-relaxed text-[color:var(--burnt)] md:text-3xl">
            « Le genre d'adresse qu'on garde pour soi... jusqu'à ce qu'on ait envie d'en parler. »
          </p>
        </blockquote>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[color:var(--terracotta)] py-24 md:py-32">
      <img
        src={medinaNight}
        alt="Médina de Fès de nuit"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center text-[color:var(--ivory)]">
        <h2 className="font-serif text-4xl leading-tight md:text-6xl">
          Le prochain chapitre de votre séjour à Fès commence ici
        </h2>
        <p className="mt-6 text-lg text-[color:var(--ivory)]/85">
          Places limitées selon la saison — réservez dès maintenant sur WhatsApp.
        </p>
        <div className="mt-10">
          <CtaButton>Réserver maintenant</CtaButton>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[color:var(--burnt)] py-16 text-[color:var(--ivory)]/70">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="font-serif text-2xl text-[color:var(--ivory)]">
              Riad <span className="text-[color:var(--gold)]">Anis</span> Fes
            </div>
            <p className="mt-4 text-sm">
              Médina de Fès, Maroc<br />
              Licence n° 00000XX0000
            </p>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-[color:var(--gold)]">Navigation</p>
            <ul className="space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-[color:var(--ivory)]">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-[color:var(--gold)]">Suivez-nous</p>
            <div className="flex gap-4">
              {["Instagram", "Facebook", "TripAdvisor"].map((s) => (
                <a key={s} href="#" aria-label={s} className="text-sm hover:text-[color:var(--ivory)]">
                  {s}
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs text-[color:var(--ivory)]/50">
              Politique d'annulation et de prépaiement variable selon l'hébergement choisi.
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-[color:var(--ivory)]/10 pt-6 text-center text-xs text-[color:var(--ivory)]/50">
          © {new Date().getFullYear()} Riad Anis Fes. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

function Divider() {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="zellige-divider" />
    </div>
  );
}

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-[color:var(--ivory)] text-[color:var(--burnt)]">
      <Header />
      <main>
        <Hero />
        <Welcome />
        <Divider />
        <Rooms />
        <Restaurant />
        <Divider />
        <Amenities />
        <PracticalInfo />
        <Location />
        <Gallery />
        <Reviews />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
