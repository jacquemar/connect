const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const axios = require('axios');
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
const Demande = require('./models/Demandes');
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
const Demandes = require('./models/Demandes');
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

  const ORANGE_API_URL = process.env.ORANGE_API_URL;
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const COUNTRY_SENDER_NUMBER = "2250000";

// Fonction pour obtenir l'access token
const getAccessToken = async () => {
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    
    const response = await axios.post(`${ORANGE_API_URL}/oauth/v3/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic TXFyQVh6T0treE9XNGxjMkRpV2lXY25ESEd0Mkc0dnI6SzJVeHVPN0NmeGNhS3Rncg=='
      },
    });
    
    return response.data.access_token;
   
  } catch (error) {
    console.error('Erreur lors de l\'obtention du token :', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fonction pour envoyer le SMS
const sendSMS = async (phoneNumber, message) => {
  const accessToken = await getAccessToken();
  const response = await axios.post(
    `https://api.orange.com/smsmessaging/v2/outbound/tel%3A%2B2250000/requests`,
    {
      outboundSMSMessageRequest: {
        address: `tel:+${phoneNumber}`,
        senderAddress: `tel:+${COUNTRY_SENDER_NUMBER}`,
        outboundSMSTextMessage: {
          message: `${message}`,
        },
      },
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};


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
    const token = jwt.sign({ userName: user.userName }, process.env.JWT_SECRET, { expiresIn: '1h' });

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
    const userName = decodedToken.userName;

    // Recherche de l'utilisateur dans la base de données par son ID
    const user = await User.findOne({userName: userName});

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
//route d'incrementation 
// Route pour incrémenter le compteur de téléchargements de vCard
app.post('/api/users/:userName/increment-download', async (req, res) => {
  try {
    const { userName } = req.params;

    // Recherche de l'utilisateur dans la base de données par son ID
    const user = await User.findById(userName);

    if (user) {
      // Incrémenter le compteur de téléchargements
      user.vcardDownloadsCount += 1;
      await user.save();

      res.status(200).json({ message: "Le compteur de téléchargements a été incrémenté avec succès." });
    } else {
      // Si l'utilisateur n'est pas trouvé, renvoyer une réponse avec un statut 404
      res.status(404).json({ error: "Utilisateur non trouvé." });
    }
  } catch (error) {
    // En cas d'erreur, renvoyer une réponse avec un statut 500
    console.error('Erreur lors de l\'incrémentation du compteur de téléchargements :', error);
    res.status(500).json({ error: "Une erreur s'est produite lors de l'incrémentation du compteur de téléchargements." });
  }
});


app.put('/api/users/:userName/increment-visits', async (req, res) => {
  try {
    const { userName } = req.params;
    console.log(`Incrémentation des visites pour l'utilisateur avec l'UserName : ${userName}`);
    const user = await User.findOneAndUpdate(
      { userName: userName }, 
      { $inc: { visitscount: 1 } },
      { new: true }
    );

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Utilisateur non trouvé." });
    }
  } catch (error) {
    console.error('Erreur lors de l\'incrémentation des visites du profil :', error);
    res.status(500).json({ error: "Une erreur s'est produite lors de l'incrémentation des visites du profil." });
  }
});

// Route pour récupérer les informations de l'utilisateur par son userName
app.get('/api/users/:userName', async (req, res) => {
  try {
    const { userName } = req.params; 
    const user = await User.findOne({ userName: userName }); 
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
  
          // Creation d'un nouvel utilisateur
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

  // Route pour approuver une demande
app.post('/api/demandes/:id/approve', async (req, res) => {
  try {
    const demande = await Demande.findById(req.params.id);
    if (!demande) {
      return res.status(404).json({ message: 'Demande non trouvée' });
    }
    demande.status = 'approved';
    await demande.save();

    // Ajouter l'utilisateur à la collection 'users'
    const newUser = new User({
      userName: demande.userName,
      phoneNumber: demande.phoneNumber,
      password: demande.password,
      email: demande.email,
    });
    await newUser.save();

    res.status(200).json({ message: 'Demande approuvée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'approbation de la demande' });
  }
});

// Route pour rejeter une demande
app.post('/api/demandes/:id/reject', async (req, res) => {
  try {
    const demande = await Demande.findById(req.params.id);
    if (!demande) {
      return res.status(404).json({ message: 'Demande non trouvée' });
    }
    demande.status = 'rejected';
    await demande.save();

    res.status(200).json({ message: 'Demande rejetée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors du rejet de la demande' });
  }
});


  app.get("/api/demandes", (req, res) => {
    Demandes.find()
      .sort({ orderDate: -1 })
      .then((demande) => res.status(200).json(demande))
      .catch((error) => res.status(400).json({ error }));
  });

  //route pour la demande de carte 
  app.post( "/create-demande", async (req, res) => {
    try {
        // Recherche si l'utilisateur existe déjà dans la base de données
        const existingUser = await User.findOne({ userName: req.body.userName });
        if (existingUser) {
            // Si l'utilisateur existe déjà
            return res.status(400).json({ error: 'Cet utilisateur est déjà utilisée.' });
        }
  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  
          // Creation d'une nouvelle demande
const newDemande = new Demande({
    userName: req.body.userName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: hashedPassword,
    nom: req.body.nom,
    prenom: req.body.prenom,
    date: req.body.date
  });

  // Sauvegarder la nouvelle demande dans la base de données
  await newDemande.save();
  //await sendSMS(req.body.phoneNumber, `Félicitation ${req.body.userName} Votre demande de carte a bien été prise en compte. prochaine prochaine étape le paiement`);
//réponse de succès
res.status(201).json({ message: 'Demande enregistrée avec succès' });
} catch (error) {
  console.error('Erreur lors de l\'enregistrement de la demande :', error);
  res.status(500).json({ error: 'Erreur serveur lors de l\'enregistrement de la demande.' });
}
  });

  // Route pour mettre à jour le profil d'un utilisateur par son nom d'utilisateur
  app.put('/edit/profil/:userName', async (req, res) => {
    try {
      const userName = req.params.userName;
  
      // Récupérer l'utilisateur à mettre à jour
      const user = await User.findOne({ userName });
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
  
      // Vérifier si une nouvelle image de profil a été envoyée
      if (req.file) {

        user.photoProfilURL = req.file.path;
      }
  
      // Mettre à jour seulement les champs fournis dans le corps de la requête
    if (req.body.nomComplet !== undefined) user.nomComplet = req.body.nomComplet;
    if (req.body.titre !== undefined) user.titre = req.body.titre;
    if (req.body.banniereURL !== undefined) user.banniereURL = req.body.banniereURL;
    if (req.body.photoProfilURL !== undefined) user.photoProfilURL = req.body.photoProfilURL;
    if (req.body.phoneNumber !== undefined) user.phoneNumber = req.body.phoneNumber;
    if (req.body.facebook !== undefined) user.facebook = req.body.facebook;
    if (req.body.instagram !== undefined) user.instagram = req.body.instagram;
    if (req.body.snapchat !== undefined) user.snapchat = req.body.snapchat;
    if (req.body.youtube !== undefined) user.youtube = req.body.youtube;
    if (req.body.tiktok !== undefined) user.tiktok = req.body.tiktok;
    if (req.body.twitter !== undefined) user.twitter = req.body.twitter;
    if (req.body.whatsapp !== undefined) user.whatsapp = req.body.whatsapp;
    if (req.body.pinterest !== undefined) user.pinterest = req.body.pinterest;
    if (req.body.linkedin !== undefined) user.linkedin = req.body.linkedin;
    if (req.body.mail !== undefined) user.mail = req.body.mail;
    if (req.body.behance !== undefined) user.behance = req.body.behance;
    if (req.body.service1 !== undefined) user.service1 = req.body.service1;
    if (req.body.service2 !== undefined) user.service2 = req.body.service2;
    if (req.body.service3 !== undefined) user.service3 = req.body.service3;
    if (req.body.service4 !== undefined) user.service4 = req.body.service4;
    if (req.body.telegram !== undefined) user.telegram = req.body.telegram;
     
  
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