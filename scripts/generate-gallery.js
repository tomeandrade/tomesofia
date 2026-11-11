
const fs = require("fs");
const path = require("path");

const galleryDirectory = path.join(
  process.cwd(),
  "public",
  "gallery"
);

const outputFile = path.join(
  process.cwd(),
  "public",
  "gallery-manifest.json"
);

const categories = [
  { id: "01-pre-wedding", name: "Pre-Wedding" },
  { id: "02-hotel", name: "Hotel" },
  { id: "03-igreja", name: "Igreja" },
  { id: "04-noivos-e-familia", name: "Noivos e Família" },
  { id: "05-celebracao", name: "Celebração" },
  { id: "06-brinde", name: "Brinde" },
  { id: "07-bouque", name: "Buquê" },
];

const imageExtensions = [".jpg", ".jpeg"];

function getImages(categoryId) {
  const categoryPath = path.join(
    galleryDirectory,
    categoryId
  );

  if (!fs.existsSync(categoryPath)) {
    console.warn(`Pasta não encontrada: ${categoryId}`);
    return [];
  }

  return fs
    .readdirSync(categoryPath, { withFileTypes: true })
    .filter((file) => {
      return (
        file.isFile() &&
        imageExtensions.includes(
          path.extname(file.name).toLowerCase()
        )
      );
    })
    
.map((file) => ({
  filename: file.name,
  src: `/gallery/${categoryId}/${encodeURIComponent(file.name)}`,
  optimizedSrc: `/gallery-optimized/${categoryId}/${encodeURIComponent(file.name.replace(/\.(jpe?g)$/i, ".webp"))}`,
  categoryId,
}))

    .sort((a, b) =>
      a.filename.localeCompare(b.filename, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    );
}

const gallery = categories.map((category) => ({
  id: category.id,
  name: category.name,
  photos: getImages(category.id),
}));

const totalPhotos = gallery.reduce(
  (total, category) => total + category.photos.length,
  0
);

fs.writeFileSync(
  outputFile,
  JSON.stringify(gallery, null, 2),
  "utf8"
);

console.log("--------------------------------");
console.log("GALERIA GERADA COM SUCESSO");
console.log("--------------------------------");

gallery.forEach((category) => {
  console.log(
    `${category.name}: ${category.photos.length} fotografias`
  );
});

console.log("--------------------------------");
console.log(`TOTAL: ${totalPhotos} fotografias`);
console.log("--------------------------------");
