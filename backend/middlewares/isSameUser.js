async function isSameUser(req, res, next) {
  try {
    const { id } = req.params;
    if (req.auth.id !== Number(id))
      throw new Error(
        `No tienes permiso para realizar esa acción sobre el id ${id}`
      );

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { isSameUser };
