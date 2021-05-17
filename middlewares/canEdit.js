const { getConnection } = require("../db");

async function canEdit(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

    //HACEMOS LOS PROCESOS NECESARIOS

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { canEdit };
