async function validAuth(req, res, next) {
  try {
    console.log("validAuth sen código");
    next();
  } catch (error) {
    next(error);
  } finally {
    console.log("acaba validAuth");
  }
}

module.exports = { validAuth };
