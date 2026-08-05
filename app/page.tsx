"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Camera,
  Car,
  ChevronDown,
  Church,
  Clock3,
  Download,
  Heart,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";

type Language = "pt" | "en";

const weddingDate = new Date("2026-10-17T11:00:00+01:00");

const schedule = [
  { group: "church", time: "11:00", pt: "Cerimónia Religiosa", en: "Religious Ceremony" },
  { group: "church", time: "12:00", pt: "Cumprimentos aos Noivos & Fotografias Oficiais", en: "Greetings & Official Photographs" },
  { group: "venue", time: "12:30", pt: "Deslocação para o Local da Receção", en: "Travel to the Reception Venue" },
  { group: "venue", time: "13:00", pt: "Cocktail de Receção & Fotografias", en: "Welcome Cocktail & Photographs" },
  { group: "venue", time: "14:20", pt: "Entrada Oficial dos Noivos", en: "Official Entrance of the Couple" },
  { group: "venue", time: "14:30", pt: "Almoço de Celebração", en: "Celebration Lunch" },
  { group: "venue", time: "16:30", pt: "Discursos Especiais", en: "Special Speeches" },
  { group: "venue", time: "16:50", pt: "Sorteio Especial", en: "Special Prize Draw" },
  { group: "venue", time: "17:00", pt: "Primeira Dança & Abertura da Pista", en: "First Dance & Opening of the Dance Floor" },
  { group: "venue", time: "19:00", pt: "Mesa de Sabores & Convívio", en: "Evening Table & Fellowship" },
  { group: "venue", time: "21:30", pt: "Jogos, Música & Dança", en: "Games, Music & Dancing" },
  { group: "venue", time: "22:30", pt: "Corte do Bolo & Brinde Especial", en: "Cake Cutting & Special Toast" },
  { group: "venue", time: "23:00", pt: "Festa Final & Celebração", en: "Final Party & Celebration" },
];

