const { getConnection } = require("../../db");
const { uploadImage } = require("../../helpers");

async function addProductPhoto(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;
    const maxEntryPhotos = Number(process.env.MAX_ENTRY_PHOTOS);

    const [currentPhotos] = await connection.query(
      `
        SELECT *
        FROM product_imgs
        WHERE id_product =?`,
      [id]
    );

    if (currentPhotos.length === maxEntryPhotos)
      throw new Error(
        `El producto ha alcanzado el número máximo de fotos (${maxEntryPhotos}). Para subir una nueva foto debes borrar otra antes`
      );

    let savedPhotoName;
    if (req.files && req.files.photo) {
      savedPhotoName = await uploadImage({
        file: req.files.photo,
        directory: "photos",
      });
    } else {
      throw new Error("No has subido ninguna foto");
    }

    const [result] = await connection.query(
      `
    INSERT INTO product_imgs(img, id_product)
    VALUES (?,?)`,
      [savedPhotoName, id]
    );

    res.send({
      status: "OK",
      message: `Se ha añadido una nueva foto al producto con id ${id}`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { addProductPhoto };
