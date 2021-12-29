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
    res.status(500).json({ message: "Erreur serveur" });
  }
};

var getCurrentUser = async (req, res) => {
  try {
    let user = await Users.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });
    return res.json({ data: user });
  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur serveur");
  }
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
      let password2 = "Respo2021";

      const salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(password, salt);
      let hashedRespoPassword = await bcrypt.hash(password2, salt);

      let newAdmin = await Users.create({
        firstName: "admin",
        lastName: "",
        email: "mgprojetweb@univ-rouen.fr",
        password: hashedPassword,
        role: "admin",
      });

      let newRespo = await Users.create({
        firstName: "Bob",
        lastName: "Maintainer",
        email: "bob@univ-rouen.fr",
        password: hashedRespoPassword,
        role: "responsable",
      });
    }
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

// Lister les responsables

var getResponsables = async (req, res) => {
  try {
    let users = await Users.findAll({
      attributes: { exclude: ["password", "updatedAt"] },
      where: {
        role: {
          [Op.eq]: "responsable",
        },
      },
      order: [["createdAt", "DESC"]],
    });

    return res.json({ responsables: users });
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

// SUPPRESSION d'un responsable

var deleteResponsables = async (req, res) => {
  try {
    let responsable = await Users.destroy({
      where: {
        id: req.params.respoID,
      },
    });

    return res.json({ message: "Responsable supprimee", responsable });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  createUser,
  loginUser,

  createResponsable,
  initApp,
  getCurrentUser,
  getResponsables,
  deleteResponsables,
};
