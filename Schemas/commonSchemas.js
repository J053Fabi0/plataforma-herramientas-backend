const Joi = require("joi");
const { isURL } = require("validator");

const ID_schema = Joi.string().hex().case("lower").length(24);
const tagNameSchema = Joi.string().min(2);
const url = Joi.string().custom((v) => {
  if (!isURL(v)) throw new Error("the url is not an url");
  return v;
});
const youtubeURL = Joi.string().regex(
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
);

module.exports = {
  ID_schema,
  tagNameSchema,
  url,
  youtubeURL,
};
