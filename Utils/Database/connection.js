const mongoose = require("mongoose");

// Solo se conecta a mongodb si no se está haciendo un test
if (process.env.NODE_ENV !== "test") {
  console.log("Connecting to DB...");
  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
}

module.exports = mongoose;
