const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');

const bcrypt = require('bcrypt');
require("dotenv").config();
const multer = require('multer');
const { auth } = require('express-openid-connect');
const saltRounds = 10; // Nombre de rounds de salage à utiliser
const bodyParser = require('body-parser');
const cloudinary = require("cloudinary").v2;
const cloudconfig = require("./cloudinary");
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const User = require('./models/Users');
app.use(cors());
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Configuration de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads/')); // Spécifiez le répertoire de destination pour enregistrer les fichiers
  },
  filename: function (req, file, cb) {
    // Générez un nom de fichier unique en ajoutant un timestamp au nom d'origine
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Middleware pour gérer le téléchargement de la bannière
app.post('/upload/banniere', upload.single('file'), async (req, res) => {
  try {
    // Télécharger l'image vers Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Récupérer l'URL de l'image téléchargée depuis Cloudinary
    const imageUrl = result.secure_url;

    // Envoyer l'URL de l'image en réponse
    res.json({ url: imageUrl });
  } catch (error) {
    console.error('Erreur lors du téléchargement de la bannière:', error);
    res.status(500).json({ error: "Une erreur s'est produite lors du téléchargement de la bannière." });
  }
});

// Middleware pour gérer le téléchargement de la photo de profil
app.post('/upload/photoProfil', upload.single('file'), async (req, res) => {
  try {
    // Télécharger l'image vers Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Récupérer l'URL de l'image téléchargée depuis Cloudinary
    const imageUrl = result.secure_url;

    // Envoyer l'URL de l'image en réponse
    res.json({ url: imageUrl });
  } catch (error) {
    console.error('Erreur lors du téléchargement de la photo de profil:', error);
    res.status(500).json({ error: "Une erreur s'est produite lors du téléchargement de la photo de profil." });
  }
});

mongoose.connect("mongodb+srv://jacquemar:o85pxev28Rl0qapG@ConnectDb.mht5fkp.mongodb.net/ConnectDb?retryWrites=true&writeConcern=majority"
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  const flash = require('connect-flash');
  app.use(flash());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

 app.post('/api/login', async (req, res) => {
  const { userName, password } = req.body;

  try {
    // Recherche de l'utilisateur dans la base de données
    const user = await User.findOne({ userName });
 
    // Vérifie si l'utilisateur existe et si le mot de passe est correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect.' });
    }

    // Crée un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Renvoie le token JWT
    res.json({ token });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la connexion." });
  }
});




// Route pour récupérer les informations de l'utilisateur actuellement connecté
app.get('/api/user', async (req, res) => {
  try {
    // Vérifier si le token JWT est inclus dans l'en-tête de la requête
    const token = req.headers.authorization.split(' ')[1]; // Récupérer le token à partir de l'en-tête Authorization

    if (!token) {
      return res.status(401).json({ error: "Token manquant dans l'en-tête de la requête." });
    }

    // Décoder le token JWT pour extraire l'identifiant de l'utilisateur
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Recherche de l'utilisateur dans la base de données par son ID
    const user = await User.findById(userId);

    if (user) {
      // Si l'utilisateur est trouvé, renvoyer ses informations
      res.status(200).json(user);
    } else {
      // Si l'utilisateur n'est pas trouvé, renvoyer une réponse avec un statut 404
      res.status(404).json({ error: "Utilisateur non trouvé." });
    }
  } catch (error) {
    // En cas d'erreur, renvoyer une réponse avec un statut 500
    console.error('Erreur lors de la récupération des informations utilisateur :', error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des informations utilisateur." });
  }
});

// Route pour récupérer les informations de l'utilisateur par son ID
app.get('/api/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Utilisateur non trouvé." });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des informations utilisateur:', error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des informations utilisateur." });
  }
});

  app.post( "/create-user", async (req, res) => {
    try {
        // Recherche si l'utilisateur existe déjà dans la base de données
        const existingUser = await User.findOne({ userName: req.body.userName });
        if (existingUser) {
            // Si l'utilisateur existe déjà
            return res.status(400).json({ error: 'Cet utilisateur est déjà utilisée.' });
        }
  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  
          // Créer un nouvel utilisateur
const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: hashedPassword,
    photoProfilURL:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.m.wikipedia.org%2Fwiki%2FFile%3ADefault_pfp.svg&psig=AOvVaw1F_Fgs6KDj2y7-82_i39st&ust=1712309393342000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOiFtIqgqIUDFQAAAAAdAAAAABAE',
    banniereURL:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.media.appbusinessperu.com%2F%3Fm%3Ddefault-image-icon-missing-picture-page-for-website-design-6-dd-RpgBysx&psig=AOvVaw3-NLVy5Tjdd7yoTVWGdbzu&ust=1712309337292000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPih9sKfqIUDFQAAAAAdAAAAABAR',
  });

  // Sauvegarder le nouvel utilisateur dans la base de données
  newUser.save()
    .then(savedUser => {
      console.log('Utilisateur enregistré avec succès :', savedUser);
    })
    .catch(error => {
      console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
    });
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
    }

  });

  //mettre à jour les donnée de l'utilisateur 
  // Route pour mettre à jour le profil d'un utilisateur par son ID
  app.put('/edit/profil/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Récupérer l'utilisateur à mettre à jour
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
  
      // Vérifier si une nouvelle image de profil a été envoyée
      if (req.file) {

        user.photoProfilURL = req.file.path;
      }
  
      // Mettre à jour d'autres champs du profil avec les données reçues dans le corps de la requête
      user.nomComplet = req.body.nomComplet;
      user.titre = req.body.titre;
      user.banniereURL = req.body.banniereURL;
      user.photoProfilURL = req.body.photoProfilURL;
      user.phoneNumber = req.body.phoneNumber;
      user.facebook = req.body.facebook;
      user.instagram = req.body.instagram;
      user.snapchat = req.body.snapchat;
      user.youtube = req.body.youtube;
      user.tiktok = req.body.tiktok;
      user.twitter = req.body.twitter;
      user.whatsapp = req.body.whatsapp;
      user.pinterest = req.body.pinterest;
      user.linkedin = req.body.linkedin;
      user.mail = req.body.mail;
      user.behance = req.body.behance;
      user.service1 = req.body.service1;
      user.service2 = req.body.service2;
      user.service3 = req.body.service3;
      user.service4 = req.body.service4;
      user.telegram = req.body.telegram;
      // Mettre à jour d'autres champs de profil...
  
      // Enregistrer les modifications dans la base de données
      await user.save();
  
      // Répondre avec un statut de succès
      res.status(200).json({ message: 'Profil utilisateur mis à jour avec succès' });
    } catch (error) {
      // En cas d'erreur, renvoyer une réponse avec un code d'erreur
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du profil utilisateur' });
    }
  });
  






module.exports = app;