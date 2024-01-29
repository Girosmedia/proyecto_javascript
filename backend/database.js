const mongoose = require("mongoose");

//console.log(process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI)
  .then((db) => console.log("Aplicación conectada a MongoDB 📚"))
  .catch((err) => console.error("No se logró conectar a MongoDB:", err));
