const { getConnection } = require("./db");
const path = require("path");
const fs = require("fs").promises;
const sharp = require("sharp");
const uuid = require("uuid");
const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(process.env.APIKEY);

async function sendMail({to, subject, message}) {
  try {
    const msg = {
      to: to,
      from: process.env.SEND_FROM,
      subject: subject,
      text: message,
    };
    await sendgrid.send(msg);
  } catch (error) {
    console.error(error.message);
  }
}

//path de subida de imagenes
const uploadsDir = path.join(__dirname, process.env.UPLOADS_DIR);

async function uploadImage({ file, directory }) {
  //subdirectorio subida imagenes siguiendo del path anterior
  const targetDir = path.join(uploadsDir, directory);
  //aseguramos que el directorio existe
  await fs.mkdir(targetDir, { recursive: true });
  //cargamos img en sharp
  const image = sharp(file.data);
  //sacamos info de la img
  const infoImage = await image.metadata();
  //redimension de img si tiene ancho mayor a 1000px
  if (infoImage.width > 1000) {
    image.resize(1000);
  }
  //creamos nombre para la img
  const filename = `${uuid.v4()}.jpg`;
  //guardamos img en el directorio
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
    SELECT * 
    FROM ${table}
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



async function entryExistsPrueba(table, id) {
  let connection;
  try {
    connection = await getConnection();
    let result;

    const [query] = await connection.query(
      `
    SELECT * 
    FROM ${table}
    WHERE id=?`,
      [id]
    );

    result = query[0];
    if (query.length < 1) result = false;

    return result;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { uploadImage, entryExists, deleteImage, sendMail, entryExistsPrueba };
