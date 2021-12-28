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
////////////  LISTER LES TICKET D;UN RESPONSABLE
router.get("/get", respoAuth, ticketsController.getTicketByResponsable);
////////////  LISTER UN TICKET PAR ID
router.get(
  "/getTicketById/:ticketID",
  respoAuth,
  ticketsController.getTicketById
);
////////////  RESOUDRE UN TICKET D'ANOMALIE
router.get("/solve/:ticketID", respoAuth, ticketsController.resoudreTicket);

// Exporting Routes
module.exports = router;
