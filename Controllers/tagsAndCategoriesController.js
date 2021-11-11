const mongoose = require("mongoose");
const tagsModel = require("../Utils/Models/tagsModel");
const cardsModel = require("../Utils/Models/cardsModel");
const categoriesModel = require("../Utils/Models/categoriesModel");

const handleError = require("../Utils/handleError");

const getAllData = async ({ query: { ids } }, res) => {
  try {
    ids = ids === "true";
    const result = await categoriesModel.find({}).populate("tags");

    // Filtrar los resultados, para no enviar el createdAt ni otros datos que no son necesarios
    const message = [];
    for (let { tags, name, _id: id } of result) {
      tags = tags.map(({ name, _id: id }) => (ids ? { name, id } : { name }));
      message.push(ids ? { tags, name, id } : { tags, name });
    }

    res.send({ message });
  } catch (err) {
    handleError(res, err, 400);
  }
};

const postCreateCategory = async ({ body: { name, tags } }, res) => {
  try {
    const newCategoryID = new mongoose.Types.ObjectId();
    const newCategory = new categoriesModel({ name, _id: newCategoryID });

    const tagsIDs = [];
    // Crear todos los tags
    for (let tag of tags) {
      const id = new mongoose.Types.ObjectId();
      const newTag = new tagsModel({ name: tag, _id: id, category: newCategoryID, cards: [] });
      await newTag.save();
      tagsIDs.push(id);
    }

    newCategory.tags = tagsIDs;
    await newCategory.save();
    res.send({ message: { categoryID: newCategoryID, tagsIDs } });
  } catch (err) {
    handleError(res, err, 400);
  }
};

const postCreateTag = async ({ body: { name, category, cards } }, res) => {
  try {
    // Preguntar si existe la categoría
    const categoryQuery = await categoriesModel.findById(category);
    if (!categoryQuery) return res.status(404).send({ error: "Category not found." });

    for (let card of cards) {
      const cardQuery = await cardsModel.findById(card);
      if (!cardQuery) return res.status(404).send({ error: `Card with ID ${card} not found.` });
    }

    const newTagID = new mongoose.Types.ObjectId();
    const newTag = new tagsModel({ name, _id: newTagID, category, cards });
    await newTag.save();

    // Añadir el ID del tag a la lista de tags de la categoría
    await categoriesModel.updateOne({ _id: category }, { $push: { tags: newTagID } });
    // Añadir el ID del tag a la lista de tags de las cartas
    for (let card of cards) await cardsModel.updateOne({ _id: card }, { $push: { tags: newTagID } });

    res.send({ message: { id: newTagID } });
  } catch (err) {
    handleError(res, err, 400);
  }
};

const deleteCategory = async ({ body: { id } }, res) => {
  try {
    const { tags = false } = (await categoriesModel.findOneAndDelete({ _id: id })) || {};
    if (tags === false) return res.status(404).send({ error: "Category not found." });

    for (let tag of tags) await tagsModel.deleteOne({ _id: tag });

    res.status(204).send();
  } catch (err) {
    handleError(res, err, 400);
  }
};

const deleteTag = async ({ body: { id } }, res) => {
  try {
    // Borrar el tag, si existe
    const { category = false, cards = [] } = (await tagsModel.findOneAndDelete({ _id: id })) || {};
    if (category === false) return res.status(404).send({ error: "Tag not found." });

    // Borrar el tag del arreglo de tags en la categoría
    const { tags = false } = (await categoriesModel.findById(category)) || {};

    const indexOfTag = tags ? tags.findIndex((tag) => tag == id) : -1;
    if (indexOfTag >= 0) {
      tags.splice(indexOfTag, 1);
      await categoriesModel.updateOne({ _id: category }, { tags });
    }

    // Borrar el tag de cada una de las cartas en las que está
    for (let card of cards) {
      const { tags = false } = (await cardsModel.findById(card)) || {};

      const indexOfTag = tags ? tags.findIndex((tag) => tag == id) : -1;
      if (indexOfTag >= 0) {
        tags.splice(indexOfTag, 1);
        await cardsModel.updateOne({ _id: card }, { tags });
      }
    }

    res.status(204).send();
  } catch (err) {
    handleError(res, err, 400);
  }
};

const updateCategory = async ({ body: { id, ...updates } }, res) => {
  try {
    await categoriesModel.updateOne({ _id: id }, updates);

    res.send();
  } catch (err) {
    handleError(res, err, 400);
  }
};

const updateTag = async ({ body: { id, ...updates } }, res) => {
  try {
    await tagsModel.updateOne({ _id: id }, updates);

    res.send();
  } catch (err) {
    handleError(res, err, 400);
  }
};

module.exports = {
  getAllData,
  postCreateCategory,
  postCreateTag,
  deleteCategory,
  deleteTag,
  updateCategory,
  updateTag,
};