const copy = {
  pt: {
    nav: ["Início", "Informações", "Programação", "RSVP", "Galeria", "FAQ"],
    verse: "“Buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.”",
    verseRef: "Mateus 6:33",
    date: "17 OUTUBRO 2026",
    place: "LOURES • MAFRA",
    rsvp: "Confirmar presença",
    discover: "Descobrir o nosso dia",
    days: "Dias",
    hours: "Horas",
    minutes: "Min",
    seconds: "Seg",
    informationEyebrow: "O nosso dia",
    informationTitle: "Informações Gerais",
    ceremony: "Cerimónia",
    ceremonyLocation: "Igreja em Loures",
    ceremonyAddress: "R. das Lezírias 20, 2670-513 Loures, Portugal",
    ceremonyTime: "11:00",
    reception: "Receção",
    receptionLocation: "Quinta em Mafra",
    receptionAddress: "Estrada da Arrifana, Quinta da Fonte, 2640-302 Igreja Nova, Portugal",
    receptionTime: "Após a cerimónia",
    maps: "Abrir no Google Maps",
    dressTitle: "Dress code",
    dressText: "Clássico, elegante e premium. Pedimos gentilmente que evitem branco ou tons semelhantes.",
    scheduleEyebrow: "Cada momento preparado com amor",
    scheduleTitle: "Programação do Dia",
    church: "Igreja • Loures",
    venue: "Quinta • Mafra",
    foodTitle: "Comida & Restrições",
    foodText: "O menu será preparado com opções adequadas às necessidades dos convidados. Indique alergias ou restrições no RSVP.",
    teamTitle: "Equipa & Pessoas-Chave",
    transportTitle: "Transporte",
    galleryTitle: "Galeria",
    galleryText: "Uma coleção de momentos que contam um pouco da nossa história.",
    faqTitle: "Perguntas Frequentes",
    contactTitle: "Contactos de Emergência",
    rsvpTitle: "Confirmação de Presença",
    rsvpIntro: "Confirme a sua presença até 1 de setembro de 2026.",
    name: "Nome completo",
    email: "Email",
    phone: "Telefone",
    attend: "Vai comparecer?",
    yes: "Sim",
    no: "Não",
    restrictions: "Restrições alimentares ou mensagem",
    submit: "Enviar RSVP",
    sent: "Obrigado. A sua confirmação foi enviada com sucesso.",
    footer: "Com amor, fé e gratidão.",
  },
  en: {
    nav: ["Home", "Information", "Schedule", "RSVP", "Gallery", "FAQ"],
    verse: "“Seek first the kingdom of God and His righteousness, and all these things will be added to you.”",
    verseRef: "Matthew 6:33",
    date: "17 OCTOBER 2026",
    place: "LOURES • MAFRA",
    rsvp: "Confirm attendance",
    discover: "Discover our day",
    days: "Days",
    hours: "Hours",
    minutes: "Min",
    seconds: "Sec",
    informationEyebrow: "Our wedding day",
    informationTitle: "General Information",
    ceremony: "Ceremony",
    ceremonyLocation: "Church in Loures",
ceremonyAddress: "R. das Lezírias 20, 2670-513 Loures, Portugal",
ceremonyTime: "11:00",
    reception: "Reception",
    receptionLocation: "Quinta da Fonte",
receptionAddress:
  "Estrada da Arrifana, Quinta da Fonte, 2640-302 Igreja Nova, Portugal",
receptionTime: "After the ceremony",
    maps: "Open in Google Maps",
    dressTitle: "Dress code",
    dressText: "Classic, elegant and premium. We kindly ask guests to avoid white or similar shades.",
    scheduleEyebrow: "Every moment prepared with love",
    scheduleTitle: "Wedding Day Schedule",
    church: "Church • Loures",
    venue: "Venue • Mafra",
    foodTitle: "Food & Dietary Requirements",
    foodText: "The menu will include suitable options for our guests. Please share allergies or dietary requirements in the RSVP.",
    teamTitle: "Team & Key People",
    transportTitle: "Transport",
    galleryTitle: "Gallery",
    galleryText: "Official photographs and moments shared by our guests will appear here.",
    faqTitle: "Frequently Asked Questions",
    contactTitle: "Emergency Contacts",
    rsvpTitle: "RSVP",
    rsvpIntro: "Please confirm your attendance by 1 September 2026.",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    attend: "Will you attend?",
    yes: "Yes",
    no: "No",
    restrictions: "Dietary requirements or message",
    submit: "Submit RSVP",
    sent: "Thank you. Your response was saved only on this device. Database integration will be added in the next step.",
    footer: "With love, faith and gratitude.",
  },
};

