const errorHandler = (err, req, res, next) => {
  console.error(err);
  r_body = { error: err.message || "Server Error" };
  if (err.details) {
    const formattedDetails = err.details.map((detail) =>
      detail.replace(/"/g, "")
    );
    r_body["details"] = formattedDetails;
  }
  res.status(err.status || 500).json(r_body);
};

module.exports = errorHandler;
