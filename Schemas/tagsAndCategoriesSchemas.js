const Joi = require("joi");
const validateRequest = require("../Utils/validateRequest");

const tagNameSchema = Joi.string().max(13).required();
const categoryNameSchema = Joi.string().max(13).required();
const ID_schema = Joi.string().hex().case("lower").length(24);

const postCreateCategory = (req, res, next) => {
  const schema = Joi.object({
    name: categoryNameSchema,
    tags: Joi.array().items(tagNameSchema).min(1).required(),
  });
  validateRequest(req, res, next, schema);
};

const postCreateTag = (req, res, next) => {
  const schema = Joi.object({
    name: tagNameSchema,
    category: ID_schema.required(),
  });
  validateRequest(req, res, next, schema);
};

const deleteCategory = (req, res, next) => {
  const schema = Joi.object({ id: ID_schema });
  validateRequest(req, res, next, schema);
};

const deleteTag = (req, res, next) => {
  const schema = Joi.object({ id: ID_schema });
  validateRequest(req, res, next, schema);
};

// Si se añaden datos al modelo de categorías, se deben añadir al "or()".
const updateCategory = (req, res, next) => {
  const schema = Joi.object({
    name: categoryNameSchema,
    id: ID_schema.required(),
  }).or("name");
  validateRequest(req, res, next, schema);
};

// Si se añaden datos al modelo de etiquetas, se deben añadir al "or()".
const updateTag = (req, res, next) => {
  const schema = Joi.object({
    name: tagNameSchema,
    id: ID_schema.required(),
  }).or("name");
  validateRequest(req, res, next, schema);
};

module.exports = {
  postCreateCategory,
  postCreateTag,
  deleteCategory,
  deleteTag,
  updateCategory,
  updateTag,
};
