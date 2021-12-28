const express = require("express");
const router = express.Router();

// MIDDLEWARE DE PERMISSION UTILISATEUR
const userAuth = require("../middleware/userAuth");
// MIDDLEWARE DE PERMISSION ADMINISTRATEUR
const adminAuth = require("../middleware/adminAuth");

// MIDDLEWARE UTILISATEUR COURANT
const currentAuth = require("../middleware/currentAuth");

// CONTROLLEUR UTILISATEURS
var userController = require("../controllers/Users");

////////// ROUTES UTILISATEURS

////////////  ROUTE DE CREATION DE COMPTE
router.post("/register", userController.createUser);
////////////  ROUTE D'AUTHENTIFICATION
router.post("/login", userController.loginUser);

//////////
//////////
//////////
//////////
////////// ROUTES ADMINISTRATEURS

////////////  ROUTE D'AUTHENTIFICATION ADMIN

router.post(
  "/admin/createResponsable",
  adminAuth,
  userController.createResponsable
);

////////////  ROUTE D'OBTENTION DE TOUS LES RESPONSABLES

router.get("/admin/getResponsables", adminAuth, userController.getResponsables);

////////////  ROUTE DE SUPPRESSION D'UN RESPONSABLE

router.delete(
  "/admin/deleteResponsables/:respoID",
  adminAuth,
  userController.deleteResponsables
);

////// INTIALISATION DE L'APPLICATION

router.post("/initA", userController.initApp);

////////////  OBTENTION DE L'UTILISATEUR ACTUEL SUIVANT LE TOKEN
router.get("/me", currentAuth, userController.getCurrentUser);

// Exporting Routes
module.exports = router;
