const { Schema, model } = require("mongoose");

const cardsSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: String,
    tags: [{ type: Schema.Types.ObjectId, ref: "Tags" }], // https://mongoosejs.com/docs/populate.html
    prueba: new Schema({
      // https://mongoosejs.com/docs/subdocs.html
      types: Array,
      video: new Schema(
        {
          url: { $type: String, required: true },
          type: String,
        },
        { typeKey: "$type" } // https://mongoosejs.com/docs/guide.html#typeKey
      ),
      images: [String],
      text: String,
    }),
    site: String,
    image: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Cards", cardsSchema);
