var { Users, Ressources, Anomalies } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const config = require("config");

var createRessource = async (req, res) => {
  const { localisation, description } = req.body;

  try {
    let ressource = await Ressources.create({
      description,
      localisation,
      responsableID: req.user.id, // ID decoded from token
    });

    return res.json({ ressource });
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

var deleteRessource = async (req, res) => {
  try {
    let ressource = await Ressources.destroy({
      where: {
        id: req.params.ressourceID,
      },
    });

    return res.json({ message: "Ressource supprimee", ressource });
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

var getRessourcesByResponsable = async (req, res) => {
  try {
    var allRessources = [];

    let ressources = await Ressources.findAll({
      where: {
        responsableID: {
          [Op.eq]: req.user.id,
        },
      },
    });

    await Promise.all(
      ressources.map(async (ress) => {
        let anomalies = await Anomalies.findAll({
          where: {
            ressourceID: {
              [Op.eq]: ress.id,
            },
          },
        });
        allRessources.unshift({ ressource: ress, anomalies });
      })
    );

    return res.json({ allRessources });
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

var getRessourceByID = async (req, res) => {
  try {
    let ressource = await Ressources.findByPk(req.params.ressourceID);
    if (!ressource) {
      return res.status(400).json({ message: "Ressource inexistante" });
    }

    let anomalies = await Anomalies.findAll({
      where: {
        ressourceID: {
          [Op.eq]: ressource.id,
        },
      },
    });

    let newRessources = { ressource, anomalies };

    return res.json({ ...newRessources });
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

module.exports = {
  createRessource,
  getRessourcesByResponsable,
  getRessourceByID,
  deleteRessource,
};
