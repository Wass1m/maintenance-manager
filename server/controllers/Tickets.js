var {
  Users,
  Ressources,
  Tickets,
  Anomalies,
  Defaillances,
} = require("../models");
const db = require("../models");
const { Op, QueryTypes } = require("sequelize");
const sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const config = require("config");

var createTicket = async (req, res) => {
  const { anomalies, newAnomalie, userID } = req.body;

  try {
    // Creation d'une nouvelle anomalie si existante
    var anomalie = null;
    if (newAnomalie.length > 0) {
      anomalie = await Anomalies.create({
        description: newAnomalie,
        userID: userID ? userID : null, // non null si authentifie sinon null
        ressourceID: parseInt(req.params.ressourceID),
      });

      anomalies.unshift(anomalie.id);
    }

    // Creation du ticket
    let ticket = await Tickets.create({
      userID: userID ? userID : null, // non null si authentifie sinon null
      ressourceID: parseInt(req.params.ressourceID),
      solved: false,
    });

    // Creation des anomalies pour ce ticket dans la table defaillance
    anomalies.map(async (anomalie) => {
      await Defaillances.create({
        ticketID: ticket.id,
        anomalyID: anomalie,
      });
    });

    return res.json({ ticket });
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

var getTicketById = async (req, res) => {
  try {
    let ticket = await Tickets.findByPk(parseInt(req.params.ticketID));
    if (!ticket)
      return res
        .status(400)
        .json({ message: "Ticket inexistant", status: 400 });

    let ressource = await Ressources.findByPk(parseInt(ticket.ressourceID));

    let anomalies = await db.sequelize.query(
      `SELECT an.id, an.description FROM defaillances INNER JOIN anomalies as an ON defaillances.anomalyID = an.id INNER JOIN tickets ON defaillances.ticketID = tickets.id   WHERE tickets.id=${ticket.id};`,
      {
        type: QueryTypes.SELECT,
      }
    );

    return res.json({ ticket: { ressource, ticket, anomalies } });
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

var getTicketByResponsable = async (req, res) => {
  try {
    var tickets = await db.sequelize.query(
      `SELECT t.id, t.createdAt, t.solved, t.ressourceID, t.userID, r.description, r.localisation FROM tickets as t INNER JOIN ressources as r ON t.ressourceID = r.id WHERE r.responsableID=${req.user.id} ORDER BY t.solved ASC, t.createdAt ASC;`,
      {
        type: QueryTypes.SELECT,
      }
    );

    var allTickets = [];

    await Promise.all(
      tickets.map(async (ticket) => {
        let anomalies = await db.sequelize.query(
          `SELECT an.id,an.description FROM defaillances INNER JOIN anomalies as an ON defaillances.anomalyID = an.id INNER JOIN tickets ON defaillances.ticketID = tickets.id WHERE tickets.id=${ticket.id} ORDER BY tickets.solved ASC, tickets.createdAt ASC; ;`,
          {
            type: QueryTypes.SELECT,
          }
        );

        allTickets.unshift({ ticket, anomalies });
      })
    );

    allTickets.sort((a, b) => b.ticket.solved - a.ticket.solved);

    return res.json({ allTickets });
  } catch (error) {
    res.status(500).send("Erreur serveur");
    console.log(error);
  }
};

// var getTicketByResponsable = async (req, res) => {
//   try {
//     var tickets = await db.sequelize.query(
//       `SELECT t.id, t.createdAt, t.solved, t.ressourceID, t.userID, r.description, r.localisation FROM tickets as t INNER JOIN ressources as r ON t.ressourceID = r.id WHERE r.responsableID=${req.user.id};`,
//       {
//         type: QueryTypes.SELECT,
//       }
//     );

//     var allTickets = [];

//     await Promise.all(
//       tickets.map(async (ticket) => {
//         let anomalies = await db.sequelize.query(
//           `SELECT an.id,an.description FROM defaillances INNER JOIN anomalies as an ON defaillances.anomalyID = an.id INNER JOIN tickets ON defaillances.ticketID = tickets.id WHERE tickets.id=${ticket.id};`,
//           {
//             type: QueryTypes.SELECT,
//           }
//         );

//         allTickets.unshift({ ticket, anomalies });
//       })
//     );

//     return res.json({ allTickets });
//   } catch (error) {
//     res.status(500).send("Erreur serveur");
//     console.log(error);
//   }
// };

var resoudreTicket = async (req, res) => {
  try {
    let ticket = await Tickets.findByPk(parseInt(req.params.ticketID));
    if (!ticket)
      return res
        .status(400)
        .json({ message: "Ticket inexistant", status: 400 });

    ticket.set({
      solved: true,
    });

    await ticket.save();

    return res.json({ ticket: ticket });
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

module.exports = {
  createTicket,
  getTicketByResponsable,
  getTicketById,
  resoudreTicket,
};
