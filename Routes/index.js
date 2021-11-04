const router = require("express").Router();

const tagsAndCategories = require("./API/tagsAndCategoriesAPI");

router.use("/tagsAndCategories", tagsAndCategories);

router.get("/", (_, res) => res.send("Up and working."));

module.exports = router;
