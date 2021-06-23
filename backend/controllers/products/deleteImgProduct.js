const { getConnection } = require("../../db");
const { deleteImage } = require("../../helpers");

async function deleteImgProduct(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id, imgId } = req.params;

    const [img] = await connection.query(
      `
    SELECT img
    FROM product_imgs
    WHERE id=? AND id_product=?`,
      [imgId, id]
    );

    if (img.length < 1)
      throw new Error(
        `La imagen con id ${imgId} no existe o no está asociada al producto con id ${id}`
      );

    const [result] = await connection.query(
      `
        DELETE FROM product_imgs
        WHERE id=? AND id_product=?`,
      [imgId, id]
    );

    await deleteImage({
      directory: "imgs",
      file: img[0].img,
    });

    res.send({
      status: "OK",
      message: `La imagen con id ${imgId} ha sido eliminada con éxito`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { deleteImgProduct };