const faqItems = [
  {
    ptQ: "Qual é o dress code?",
    enQ: "What is the dress code?",
    ptA: "Clássico e elegante. Evite branco ou tons semelhantes.",
    enA: "Classic and elegant. Please avoid white or similar shades.",
  },
  {
    ptQ: "Existe estacionamento?",
    enQ: "Is parking available?",
    ptA: "Sim, na igreja e na quinta.",
    enA: "Yes, at both the church and the reception venue.",
  },
  {
    ptQ: "Até quando devo confirmar presença?",
    enQ: "When is the RSVP deadline?",
    ptA: "Até 1 de setembro de 2026.",
    enA: "By 1 September 2026.",
  },
  {
    ptQ: "Como chego ao local da receção?",
    enQ: "How do I get to the reception venue?",
    ptA: "Utilize o botão 'Abrir no Google Maps' na secção Informações.",
    enA: "Use the 'Open in Google Maps' button in the Information section.",
  },
];

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.42em] text-[#7b9fbe]">
        {eyebrow}
      </p>
      <h2 className="font-serif text-4xl leading-tight text-[#111111] sm:text-5xl md:text-6xl">
        {title}
      </h2>
      <div className="mx-auto mt-7 h-px w-24 bg-gradient-to-r from-transparent via-[#91b5d6] to-transparent" />
    </div>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("pt");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const t = copy[language];

  useEffect(() => {
    const update = () => {
      const distance = Math.max(0, weddingDate.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(distance / 86_400_000),
        hours: Math.floor((distance / 3_600_000) % 24),
        minutes: Math.floor((distance / 60_000) % 60),
        seconds: Math.floor((distance / 1_000) % 60),
      });
    };

    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const churchEvents = useMemo(
    () => schedule.filter((item) => item.group === "church"),
    []
  );
  const venueEvents = useMemo(
    () => schedule.filter((item) => item.group === "venue"),
    []
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (!guestName.trim() || !attendance) {
    setSubmitError("Preencha o nome e escolha Sim ou Não.");
    return;
  }

  try {
    setSubmitting(true);
    setSubmitError("");
    setSubmitted(false);

    const formData = new URLSearchParams();

    formData.append("name", guestName.trim());
    formData.append("attendance", attendance);

    await fetch(
      "https://script.google.com/macros/s/AKfycbxHTgifO_IzwxFkWIvRf78t-abv46s8plmg1b0CG5iyFzT9ArJttXeMld4GaK4vsYZVgw/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      }
    );

    setGuestName("");
    setAttendance("");
    setSubmitted(true);
  } catch (error) {
    console.error(error);
    setSubmitError("Não foi possível enviar a confirmação. Tente novamente.");
  } finally {
    setSubmitting(false);
  }
}
const galleryPhotos = [
  {
    src: "/gallery/foto1.jpg",
    position: "center 80%",
    size: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/gallery/foto2.jpg",
    position: "center 18%",
    size: "",
  },
  {
    src: "/gallery/foto3.jpg",
    position: "center 18%",
    size: "",
  },
  {
    src: "/gallery/foto4.jpg",
    position: "center 25%",
    size: "md:row-span-2",
  },
  {
    src: "/gallery/foto5.jpg",
    position: "center",
    size: "",
  },
  {
    src: "/gallery/foto6.jpg",
    position: "center 40%",
    size: "md:col-span-2",
  },
  {
    src: "/gallery/foto7.jpg",
    position: "center 30%",
    size: "",
  },
  {
    src: "/gallery/foto8.jpg",
    position: "center 25%",
    size: "",
  },
  {
    src: "/gallery/foto9.jpg",
    position: "center 30%",
    size: "md:row-span-2",
  },
  {
    src: "/gallery/foto10.jpg",
    position: "center",
    size: "",
  },
  {
    src: "/gallery/foto11.jpg",
    position: "center 40%",
    size: "md:col-span-2",
  },
  {
    src: "/gallery/foto12.jpg",
    position: "center 25%",
    size: "",
  },
];
  const navTargets = ["home", "info", "schedule", "rsvp", "gallery", "faq"];

  return (
    <main className="min-h-screen bg-white text-[#243445]">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#b9dcf5]/15 bg-[#06121f]/75 shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#home" className="font-serif text-2xl tracking-wide text-white drop-shadow-md">
            Sofia <span className="text-[#b9dcf5]">&</span> Tomé
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {t.nav.map((item, index) => (
              <a
                key={item}
                href={`#${navTargets[index]}`}
                className="text-xs uppercase tracking-[0.18em] text-white/80 transition hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
              className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white hover:text-[#152433]"
            >
              {language === "pt" ? "EN" : "PT"}
            </button>
            <button
              type="button"
              aria-label="Abrir menu"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-full border border-white/30 p-2 text-white lg:hidden"
            >
              {mobileOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#0d1824]/95 px-6 py-5 lg:hidden">
            <div className="flex flex-col gap-4">
              {t.nav.map((item, index) => (
                <a
                  key={item}
                  href={`#${navTargets[index]}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm uppercase tracking-[0.2em] text-white/80"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-28 text-white"
      >
        <div className="absolute inset-0">
          <img
            src="/couple.jpg"
            alt="Sofia e Tomé"
            className="h-full w-full scale-[1.02] object-cover"
style={{ objectPosition: "center 35%" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,12,22,0.72)_0%,rgba(5,18,32,0.22)_38%,rgba(3,12,22,0.82)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(2,10,18,0.38)_100%)]" />
          <div className="absolute inset-0 bg-[#78b9e8]/10" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.15 }}
          className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center"
        >
          <p className="max-w-2xl text-[10px] uppercase leading-6 tracking-[0.38em] text-white/75 sm:text-xs">
            {t.verse}
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.42em] text-[#b7d2ea]">
            {t.verseRef}
          </p>

          <h1 className="mt-8 font-serif text-6xl font-light leading-none text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.75)] sm:text-7xl md:text-8xl lg:text-9xl">
            Sofia {" "}
  <span className="text-[#bde3ff] drop-shadow-[0_0_24px_rgba(189,227,255,0.45)]">
    &
  </span>{" "}
  Tomé
          </h1>

          <div className="mt-7 flex flex-col items-center gap-2">
            <p className="text-xl font-light tracking-[0.28em] text-[#e9f6ff] drop-shadow-lg sm:text-2xl md:text-3xl md:tracking-[0.42em]">
              {t.date}
            </p>
            </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#rsvp"
              className="rounded-full border border-white bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#142536] transition hover:-translate-y-0.5 hover:bg-[#dcecf8]"
            >
              {t.rsvp}
            </a>
            <a
              href="#schedule"
              className="rounded-full border border-white/45 bg-white/10 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              {t.discover}
            </a>
          </div>

          <div className="mt-10 grid w-full max-w-2xl grid-cols-4 gap-2 sm:gap-4">
            {[
              [timeLeft.days, t.days],
              [timeLeft.hours, t.hours],
              [timeLeft.minutes, t.minutes],
              [timeLeft.seconds, t.seconds],
            ].map(([value, label]) => (
              <div
                key={String(label)}
                className="rounded-2xl border border-[#c9e8ff]/25 bg-[#071827]/55 px-2 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#b9dcf5]/50 hover:bg-[#102b42]/70 sm:rounded-3xl sm:px-4 sm:py-6"
              >
                <div className="font-serif text-2xl font-light text-white sm:text-4xl">
                  {value}
                </div>
                <div className="mt-1 text-[9px] uppercase tracking-[0.22em] text-white/65 sm:text-[10px]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <a
          href="#info"
          aria-label="Descer"
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70"
        >
          <ChevronDown className="animate-bounce" />
        </a>
      </section>

      <section
  id="info"
  className="bg-white px-5 py-24 sm:px-8 md:py-32"
>
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={t.informationEyebrow}
            title={t.informationTitle}
          />

          <div className="grid gap-7 lg:grid-cols-2">
            {[
              {
                icon: Church,
                title: t.ceremony,
                location: t.ceremonyLocation,
                time: t.ceremonyTime,
                href: "https://maps.app.goo.gl/d3BwpXnxg6do6KjPA",
              },
              {
                icon: Heart,
                title: t.reception,
                location: t.receptionLocation,
                time: t.receptionTime,
                href: "https://maps.app.goo.gl/UbBSFJvFwMahecZB6",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <motion.article
                  key={card.title}
                  whileHover={{ y: -6 }}
                  className="group overflow-hidden rounded-[2rem] border border-[#dfeaf3] bg-white shadow-[0_20px_60px_rgba(20,40,60,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#b9d9ef] hover:shadow-[0_28px_75px_rgba(20,40,60,0.12)]"
                >
                  <div className="h-2 bg-gradient-to-r from-[#d9ebf8] via-[#8fb5d6] to-[#d9ebf8]" />
                  <div className="p-8 sm:p-10">
                    <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#cfe0ee] bg-[#edf6fc] text-[#668fb4]">
                      <Icon size={27} strokeWidth={1.6} />
                    </div>
                    <p className="text-xs uppercase tracking-[0.32em] text-[#789bbb]">
                      {card.title}
                    </p>
                    <h3 className="mt-3 font-serif text-4xl text-[#1f3446]">
                      {card.location}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#667788]">
  {card.title === t.ceremony ? t.ceremonyAddress : t.receptionAddress}
</p>
                    <div className="mt-7 flex items-center gap-3 text-[#5f7385]">
                      <Clock3 size={18} className="text-[#444444]"/>
                      <span>{card.time}</span>
                    </div>
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#173149] px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#315b7d]"
                    >
                      <MapPin size={16} />
                      {t.maps}
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>

        </div>
      </section>

      <section
        id="schedule"
        className="bg-[#f8fbfd] px-5 py-24 sm:px-8 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={t.scheduleEyebrow}
            title={t.scheduleTitle}
          />

          {[
            [t.church, churchEvents],
            [t.venue, venueEvents],
          ].map(([heading, items]) => (
            <div key={String(heading)} className="mb-16 last:mb-0">
              <div className="mb-9 flex items-center gap-5">
                <div className="h-px flex-1 bg-[#dbe8f1]" />
                <h3 className="font-serif text-3xl text-[#28445d] sm:text-4xl">
                  {String(heading)}
                </h3>
                <div className="h-px flex-1 bg-[#dbe8f1]" />
              </div>

              <div className="mx-auto max-w-4xl">
                {(items as typeof schedule).map((item, index) => (
                  <motion.div
                    key={`${item.time}-${item.pt}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: index * 0.035 }}
                    className="grid grid-cols-[76px_1fr] gap-5 border-b border-[#9fc9e8]/15 py-5 transition hover:bg-white/[0.025] sm:grid-cols-[110px_1fr] sm:gap-8 sm:px-4 sm:py-6"
                  >
                    <p className="font-serif text-4xl font-light tracking-[0.15em] text-[#6f97ba] sm:text-5xl">
                      {item.time}
                    </p>
                    <p className="self-center text-sm leading-7 text-[#42576a] sm:text-base">
                      {language === "pt" ? item.pt : item.en}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      
      <section id="rsvp" className="bg-[#102438] px-5 py-24 text-white sm:px-8 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#a8c9e3]">
              RSVP
            </p>
            <h2 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl">
              {t.rsvpTitle}
            </h2>
            <p className="mt-6 max-w-lg leading-8 text-white/65">
              {t.rsvpIntro}
            </p>
            <CalendarDays className="mt-10 text-[#a8c9e3]" size={38} strokeWidth={1.4} />
          </div>

<form
  onSubmit={handleSubmit}
  className="rounded-[2rem] border border-white/15 bg-white/[0.07] p-6 backdrop-blur-xl sm:p-9"
>
  <div className="grid gap-5">
    <input
      required
      name="fullName"
      autoComplete="name"
      value={guestName}
      onChange={(event) => setGuestName(event.target.value)}
      placeholder={t.name}
      className="premium-input"
    />

    <select
      required
      name="attendance"
      value={attendance}
      onChange={(event) => setAttendance(event.target.value)}
      className="premium-input"
    >
      <option value="" disabled>
        {t.attend}
      </option>

      <option value="Sim">
        {t.yes}
      </option>

      <option value="Não">
        {t.no}
      </option>
    </select>
  </div>

  <button
    type="submit"
    disabled={submitting}
    className="mt-6 w-full rounded-full bg-white px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#14273a] transition hover:bg-[#dcecf8] disabled:cursor-not-allowed disabled:opacity-60"
  >
    {submitting ? "A enviar..." : t.submit}
  </button>

  {submitError && (
    <p className="mt-5 text-sm leading-6 text-red-300">
      {submitError}
    </p>
  )}

  {submitted && (
    <p className="mt-5 text-sm leading-6 text-[#c6ddef]">
      Obrigado. A sua confirmação foi enviada com sucesso.
    </p>
  )}
</form>
        </div>
      </section>

      <section id="gallery" className="px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
<SectionHeading
  eyebrow={language === "pt" ? "A nossa história" : "Our story"}
  title={t.galleryTitle}
/>          <p className="-mt-10 mb-12 text-center text-[#66798a]">{t.galleryText}</p>

  <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4 md:gap-5">
  {galleryPhotos.map((photo, index) => (
    <motion.button
      key={photo.src}
      type="button"
      onClick={() => setSelectedPhoto(photo.src)}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: index * 0.04,
      }}
      aria-label={`Abrir fotografia ${index + 1}`}
      className={`group relative cursor-zoom-in overflow-hidden rounded-[1.7rem] bg-[#edf4f8] shadow-[0_18px_50px_rgba(25,50,70,0.12)] ${photo.size}`}
    >
      <img
        src={photo.src}
        alt={`Sofia e Tomé — fotografia ${index + 1}`}
        style={{ objectPosition: photo.position }}
        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 flex translate-y-4 items-center justify-between p-5 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="text-xs font-medium uppercase tracking-[0.22em] text-white">
          Ver fotografia
        </span>

        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-md">
          +
        </span>
      </div>
    </motion.button>
  ))}
</div>
        </div>
      </section>
{selectedPhoto && (
  <div
    role="dialog"
    aria-modal="true"
    aria-label="Fotografia ampliada"
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
    onClick={() => setSelectedPhoto(null)}
  >
    <button
      type="button"
      onClick={() => setSelectedPhoto(null)}
      aria-label="Fechar fotografia"
      className="absolute right-5 top-5 z-10 rounded-full border border-white/30 bg-black/40 p-3 text-white transition hover:bg-white hover:text-black"
    >
      <X size={24} />
    </button>

    <a
      href={selectedPhoto}
      download
      onClick={(event) => event.stopPropagation()}
      className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#142536] shadow-xl transition hover:bg-[#dcecf8]"
    >
      <Download size={17} />
      Guardar
    </a>

    <img
      src={selectedPhoto}
      alt="Fotografia ampliada de Sofia e Tomé"
      onClick={(event) => event.stopPropagation()}
      className="max-h-[88vh] max-w-[94vw] rounded-2xl object-contain shadow-2xl"
    />
  </div>
)}

      <section id="faq" className="bg-[#f3f8fc] px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="Useful information" title={t.faqTitle} />
          <div className="space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.ptQ}
                className="group rounded-2xl border border-[#d7e4ee] bg-white px-6 py-5"
              >
                <summary className="cursor-pointer list-none font-medium text-[#23394d]">
                  <div className="flex items-center justify-between gap-4">
                    <span>{language === "pt" ? item.ptQ : item.enQ}</span>
                    <span className="text-[#769abb] transition group-open:rotate-45">+</span>
                  </div>
                </summary>
                <p className="mt-4 border-t border-[#e3edf4] pt-4 text-sm leading-7 text-[#637586]">
                  {language === "pt" ? item.ptA : item.enA}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Support" title={t.contactTitle} />
          <div className="grid gap-5 md:grid-cols-2 max-w-3xl mx-auto">
            {[
              [Phone, "Telefone", "+351 962 862 089"],
  [Phone, "WhatsApp", "+351 962 862 089"],
            ].map(([Icon, title, value]) => {
              const ContactIcon = Icon as typeof Phone;
              return (
                <div
                  key={String(title)}
                  className="rounded-[1.7rem] border border-[#dbe7f0] bg-white p-7 text-center shadow-[0_16px_45px_rgba(37,66,92,.06)]"
                >
                  <ContactIcon className="mx-auto text-[#779cbb]" strokeWidth={1.5} />
                  <h3 className="mt-5 font-serif text-2xl text-[#1e3448]">
                    {String(title)}
                  </h3>
                  <p className="mt-2 text-sm text-[#657788]">{String(value)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#08131F] py-24 text-center text-white">

<div className="max-w-4xl mx-auto px-6">

<h2 className="font-serif text-6xl mb-8">

Sofia
<span className="text-[#AFCFEA]"> & </span>
Tomé

</h2>

<p className="uppercase tracking-[0.45em] text-sm text-white/50 mb-10">

17 OUTUBRO 2026

</p>

<div className="w-24 h-px bg-white/20 mx-auto mb-10"/>

<p className="italic text-white/70 text-lg leading-8">

"Assim já não são dois,
mas uma só carne."

</p>

<p className="mt-3 text-white/40 tracking-[0.3em] uppercase text-xs">

Mateus 19:6

</p>

</div>

</footer>
    </main>
  );
}
