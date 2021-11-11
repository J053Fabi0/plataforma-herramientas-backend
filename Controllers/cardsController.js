const mongoose = require("mongoose");
const cardsModel = require("../Utils/Models/cardsModel");
const tagsModel = require("../Utils/Models/tagsModel");

const handleError = require("../Utils/handleError");

const getAllCards = async (_, res) => {
  try {
    const allCards = await cardsModel.find();
    const message = [];
    for ({ title, description, tags, image, id } of allCards)
      message.push({ title, description, tags, image, id });

    res.send({ message });
  } catch (err) {
    handleError(res, err);
  }
};

const getCard = async ({ query: { id } }, res) => {
  try {
    const card = await cardsModel.findById(id).populate("tags");
    if (!card) return res.status(404).send({ error: "Card not found" });

    const cardToReturn = JSON.parse(JSON.stringify(card).replace(/_id/g, "id"));
    cardToReturn.tags = [];

    // Borrar la info que no es necesaria de los tags
    for (let { name, id } of card.tags) cardToReturn.tags.push({ name, id });

    // Borrar los ids que no son necesarios
    delete cardToReturn.prueba.id;
    delete cardToReturn.prueba?.video?.id;

    // Pasar todos los _id a id
    res.send({ cardToReturn });
  } catch (err) {
    handleError(res, err);
  }
};

const postCreateCard = async ({ body }, res) => {
  try {
    // Verificar que todos los tags existen
    for (let tag of body.tags) {
      const tagQuery = await tagsModel.findById(tag);
      if (!tagQuery) return res.status(404).send({ error: `Tag with ID ${tag} not found.` });
    }

    const newCardID = new mongoose.Types.ObjectId();
    const newCard = new cardsModel({ ...body, _id: newCardID });

    await newCard.save();

    // Añadir el ID de esta nueva carta a cada tag
    for (let tag of body.tags) await tagsModel.updateOne({ _id: tag }, { $push: { cards: newCardID } });

    res.send({ message: { id: newCardID } });
  } catch (err) {
    handleError(res, err, 400);
  }
};

const deleteCard = async ({ body: { id } }, res) => {
  try {
    // Borrar la carta, si existe
    const { tags = false } = (await cardsModel.findOneAndDelete({ _id: id })) || {};
    if (tags === false) return res.status(404).send({ error: "Card not found." });

    // Borrar el el ID de cada una de las etiquetas en las que está
    for (let tag of tags) {
      const { cards = false } = (await tagsModel.findById(tag)) || {};

      const indexOfCard = cards ? cards.findIndex((card) => card == id) : -1;
      if (indexOfCard >= 0) {
        cards.splice(indexOfCard, 1);
        await tagsModel.updateOne({ _id: tag }, { cards });
      }
    }

    res.status(204).send();
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getAllCards,
  getCard,
  postCreateCard,
  deleteCard,
};
