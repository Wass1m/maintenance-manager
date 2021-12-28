const express = require("express");
const app = express();
const { initApp } = require("./controllers/Users");
var cors = require("cors");

var os = require("os");
var networkInterfaces = os.networkInterfaces();
console.log(networkInterfaces);

// parser les jsons
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

app.use(express.static(__dirname + "/public"));

// intialisation des routes

const userRoutes = require("./routes/Users");
const ressourcesRoutes = require("./routes/Ressources");
const anomaliesRoutes = require("./routes/Anomalies");
const ticketsRoutes = require("./routes/Tickets");

app.use("/api/users", userRoutes);
app.use("/api/ressources", ressourcesRoutes);
app.use("/api/anomalies", anomaliesRoutes);
app.use("/api/tickets", ticketsRoutes);

// base de donnees

const db = require("./models");

var PORT = 5000 || process.env.PORT;

// serveur
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
  });
  initApp();
});
