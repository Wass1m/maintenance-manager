const express = require("express");
const router = express.Router();

// MIDDLEWARE DE PERMISSION UTILISATEUR
const userAuth = require("../middleware/userAuth");
// MIDDLEWARE DE PERMISSION ADMINISTRATEUR
const adminAuth = require("../middleware/adminAuth");
// MIDDLEWARE DE PERMISSION UTILISATEUR

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

router.post("/initA", userController.initApp);

//////////
//////////
//////////
//////////
////////// ROUTES RESPONSABLE MAINTENANCE

router.post("/responsable/login", userAuth, userController.iAM);

////////////  ROUTE D'AUTHENTIFICATION ADMIN

// Exporting Routes
module.exports = router;
