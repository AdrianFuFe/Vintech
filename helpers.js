const path = require("path");
const fs = require("fs").promises;
const sharp = require("sharp");
const uuid = require("uuid");
const { getConnection } = require("./db");

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

async function deleteImage({ directory, file }) {
  const imagePath = path.join(uploadsDir, directory, file);

  await fs.unlink(imagePath);
}

async function entryExists(table, id) {
  let connection;
  try {
    connection = await getConnection();
    let result;

    const [query] = await connection.query(
      `
    SELECT * FROM ${table}
    WHERE id=?`,
      [id]
    );

    if (query.length < 1) {
      result = false;
    } else {
      result = true;
    }

    return result;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { uploadImage, entryExists, deleteImage };
