const router = require("express").Router();
const s = require("../../Schemas/cardsSchema");
const c = require("../../Controllers/cardsController");

// router.get("/allCards", c.getAllCards);
// router.get("/card", c.getCard);

router.post("/createCard", s.postCreateCard, c.postCreateCard);

// router.delete("/deleteCard", s.deleteCard, c.deleteCard);

// router.patch("/updateCard", s.updateCard, c.updateCard);

module.exports = router;
