const express = require("express");
const router = express.Router();

// MIDDLEWARE DE PERMISSION UTILISATEUR
const userAuth = require("../middleware/userAuth");
// MIDDLEWARE DE PERMISSION ADMINISTRATEUR
const adminAuth = require("../middleware/adminAuth");
// MIDDLEWARE DE PERMISSION UTILISATEUR
const respoAuth = require("../middleware/respoAuth");

// CONTROLLEUR UTILISATEURS
var ressourceController = require("../controllers/Ressources");

////////// ROUTES UTILISATEURS

////////////  CREATION RESSOURCE
router.post("/create", respoAuth, ressourceController.createRessource);
////////////  LISTER TOUTES LES RESSOURCES D'UN RESPONSABLE
router.post(
  "/getRessourcesByRespo",
  respoAuth,
  ressourceController.getRessourcesByResponsable
);
////////////  OBTENIR UNE RESSOURCE PAR ID POUR UN RESPONSABLE
router.post(
  "/getRessourceById/:ressID",
  respoAuth,
  ressourceController.getRessourceByID
);
////////////  OBTENIR UNE RESSOURCE POUR UN UTILISATEUR PAR ID
router.post(
  "/signaler/:ressID",
  respoAuth,
  ressourceController.getRessourceByID
);
// router.post("/delete", userController.loginUser);

// Exporting Routes
module.exports = router;
