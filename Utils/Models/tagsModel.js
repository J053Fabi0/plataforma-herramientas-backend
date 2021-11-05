const { Schema, model } = require("mongoose");

const tagsSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Categories" }, // https://mongoosejs.com/docs/populate.html
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Tags", tagsSchema);
