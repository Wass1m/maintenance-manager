const express = require("express");
const app = express();
// parser les jsons
app.use(express.json());

//routes

const userRoutes = require("./routes/Users");

app.use("/api/users", userRoutes);

// base de donnees

const db = require("./models");

var PORT = 5000 || process.env.PORT;

// serveur
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
  });
});
