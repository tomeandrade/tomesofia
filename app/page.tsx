"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Music,
  Camera,
  Users,
  Car,
  Phone,
  ChevronDown,
  Heart,
} from 'lucide-react';

export default function LuxuryWeddingWebsite() {
  const weddingDate = new Date('2026-10-17T14:00:00');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [language, setLanguage] = useState('pt');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const faq = [
    {
      q: 'Existe estacionamento? / Is parking available?',
      a: 'Sim, existirá estacionamento disponível na quinta.',
    },
    {
      q: 'Qual é o dress code? / What is the dress code?',
      a: 'Clássico, elegante e premium.',
    },
    {
      q: 'Posso levar acompanhante? / Can I bring a guest?',
      a: 'Por favor consulte o seu convite individual.',
    },
    {
      q: 'Até quando confirmar presença? / RSVP deadline?',
      a: '1 Setembro 2026.',
    },
  ];

  return (
    <div className="bg-white text-black min-h-screen overflow-x-hidden font-sans">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-serif text-2xl tracking-wide">
            Tome & Sofia
          </div>

          <div className="hidden md:flex gap-8 text-sm uppercase tracking-wider">
            <a href="#info">Info</a>
            <a href="#schedule">Programação</a>
            <a href="#rsvp">RSVP</a>
            <a href="#gallery">Galeria</a>
            <a href="#faq">FAQ</a>
          </div>

          <button
            onClick={() =>
              setLanguage(language === 'pt' ? 'en' : 'pt')
            }
            className="px-4 py-2 border rounded-full text-sm"
          >
            {language === 'pt' ? 'EN' : 'PT'}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-center px-6"
        >
          <p className="uppercase tracking-[0.4em] text-sm text-slate-500 mb-8 max-w-4xl mx-auto leading-relaxed">
  “Buscai primeiro o reino de Deus, e a sua justiça,
  <br />
  e todas estas coisas vos serão acrescentadas.”
  <br />
  Mateus 6:33
</p>

          <h1 className="font-serif text-6xl md:text-8xl mb-6 leading-none">
            Tome
            <span className="mx-4 text-slate-400">&</span>
            Sofia
          </h1>

          <p className="text-xl text-slate-600 mb-10">
            17 Outubro 2026 • Loures & Mafra
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-14">
            <a
              href="#rsvp"
              className="px-8 py-4 bg-black text-white rounded-full hover:scale-105 transition"
            >
              RSVP
            </a>

            <a
              href="#info"
              className="px-8 py-4 border border-black rounded-full hover:bg-black hover:text-white transition"
            >
              Ver Informações
            </a>
          </div>

          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              ['Dias', timeLeft.days],
              ['Horas', timeLeft.hours],
              ['Min', timeLeft.minutes],
              ['Seg', timeLeft.seconds],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white"
              >
                <div className="text-3xl font-bold">{value}</div>
                <div className="text-sm text-slate-500 uppercase tracking-widest mt-2">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="absolute bottom-10 animate-bounce">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* INFO */}
      <section id="info" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="uppercase tracking-[0.3em] text-slate-400 mb-4">
              Wedding Information
            </p>
            <h2 className="font-serif text-5xl">Informações Gerais</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-slate-50 rounded-[40px] p-10 border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <MapPin />
                <h3 className="text-3xl font-serif">Cerimónia</h3>
              </div>

              <p className="text-lg mb-3">Igreja em Loures</p>
              <p className="text-slate-600 mb-6">
                17 Outubro 2026 • 14:00
              </p>

              <a
                href="https://maps.google.com"
                className="inline-block px-6 py-3 bg-black text-white rounded-full"
              >
                Abrir Google Maps
              </a>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-slate-50 rounded-[40px] p-10 border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <Heart />
                <h3 className="text-3xl font-serif">Receção</h3>
              </div>

              <p className="text-lg mb-3">Quinta em Mafra</p>
              <p className="text-slate-600 mb-6">
                Cocktail, jantar e festa premium.
              </p>

              <a
                href="https://maps.google.com"
                className="inline-block px-6 py-3 bg-black text-white rounded-full"
              >
                Abrir Google Maps
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="py-28 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="uppercase tracking-[0.3em] text-slate-400 mb-4">
              Wedding Schedule
            </p>
            <h2 className="font-serif text-5xl">Programação</h2>
          </div>

          <div className="space-y-6">
            {[
              ['13:00', 'Receção dos convidados'],
              ['14:00', 'Cerimónia'],
              ['15:30', 'Cocktail & Fotografias'],
              ['17:00', 'Jantar Premium'],
              ['19:00', 'Discursos'],
              ['20:00', 'Festa'],
              ['22:00', 'Corte do Bolo'],
            ].map(([hour, text]) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={hour}
                className="flex justify-between items-center bg-white rounded-3xl p-8 border border-slate-100 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <Clock />
                  <span className="text-2xl font-semibold">{hour}</span>
                </div>

                <div className="text-slate-600">{text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="py-28 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-slate-500 mb-4">
            RSVP
          </p>

          <h2 className="font-serif text-5xl mb-6">
            Confirmação de Presença
          </h2>

          <p className="text-slate-400 mb-16">
            Por favor confirme a sua presença até 1 Setembro 2026.
          </p>

          <form className="grid gap-5 text-left">
            <input
              className="p-5 rounded-2xl bg-slate-900 border border-slate-700"
              placeholder="Nome Completo"
            />

            <input
              className="p-5 rounded-2xl bg-slate-900 border border-slate-700"
              placeholder="Email"
            />

            <input
              className="p-5 rounded-2xl bg-slate-900 border border-slate-700"
              placeholder="Telefone"
            />

            <select className="p-5 rounded-2xl bg-slate-900 border border-slate-700">
              <option>Vai comparecer?</option>
              <option>Sim</option>
              <option>Não</option>
            </select>

            <textarea
              rows={5}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-700"
              placeholder="Restrições alimentares ou mensagem"
            />

            <button className="mt-4 py-5 bg-white text-black rounded-2xl font-semibold hover:scale-[1.02] transition">
              Confirmar RSVP
            </button>
          </form>
        </div>
      </section>

      {/* TABLES */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Users className="mx-auto mb-6" size={40} />

          <h2 className="font-serif text-5xl mb-6">
            Organização das Mesas
          </h2>

          <p className="text-slate-600 mb-12">
            Pesquise o seu nome para encontrar a sua mesa.
          </p>

          <div className="bg-slate-50 rounded-[40px] p-10 border border-slate-100 shadow-sm">
            <input
              className="w-full p-6 rounded-2xl border border-slate-200"
              placeholder="Pesquisar nome"
            />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-28 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <Camera className="mx-auto mb-6" size={40} />

          <h2 className="font-serif text-5xl mb-6">Galeria</h2>

          <p className="text-slate-600 max-w-2xl mx-auto mb-16">
            Partilhe os seus momentos favoritos connosco.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                whileHover={{ scale: 1.03 }}
                key={i}
                className="aspect-square rounded-[30px] bg-white border border-slate-200 shadow-sm"
              />
            ))}
          </div>

          <div className="inline-block bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
            <p className="text-lg mb-6 font-medium">
              Scan QR Code to Upload Photos
            </p>

            <div className="w-52 h-52 rounded-3xl bg-slate-100 flex items-center justify-center mx-auto border border-slate-200">
              QR CODE
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPORT */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <Car className="mx-auto mb-6" size={40} />

          <h2 className="font-serif text-5xl mb-16">Transporte</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              'Estacionamento',
              'Uber & Bolt',
              'Transportes',
            ].map((item) => (
              <div
                key={item}
                className="bg-slate-50 rounded-[40px] p-10 border border-slate-100"
              >
                <h3 className="text-2xl font-serif mb-4">{item}</h3>

                <p className="text-slate-600">
                  Mais informações em breve.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-28 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto text-center">
          <Music className="mx-auto mb-6" size={40} />

          <h2 className="font-serif text-5xl mb-16">
            Equipa & Pessoas‑Chave
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              'Wedding Planner',
              'Fotógrafo',
              'DJ',
              'Coordenação',
            ].map((person) => (
              <div
                key={person}
                className="bg-slate-900 rounded-[40px] p-8 border border-slate-800"
              >
                <div className="w-24 h-24 rounded-full bg-slate-700 mx-auto mb-6" />

                <h3 className="text-xl mb-2">{person}</h3>

                <p className="text-slate-400">Nome & Contacto</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-28 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl mb-4">FAQ</h2>
          </div>

          <div className="space-y-6">
            {faq.map((item) => (
              <details
                key={item.q}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm"
              >
                <summary className="cursor-pointer text-lg font-medium">
                  {item.q}
                </summary>

                <p className="mt-4 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <Phone className="mx-auto mb-6" size={40} />

          <h2 className="font-serif text-5xl mb-16">
            Contactos de Emergência
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              'Coordenação do Evento',
              'Transporte',
              'Apoio Convidados',
            ].map((item) => (
              <div
                key={item}
                className="bg-slate-50 rounded-[40px] p-10 border border-slate-100"
              >
                <h3 className="text-xl font-medium mb-4">{item}</h3>
                <p className="text-slate-600">+351 XXX XXX XXX</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6 bg-black text-white text-center">
        <h3 className="font-serif text-4xl mb-6">Tome & Sofia</h3>

        <p className="text-slate-400 mb-2">17 Outubro 2026</p>

        <p className="text-slate-500 leading-relaxed">
          “Assim, eles já não são dois, mas sim uma só carne.”
          <br />
          Mateus 19:6
        </p>
      </footer>
    </div>
  );
}