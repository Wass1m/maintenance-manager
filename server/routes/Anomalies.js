const express = require("express");
const router = express.Router();

// MIDDLEWARE DE PERMISSION UTILISATEUR
const userAuth = require("../middleware/userAuth");
// MIDDLEWARE DE PERMISSION ADMINISTRATEUR
const adminAuth = require("../middleware/adminAuth");
// MIDDLEWARE DE PERMISSION UTILISATEUR
const respoAuth = require("../middleware/respoAuth");

// CONTROLLEUR ANOMALIES
var anomalieController = require("../controllers/Anomalies");

////////// ROUTES UTILISATEURS

////////////  CREATION ANOMALIE
router.post("/create/:ressourceID", anomalieController.createAnomalie);
////////////  SUPPRESSION ANOMALIE
router.delete(
  "/delete/:anomalieID",
  respoAuth,
  anomalieController.deleteAnomalie
);
////////////  LISTER TOUTES LES ANOMALIES D'UNE RESSOURCE
router.get(
  "/getAnomalies",

  anomalieController.getAnomaliesByRessource
);
////////////  OBTENIR UNE RESSOURCE PAR ID POUR UN RESPONSABLE
router.get(
  "/getAnomalieByID/:anomalieID",

  anomalieController.getAnomalieByID
);

// Exporting Routes
module.exports = router;
