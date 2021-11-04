module.exports = (res, err, code = 400) => {
  console.log("Handled error:", err);
  res.status(code).send({ message: err?.message || err });
};
