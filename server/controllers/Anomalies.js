var { Users, Ressources, Anomalies } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const config = require("config");

var createAnomalie = async (req, res) => {
  const { userID, description } = req.body;

  try {
    let anomalie = await Anomalies.create({
      description,
      userID: userID ? userID : null, // non null si authentifie sinon null
      ressourceID: parseInt(req.params.ressourceID),
    });

    return res.json({ anomalie });
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

var deleteAnomalie = async (req, res) => {
  try {
    let anomalie = await Anomalies.destroy({
      where: {
        id: req.params.anomalieID,
      },
    });

    return res.json({ message: "Anomalie supprimee", anomalie });
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

var getAnomaliesByRessource = async (req, res) => {
  const { ressourceID } = req.body;

  try {
    let anomalies = await Anomalies.findAll({
      where: {
        ressourceID: {
          [Op.eq]: ressourceID,
        },
      },
    });

    return res.json({ anomalies });
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

var getAnomalieByID = async (req, res) => {
  try {
    let anomalie = await Anomalies.findByPk(req.params.anomalieID);
    if (!anomalie) {
      return res.status(400).json({ message: "Anomalie inexistante" });
    }

    return res.json({ anomalie: anomalie });
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

module.exports = {
  createAnomalie,
  getAnomaliesByRessource,
  getAnomalieByID,
  deleteAnomalie,
};
