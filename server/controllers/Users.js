var { Users, Roles } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const config = require("config");

// Utilisateurs USAGERS !

var createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // On test si l'email est deja utilise
    let exist = await Users.findAll({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });

    // Si c'est le cas un message d'erreur est retourne
    if (exist.length > 0) {
      return res.status(401).json({ message: "Utilisateur existant" });
    }

    // Si ce n'est pas le cas nous allons creer l'utilisateur

    // Nous hashons le mot de passe pour plus de securite
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    let newUser = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "usager",
    });

    // generation du token d'authentification

    const payload = {
      user: {
        id: newUser.id,
        role: newUser.role,
      },
    };

    await jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

var loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // On test si l'email n'existe pas
    let exist = await Users.findAll({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });

    // Si c'est le cas un message d'erreur est retourne
    if (exist.length == 0) {
      return res.status(401).json({ message: "Identifiants incorrects email" });
    }

    // On test si le mot de passe correspond

    let match = await bcrypt.compare(password, exist[0].password);

    if (!match) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    let user = exist[0];

    // generation du token d'authentification

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    await jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

var iAM = (req, res) => {
  res.send("I AM INVINCIBLE");
};

// Responsables de maintenances !

// Administrateurs !

var createResponsable = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // On test si l'email est deja utilise
    let exist = await Users.findAll({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });

    // Si c'est le cas un message d'erreur est retourne
    if (exist.length > 0) {
      return res.status(401).json({ message: "Utilisateur existant" });
    }

    // Si ce n'est pas le cas nous allons creer l'utilisateur

    // Nous hashons le mot de passe pour plus de securite
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    let newUser = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "responsable",
    });

    return res.json({ message: "Responsable cree", responsable: newUser });
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

// initilisation de l'application
var initApp = async (req, res) => {
  try {
    // si deja intialise
    let exist = await Users.findAll({
      where: {
        email: {
          [Op.eq]: "mgprojetweb@univ-rouen.fr",
        },
      },
    });

    // Si app non intialise
    if (exist.length == 0) {
      // Creation des roles
      let roles = ["admin", "responsable", "usager"];

      roles.map(async (role) => {
        await Roles.create({
          name: role,
        });
      });

      // Creation du compte admin

      let password = "Admin2021";

      const salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(password, salt);

      let newUser = await Users.create({
        firstName: "admin",
        lastName: "",
        email: "mgprojetweb@univ-rouen.fr",
        password: hashedPassword,
        role: "admin",
      });
    }
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

module.exports = { createUser, loginUser, iAM, createResponsable, initApp };
