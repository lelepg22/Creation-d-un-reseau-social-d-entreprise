const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
var mysql = require("mysql");

var options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "gaglianone_projet7",
};

var con = mysql.createConnection(options);

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

exports.headers = (req, res, next) => {
  console.log("requete Auth");

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  next();
};

// verifie les donnees et renvoie un token {email: 'chaine', password: 'chaine'} renvoie {userId: 'chaine', token: 'chaine'}
exports.login = (req, res, next) => {
  console.log("login");

  // connection à la bdd
  var con = mysql.createConnection(options);

  con.connect((err) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "impossible de se connecter à la BDD" });
    }
    console.log("Connecté à la base de donnée");
  });

  con.query(
    `SELECT * FROM users WHERE email = ${mysql.escape(req.body.email)}`,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: err });
      }
      if (!result[0]) {
        console.log("pas dans la base");
        return res.status(200).json({ erreur: "Vous n'etes pas inscrit" });
      }
      console.log(result[0]);

      bcrypt.compare(req.body.password, result[0].password, (err, resultat) => {
        if (!resultat) {
          console.log("mdp non valide");
          return res.status(200).json({ erreur: "mot de passe non valide" });
        }
        console.log("le mot de passe est valide");
        //res.status(200)
        con.end();
        res
          .status(200)
          .json({
            moderateur: result[0].moderateur,
            userId: result[0].id,
            utilisateur: result[0].utilisateur,
            email: result[0].email,
            token: jwt.sign({ userId: result[0].id }, "secret_key", {
              expiresIn: "24h",
            }),
          });
      });
    }
  );
};

exports.signup = (req, res, next) => {
  console.log("signup");
  console.log(req.body);

  // cryptage mot de passe
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(401).json({ message: err });
    }
    var con = mysql.createConnection(options);

    con.connect((err) => {
      if (err) {
        return res
          .status(401)
          .json({ erreur: "La connexion a la DATABASE echoue" });
      }
      console.log("Connecté à la base de donnée");
    });

    console.log(
      "email ",
      req.body.email,
      "/ password ",
      req.body.password,
      "/ hash ",
      hash,
      "/ pseudo ",
      req.body.utilisateur
    );
    debugger;

    // envoie de la requete à la base

    con.query(
      "INSERT INTO `users` (`id`,`email`, `utilisateur`, `password`)  VALUES(NULL, '" +
        req.body.email +
        "', '" +
        req.body.utilisateur +
        "'  , '" +
        hash +
        "' )",
      function (err, result) {
        if (err) {
          console.log(err.sqlMessage);
          if (err.sqlMessage.match("email")) {
            return res
              .status(200)
              .json({ erreur: "Cette adresse mail existe deja" });
          } else if (err.sqlMessage.match("utilisateur")) {
            return res
              .status(200)
              .json({
                erreur: "Ce pseudo est deja pris, choisissez en un autre",
              });
          }
          return res.status(200).json({ erreur: err.sqlMessage });
        }
        console.log("Votre compte a été crée");
        con.end();
        return res.status(200).json({ message: "OK" });
      }
    );
  });
};

exports.error = (err, req, res, next) => {
  console.log(err);

  res.status(418).json({ message: "ERREUR" + err });
};
