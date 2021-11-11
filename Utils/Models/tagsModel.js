const { Schema, model } = require("mongoose");

const tagsSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    cards: { type: [Schema.Types.ObjectId], ref: "Cards", default: [] }, // https://mongoosejs.com/docs/populate.htmlA
    category: { type: Schema.Types.ObjectId, ref: "Categories" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Tags", tagsSchema);
