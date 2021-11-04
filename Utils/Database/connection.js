const mongoose = require("mongoose");

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

module.exports = mongoose;
