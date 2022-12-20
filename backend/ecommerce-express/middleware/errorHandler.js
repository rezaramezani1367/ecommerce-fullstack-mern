const ErrorResponse = require("../utils/errorResponse");
var url = require("url");
const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    console.log({ err });
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
    error = new ErrorResponse(message, 400);
  }

  var url_parts = url.parse(req.url);
  // console.log(url_parts.pathname.includes("/api/v1/products/"));
  /* if (false) {
    // console.log(url_parts.pathname);
    // add more check...
    req.flash("success1", error.message);

    req.flash("form", req.body);

    res.redirect("back");
  } else {*/
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
  // }
};

module.exports = errorHandler;
