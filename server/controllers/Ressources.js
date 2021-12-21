var { Users, Ressources } = require("../models");
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

var getRessourcesByResponsable = async (req, res) => {
  try {
    let ressources = await Ressources.findAll({
      where: {
        responsableID: {
          [Op.eq]: req.user.id,
        },
      },
    });

    return res.json({ ressources });
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

var getRessourceByID = async (req, res) => {
  try {
    let ressource = await Ressources.findByPk(req.params.ressID);
    if (!ressource) {
      return res.status(400).json({ message: "Ressource inexistante" });
    }

    return res.json({ ressource });
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

module.exports = {
  createRessource,
  getRessourcesByResponsable,
  getRessourceByID,
};
