
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const galleryDirectory = path.join(
  process.cwd(),
  "public",
  "gallery"
);

const outputDirectory = path.join(
  process.cwd(),
  "public",
  "gallery-optimized"
);

const categories = [
  "01-pre-wedding",
  "02-hotel",
  "03-igreja",
  "04-noivos-e-familia",
  "05-celebracao",
  "06-brinde",
  "07-bouque",
];

const extensions = [".jpg", ".jpeg"];

async function optimizeGallery() {
  fs.mkdirSync(outputDirectory, { recursive: true });

  for (const category of categories) {
    const sourceFolder = path.join(galleryDirectory, category);
    const destinationFolder = path.join(outputDirectory, category);

    fs.mkdirSync(destinationFolder, { recursive: true });

    const files = fs.readdirSync(sourceFolder).filter((file) =>
      extensions.includes(path.extname(file).toLowerCase())
    );

    console.log(`\n${category}: ${files.length} fotografias`);

    for (let i = 0; i < files.length; i++) {
      const filename = files[i];
      const source = path.join(sourceFolder, filename);
      const destination = path.join(
        destinationFolder,
        `${path.parse(filename).name}.webp`
      );

      if (fs.existsSync(destination)) {
        continue;
      }

      await sharp(source)
        .rotate()
        .resize({
          width: 1200,
          height: 1500,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 78 })
        .toFile(destination);

      console.log(`  ${i + 1}/${files.length} concluída`);
    }
  }

  console.log("\nOtimização concluída!");
}

optimizeGallery().catch((error) => {
  console.error("Erro na otimização:", error);
  process.exitCode = 1;
});
