const handleError = require("./handleError");
// https://jasonwatmore.com/post/2020/07/22/nodejs-express-api-request-schema-validation-with-joi
module.exports = function (req, res, next, schema, element = "body") {
  const options = {
    convert: false,
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req[element], options);

  if (error)
    return handleError(
      res,
      `Validation error: ${error.details.map((x) => x.message).join(", ")}`.replace(/\"/g, "'")
    );

  req[element] = value;
  next();
};
