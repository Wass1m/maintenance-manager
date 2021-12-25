const express = require("express");
const router = express.Router();

// MIDDLEWARE DE PERMISSION UTILISATEUR
const userAuth = require("../middleware/userAuth");
// MIDDLEWARE DE PERMISSION ADMINISTRATEUR
const adminAuth = require("../middleware/adminAuth");
// MIDDLEWARE DE PERMISSION UTILISATEUR
const respoAuth = require("../middleware/respoAuth");

// CONTROLLEUR TICKETS
var ticketsController = require("../controllers/Tickets");

////////// ROUTES UTILISATEURS

////////////  CREATION ANOMALIE
router.post("/create/:ressourceID", ticketsController.createTicket);
router.get("/get", respoAuth, ticketsController.getTicketByResponsable);
router.get("/getTicketById/:ticketID", ticketsController.getTicketById);
router.get("/solve/:ticketID", respoAuth, ticketsController.resoudreTicket);

////////////  SUPPRESSION ANOMALIE
// router.delete(
//   "/delete/:anomalieID",
//   respoAuth,
//   anomalieController.deleteAnomalie
// );

// Exporting Routes
module.exports = router;
