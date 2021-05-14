const path = require("path");
const fs = require("fs").promises;
const sharp = require("sharp");
const uuid = require("uuid");

const uploadsDir = path.join(__dirname, process.env.UPLOADS_DIR);

async function uploadImage({ file, directory }) {
  const targetDir = path.join(uploadsDir, directory);

  await fs.mkdir(targetDir, { recursive: true });

  const image = sharp(file.data);

  const infoPicture = await image.metadata();
  if (infoPicture.width > 1000) {
    image.resize(1000);
  }

  const filename = `${uuid.v4()}.jpg`;
  await image.toFile(path.join(targetDir, filename));

  return filename;
}

module.exports = {uploadImage}
