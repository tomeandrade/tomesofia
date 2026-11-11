
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Play,
  X,
} from "lucide-react";


type Photo = {
  filename: string;
  src: string;
  optimizedSrc: string;
  categoryId: string;
};

type Category = {
  id: string;
  name: string;
  photos: Photo[];
};

const PHOTOS_PER_PAGE = 20;

const HERO_IMAGE = "/gallery-optimized/03-igreja/photo%20(267).webp";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState("01-pre-wedding");
  const [pageByCategory, setPageByCategory] = useState<Record<string, number>>({});
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/gallery-manifest.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Não foi possível carregar a galeria.");
        }
        return response.json();
      })
      .then((data: Category[]) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const activeCategory = useMemo(
    () => categories.find((category) => category.id === activeCategoryId),
    [categories, activeCategoryId]
  );

  const photos = activeCategory?.photos ?? [];
  const currentPage = pageByCategory[activeCategoryId] ?? 1;
  const totalPages = Math.max(1, Math.ceil(photos.length / PHOTOS_PER_PAGE));
  const firstPhotoIndex = (currentPage - 1) * PHOTOS_PER_PAGE;
  const visiblePhotos = photos.slice(
    firstPhotoIndex,
    firstPhotoIndex + PHOTOS_PER_PAGE
  );

  const selectedPhoto =
    selectedIndex !== null ? photos[selectedIndex] : null;

  function changePage(page: number) {
    const safePage = Math.min(Math.max(page, 1), totalPages);

    setPageByCategory((previous) => ({
      ...previous,
      [activeCategoryId]: safePage,
    }));

    setSelectedIndex(null);
    document.getElementById("gallery")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  function openPhoto(index: number) {
    setSelectedIndex(index);
  }

  function closePhoto() {
    setSelectedIndex(null);
  }

  function previousPhoto() {
    setSelectedIndex((index) =>
      index === null ? null : (index - 1 + photos.length) % photos.length
    );
  }

  function nextPhoto() {
    setSelectedIndex((index) =>
      index === null ? null : (index + 1) % photos.length
    );
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (selectedIndex === null) return;

      if (event.key === "Escape") closePhoto();
      if (event.key === "ArrowLeft") previousPhoto();
      if (event.key === "ArrowRight") nextPhoto();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, photos.length]);

  const totalPhotos = categories.reduce(
    (total, category) => total + category.photos.length,
    0
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#071522] text-[#f4efe7]">
      {/* ENTRADA CINEMATOGRÁFICA */}
      <section className="relative flex min-h-[90svh] items-center justify-center overflow-hidden md:min-h-screen">
        <img
          src={HERO_IMAGE}
          alt="Sofia e Tomé no dia do casamento"
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#071522]/35 via-[#071522]/35 to-[#071522]" />

        <div className="absolute inset-0 bg-[#071522]/20" />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-20 pt-24 text-center">
          <p className="mb-7 text-[10px] uppercase tracking-[0.45em] text-[#e2cba8] sm:text-xs">
            A nossa história · 17 Outubro 2026
          </p>

          <h1 className="font-serif text-6xl font-light tracking-wide text-white sm:text-8xl md:text-9xl">
            Sofia <span className="text-[#d3b78e]">&</span> Tomé
          </h1>

          <div className="my-8 h-px w-20 bg-[#d3b78e]/80" />

          <p className="max-w-md text-sm font-light leading-7 tracking-[0.12em] text-white/90 sm:text-base">
            Um dia, uma história, mil memórias.
          </p>

          <a
            href="#filme"
            className="mt-14 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/75 transition hover:text-[#e2cba8]"
          >
            Descobrir as nossas memórias
            <ArrowDown size={17} strokeWidth={1} />
          </a>
        </div>

        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-[#071522] to-transparent" />
      </section>

      {/* FILME */}
     
<section
  id="filme"
  className="mx-auto max-w-6xl scroll-mt-10 px-5 py-24 sm:px-8 md:py-32"
>
  <div className="mb-12 text-center">
    <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-[#c8ad83]">
      Uma recordação para sempre
    </p>

    <h2 className="font-serif text-4xl font-light sm:text-6xl">
      O Nosso Filme
    </h2>

    <p className="mt-4 font-serif text-xl italic text-[#c8ad83] sm:text-2xl">
      Até ao Fim
    </p>
  </div>

  <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/30">
    <div className="aspect-video w-full">
      <iframe
        className="h-full w-full"
        src="https://www.youtube.com/embed/DA3Piw8Dq2M"
        title="Sofia e Tomé — Até ao Fim"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  </div>
</section>


      {/* GALERIA */}
      <section
        id="gallery"
        className="mx-auto max-w-7xl scroll-mt-8 px-5 pb-28 pt-12 sm:px-8"
      >
        <div className="mb-14 text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-[#c8ad83]">
            Instantes que ficam
          </p>

          <h2 className="font-serif text-4xl font-light sm:text-6xl">
            Os Nossos Momentos
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/55">
            Cada fotografia guarda um bocadinho da nossa história.
            Obrigado por fazeres parte dela.
          </p>
        </div>

        {/* CATEGORIAS */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategoryId(category.id);
                setSelectedIndex(null);
              }}
              className={`rounded-full border px-4 py-2.5 text-xs tracking-wide transition sm:px-5 ${
                activeCategoryId === category.id
                  ? "border-[#c8ad83] bg-[#c8ad83] text-[#071522]"
                  : "border-white/15 bg-white/[0.03] text-white/70 hover:border-[#c8ad83]/60 hover:text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-24 text-center text-sm text-white/60">
            A preparar as nossas fotografias...
          </div>
        ) : !activeCategory ? (
          <div className="py-24 text-center text-sm text-white/60">
            Não foi possível carregar a galeria.
          </div>
        ) : (
          <>
            {/* INFORMAÇÃO DA CATEGORIA */}
            <div className="mb-7 flex flex-col justify-between gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end">
              <div>
                <h3 className="font-serif text-3xl font-light">
                  {activeCategory.name}
                </h3>
                <p className="mt-2 text-xs text-white/45">
                  {photos.length} fotografias
                </p>
              </div>

              <p className="text-xs text-white/55">
                A mostrar {photos.length === 0 ? 0 : firstPhotoIndex + 1}–
                {Math.min(firstPhotoIndex + PHOTOS_PER_PAGE, photos.length)} de{" "}
                {photos.length} fotografias
              </p>
            </div>

            {/* FOTOGRAFIAS */}
            {visiblePhotos.length === 0 ? (
              <p className="py-20 text-center text-white/50">
                Ainda não existem fotografias nesta categoria.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                {visiblePhotos.map((photo, index) => (
                  <button
                    key={`${photo.categoryId}-${photo.filename}`}
                    onClick={() => openPhoto(firstPhotoIndex + index)}
                    className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-[#102638] text-left"
                    aria-label={`Ver fotografia ${photo.filename}`}
                  >
                    
<img
  src={photo.optimizedSrc}
  alt={`${activeCategory.name} — ${photo.filename}`}
  loading="lazy"
  decoding="async"
  fetchPriority="low"
  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
/>


                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-60 transition group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            )}

            {/* PAGINAÇÃO */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-xs text-white/75 transition hover:border-[#c8ad83] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronLeft size={15} />
                  Anterior
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => changePage(page)}
                      className={`h-10 min-w-10 rounded-full border px-3 text-xs transition ${
                        currentPage === page
                          ? "border-[#c8ad83] bg-[#c8ad83] text-[#071522]"
                          : "border-white/15 text-white/70 hover:border-[#c8ad83]"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-xs text-white/75 transition hover:border-[#c8ad83] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Seguinte
                  <ChevronRight size={15} />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* RODAPÉ */}
      <footer className="border-t border-white/10 px-6 py-14 text-center">
        <p className="font-serif text-3xl font-light">
          Sofia <span className="text-[#c8ad83]">&</span> Tomé
        </p>

        <p className="mt-5 text-xs leading-6 text-white/45">
          Obrigado por fazeres parte deste capítulo tão especial das nossas vidas.
        </p>

        <p className="mt-8 text-[9px] uppercase tracking-[0.35em] text-[#c8ad83]/70">
          Com carinho · 17 Outubro 2026
        </p>
      </footer>

      {/* FOTOGRAFIA AMPLIADA */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#02080e]/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Fotografia ampliada"
          onClick={closePhoto}
        >
          <button
            onClick={closePhoto}
            className="absolute right-5 top-5 z-20 rounded-full border border-white/20 bg-black/40 p-3 text-white transition hover:border-[#c8ad83]"
            aria-label="Fechar fotografia"
          >
            <X size={20} />
          </button>

          <button
            onClick={(event) => {
              event.stopPropagation();
              previousPhoto();
            }}
            className="absolute left-2 z-20 rounded-full border border-white/20 bg-black/40 p-3 text-white transition hover:border-[#c8ad83] sm:left-6"
            aria-label="Fotografia anterior"
          >
            <ChevronLeft size={23} />
          </button>

          <div
            className="flex max-h-full max-w-6xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedPhoto.optimizedSrc}
              alt={selectedPhoto.filename}
              className="max-h-[78vh] max-w-full rounded-lg object-contain"
            />

            <div className="mt-5 flex flex-wrap items-center justify-center gap-5">
              <span className="text-xs text-white/60">
                {selectedPhoto.filename}
              </span>

              <a
                href={
  selectedPhoto.categoryId === "01-pre-wedding"
    ? selectedPhoto.src
    : `https://pub-cd52b277e7b74c209a0fc53667c3ba30.r2.dev/${encodeURIComponent(
        selectedPhoto.categoryId === "02-hotel" ? "hotel" :
        selectedPhoto.categoryId === "03-igreja" ? "igreja" :
        selectedPhoto.categoryId === "04-noivos-e-familia" ? "noivos & familia" :
        selectedPhoto.categoryId === "05-celebracao" ? "celebracao" :
        selectedPhoto.categoryId === "06-brinde" ? "brinde" :
        selectedPhoto.categoryId === "07-bouque" ? "buque" : ""
      )}/${encodeURIComponent(selectedPhoto.filename)}`
}
                download={selectedPhoto.filename}
                className="flex items-center gap-2 rounded-full border border-[#c8ad83]/50 px-4 py-2 text-xs text-[#e2cba8] transition hover:bg-[#c8ad83] hover:text-[#071522]"
              >
                <Download size={15} />
                Descarregar original
              </a>
            </div>
          </div>

          <button
            onClick={(event) => {
              event.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-2 z-20 rounded-full border border-white/20 bg-black/40 p-3 text-white transition hover:border-[#c8ad83] sm:right-6"
            aria-label="Fotografia seguinte"
          >
            <ChevronRight size={23} />
          </button>
        </div>
      )}
    </main>
  );
}
