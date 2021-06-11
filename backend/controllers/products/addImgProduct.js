const { getConnection } = require("../../db");
const { uploadImage, entryExists } = require("../../helpers");

async function addImgProduct(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;
    const maxEntryImgs = Number(process.env.MAX_ENTRY_IMGS);

    if ((await entryExists("products", id)) === false)
      throw new Error(`El producto con id ${id} no existe`);

    const [currentImgs] = await connection.query(
      `
        SELECT *
        FROM product_imgs
        WHERE id_product =?`,
      [id]
    );

    if (currentImgs.length === maxEntryImgs)
      throw new Error(
        `El producto ha alcanzado el número máximo de imágenes (${maxEntryImgs}). Para subir una nueva imagen debes borrar otra antes`
      );

    let savedImgName;
    if (req.files && req.files.img) {
      savedImgName = await uploadImage({
        file: req.files.img,
        directory: "imgs",
      });
    } else {
      throw new Error("No has subido ninguna imagen");
    }

    const [result] = await connection.query(
      `
    INSERT INTO product_imgs(img, id_product)
    VALUES (?,?)`,
      [savedImgName, id]
    );

    res.send({
      status: "OK",
      message: `Se ha añadido una nueva imagen al producto con id ${id}`,
      id: result.insertId,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { addImgProduct };
