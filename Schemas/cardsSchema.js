const Joi = require("joi");
const { tagNameSchema, url, youtubeURL } = require("./commonSchemas");
const validateRequest = require("../Utils/validateRequest");

const typesPrueba = ["video", "images", "text"];
const pruebaSchema = Joi.object({
  types: Joi.array()
    .items(
      Joi.string()
        .valid(...typesPrueba)
        .lowercase()
    )
    .unique()
    .required()
    .min(1),
  video: Joi.object({
    url: Joi.string().required(),
    type: Joi.string().valid("direct", "youtube").required(),
  }),
  images: Joi.array().items(url).min(1),
  text: Joi.string(),
})
  .required()
  .custom((v, { error }) => {
    if (v.types.includes("video") && !v.video)
      throw new Error("if 'video' is in 'types' array, 'video' must be used");

    // Revisar que la URL sea del tipo que dice
    if (v.types.includes("video")) {
      const urlSchema = v.video.type === "direct" ? url : youtubeURL;
      const err = urlSchema.validate(v.video.url).error;
      if (err) return error(err);
    }

    if (v.types.includes("images") && !v.images)
      throw new Error("if 'images' is in 'types' array, 'images' must be used");

    if (v.types.includes("text") && !v.text) throw new Error("if 'text' is in 'types' array, 'text' must be used");

    for (let typePrueba of typesPrueba)
      if (!v.types.includes(typePrueba) && v[typePrueba] !== undefined)
        throw new Error(`if '${typePrueba}' is used, it must be specified inside 'types'`);

    return v;
  });

const postCreateCard = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().default(""),
    tags: Joi.array().items(tagNameSchema).default([]),
    prueba: pruebaSchema,
    site: url,
    image: url,
  });
  const testResult = validateRequest(req, res, next, schema);

  if (next === undefined) return testResult;
};

module.exports = {
  postCreateCard,
};
