const router = require("express").Router();

const tagsAndCategories = require("./API/tagsAndCategoriesAPI");
const cards = require("./API/cardsAPI");

router.use("/tagsAndCategories", tagsAndCategories);
router.use("/cards", cards);

router.get("/", (_, res) => res.send("Up and working."));

module.exports = router;
