const { getConnection } = require("../../db");

async function sendVote(req, res, next) {
  let connection;
  try {
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
