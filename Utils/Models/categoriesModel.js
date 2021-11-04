const { Schema, model } = require("mongoose");

const categoriesSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tags" }], // https://mongoosejs.com/docs/populate.html
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Categories", categoriesSchema);
