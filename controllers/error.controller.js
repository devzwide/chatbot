export const endPointNotFound = (req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
};

export const internalServerError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
};
