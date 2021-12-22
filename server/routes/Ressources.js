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
////////////  SUPPRESSION RESSOURCE
router.delete(
  "/delete/:ressourceID",
  respoAuth,
  ressourceController.deleteRessource
);
////////////  LISTER TOUTES LES RESSOURCES D'UN RESPONSABLE
router.get(
  "/getRessourcesByRespo",
  respoAuth,
  ressourceController.getRessourcesByResponsable
);
////////////  OBTENIR UNE RESSOURCE PAR ID POUR UN RESPONSABLE
router.get(
  "/getRessourceById/:ressourceID",
  respoAuth,
  ressourceController.getRessourceByID
);
////////////  OBTENIR UNE RESSOURCE POUR UN UTILISATEUR PAR ID
router.get(
  "/getById/:ressourceID",

  ressourceController.getRessourceByID
);
// router.post("/delete", userController.loginUser);

// Exporting Routes
module.exports = router;
