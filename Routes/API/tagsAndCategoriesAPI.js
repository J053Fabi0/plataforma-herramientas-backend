const router = require("express").Router();
const s = require("../../Schemas/tagsAndCategoriesSchemas");
const c = require("../../Controllers/tagsAndCategoriesController");

router.get("/", c.getAllData); // Debe ir al último de los gets

router.post("/createCategory", s.postCreateCategory, c.postCreateCategory);
router.post("/createTag", s.postCreateTag, c.postCreateTag);

router.delete("/deleteCategory", s.deleteCategory, c.deleteCategory);
router.delete("/deleteTag", s.deleteTag, c.deleteTag);

router.patch("/updateCategory", s.updateCategory, c.updateCategory);
router.patch("/updateTag", s.updateTag, c.updateTag);

module.exports = router;
