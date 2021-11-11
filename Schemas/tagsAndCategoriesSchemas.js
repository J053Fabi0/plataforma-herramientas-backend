const Joi = require("joi");
const { ID_schema, tagNameSchema, categoryNameSchema } = require("./commonSchemas");
const validateRequest = require("../Utils/validateRequest");

const postCreateCategory = (req, res, next) => {
  const schema = Joi.object({
    name: categoryNameSchema,
    tags: Joi.array().items(tagNameSchema).min(1).required(),
  });
  const testResult = validateRequest(req, res, next, schema);

  if (!next) return testResult;
};

const postCreateTag = (req, res, next) => {
  const schema = Joi.object({
    name: tagNameSchema.required(),
    category: ID_schema.required(),
    cards: Joi.array().items(ID_schema).default([]),
  });
  const testResult = validateRequest(!next);

  if (!next) return testResult;
};

const deleteCategory = (req, res, next) => {
  const schema = Joi.object({ id: ID_schema });
  const testResult = validateRequest(req, res, next, schema);

  if (!next) return testResult;
};

const deleteTag = (req, res, next) => {
  const schema = Joi.object({ id: ID_schema });
  const testResult = validateRequest(req, res, next, schema);

  if (!next) return testResult;
};

// Si se añaden datos al modelo de categorías, se deben añadir al "or()".
const updateCategory = (req, res, next) => {
  const schema = Joi.object({
    name: categoryNameSchema,
    id: ID_schema.required(),
  }).or("name");
  const testResult = validateRequest(req, res, next, schema);

  if (!next) return testResult;
};

// Si se añaden datos al modelo de etiquetas, se deben añadir al "or()".
const updateTag = (req, res, next) => {
  const schema = Joi.object({
    name: tagNameSchema.required(),

    id: ID_schema.required(),
  }).or("name");
  const testResult = validateRequest(req, res, next, schema);

  if (!next) return testResult;
};

module.exports = {
  postCreateCategory,
  postCreateTag,
  deleteCategory,
  deleteTag,
  updateCategory,
  updateTag,
};
