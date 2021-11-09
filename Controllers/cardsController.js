const mongoose = require("mongoose");
const cardsModel = require("../Utils/Models/cardsModel");

const handleError = require("../Utils/handleError");

const postCreateCard = async ({ body }, res) => {
  try {
    const newCardID = new mongoose.Types.ObjectId();
    const newCard = new cardsModel({ ...body, _id: newCardID });

    await newCard.save();
    res.send({ message: { id: newCardID } });
  } catch (err) {
    handleError(res, err, 400);
  }
};

module.exports = {
  postCreateCard,
};
