const mongoose = require("mongoose");

// Solo se conecta a mongodb si no se está haciendo un test
if (process.env.NODE_ENV !== "test") {
  console.log("Connecting to DB...");
  mongoose.connect(
    "mongodb+srv://LxpLabPruebas:Josafat123!!@lxplabspruebas.nhq1f.mongodb.net/lxp-lab-Experiences?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  );
}

module.exports = mongoose;
