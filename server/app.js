const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const nodemailer = require('nodemailer');
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
const QRCode = require('qrcode');
const exphbs = require('express-handlebars');
const { Client } = require("@notionhq/client");
const app = express();
const User = require('./models/Users');
const useragent = require('useragent');
const Demande = require('./models/Demandes');
app.use(cors());
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));

// Configuration moteur de templates Handlebars

app.engine('handlebars', exphbs.engine({ extname: '.handlebars', defaultLayout: false }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
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
const notion = new Client({ auth: process.env.NOTION_TOKEN})
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
const Users = require('./models/Users');
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

// Route pour supprimer un user
app.delete('/api/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Chercher la demande par son ID et la supprimer
    const deletedUser = await Users.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvée' });
    }

    res.status(200).json({ message: 'Utilisateur supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression Utilisateur :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression Utilisateur' });
  }
});

app.post('/api/users/:userName/increment-visit', async (req, res) => {
  try {
    const { userName } = req.params;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Réinitialiser l'heure à minuit

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si une entrée existe déjà pour aujourd'hui
    const todayEntry = user.visitsHistory.find(entry => 
      entry.date.toISOString().split('T')[0] === today.toISOString().split('T')[0]
    );

    if (todayEntry) {
      // Incrémenter le compteur existant
      todayEntry.count += 1;
    } else {
      // Ajouter une nouvelle entrée pour aujourd'hui
      user.visitsHistory.push({ date: today, count: 1 });
    }

    // Incrémenter le compteur total de visites
    user.visitscount += 1;

    await user.save();

    res.json({ message: 'Visite enregistrée avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la visite:', error);
    res.status(500).json({ message: 'Erreur serveur' });
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
    // Générer l'URL du profil
    const profileUrl = `https://connect2card.com/profile/${demande.userName}`;
    // Générer le QR code à partir de l'URL
    const qrCodeImage = await QRCode.toDataURL(profileUrl);
    // Ajouter l'utilisateur à la collection 'users'
    const newUser = new User({
      userName: demande.userName,
      phoneNumber: demande.phoneNumber,
      password: demande.password,
      email: demande.email,
      qrCode: qrCodeImage
    });
    await newUser.save();

    res.status(200).json({ message: 'Demande approuvée avec succès', qrCode: qrCodeImage });
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

// Route pour supprimer une demande
app.delete('/api/demandes/:id', async (req, res) => {
  try {
    const demandeId = req.params.id;

    // Chercher la demande par son ID et la supprimer
    const deletedDemande = await Demande.findByIdAndDelete(demandeId);

    if (!deletedDemande) {
      return res.status(404).json({ message: 'Demande non trouvée' });
    }

    res.status(200).json({ message: 'Demande supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la demande :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la demande' });
  }
});

  app.get("/api/demandes", (req, res) => {
    Demandes.find()
      .sort({ orderDate: -1 })
      .then((demande) => res.status(200).json(demande))
      .catch((error) => res.status(400).json({ error }));
  });

  app.get("/api/users", (req, res) => {
    Users.find()
      .sort({ orderDate: -1 })
      .then((user) => res.status(200).json(user))
      .catch((error) => res.status(400).json({ error }));
  });

// Route pour la demande de carte
app.post("/create-demande", async (req, res) => {
  console.log('Requête reçue pour créer une demande');
  const currentDate = new Date().toISOString();
  const DemandedbId = process.env.NOTION_DEMANDE_DATABASE_ID;

  const nodemailer = require('nodemailer');
 // Configurer le transporteur Nodemailer avec Amazon WorkMail
 let transporter = nodemailer.createTransport({
  host: process.env.USERHOST,
  port: 465,
  secure: true, 
  auth: {
    user: process.env.USERSMTP,
    pass: process.env.PASSWORDSMTP,
  },
});
  try {
    console.log('Recherche de l\'utilisateur dans la base de données');

    // Recherche si l'utilisateur existe déjà dans la base de données
    const existingUser = await User.findOne({ userName: req.body.userName });
    if (existingUser) {
      console.log('Utilisateur existant trouvé');
      return res.status(400).json({ error: 'Cet utilisateur est déjà utilisé.' });
    }

    console.log('Utilisateur non trouvé, création de la demande');

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log('Mot de passe hashé');

    // Création d'une nouvelle demande
    const newDemande = new Demande({
      userName: req.body.userName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: hashedPassword,
      nom: req.body.nom,
      prenom: req.body.prenom,
      date: req.body.date
    });

    console.log('Envoi de l\'e-mail');
    // Rendre le template Handlebars en HTML
    app.render('emails/demande', {
      userName: req.body.userName,
      nom: req.body.nom,
      prenom: req.body.prenom,
      date: req.body.date,
      phone: req.body.phoneNumber,
      email: req.body.email,
    }, async (err, html) => {
      if (err) {
        console.error('Erreur lors du rendu du template :', err);
        return res.status(500).json({ error: 'Erreur serveur lors du rendu de l\'email.' });
      }

      // Sauvegarder la nouvelle demande dans la base de données
      await newDemande.save();
      console.log('Nouvelle demande enregistrée');
      // ENREGISTREMENT DANS NOTION 
      const newPage = await notion.pages.create({
        parent: {
          type: "database_id",
          database_id: DemandedbId,
        },
        properties: {
          Nom: {
            title: [
              {
                text: {
                  content: req.body.nom,
                },
              },
            ],
          }, 
          Prenom: {
            rich_text: [
              {
                text: {
                  content: req.body.prenom,
                },
              },
            ],
          },
          Prix: {
            number: 20000,
          },
          Date: {
            date: {
              start: currentDate ,
            },
          },
          Téléphone: {
            phone_number: req.body.phoneNumber,
          },
          Email: {
            email: req.body.email, 
          },
          Password: {
            rich_text: [
              {
                text: {
                  content: req.body.password,
                },
              },
            ],
          },
          Pseudo: {
            rich_text: [
              {
                text: {
                  content: req.body.userName,
                },
              },
            ],
          },
        },
      });
      // Réponse de succès
      res.status(201).json({ message: 'Demande enregistrée avec succès', data: newPage });
      console.log("Page notion crée : ");
       // Envoyer l'e-mail
       const info = await transporter.sendMail({
        from: '"CONNECT TEAM" <support@connect2card.com>',
        to: req.body.email, 
        subject: `Félicitation 🎉 ${req.body.userName} `, 
        html: html, // HTML body
      });

      console.log("E-mail envoyé : %s", info.messageId);
    });

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
      if (!user.isActive) {
        return res.status(403).json({ error: 'Le profil est désactivé' });
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
    if (req.body.web !== undefined) user.web = req.body.web;
    if (req.body.googleReview !== undefined) user.googleReview = req.body.googleReview;
    if (req.body.tripadvisor !== undefined) user.tripadvisor = req.body.tripadvisor;
    if (req.body.behance !== undefined) user.behance = req.body.behance;
    if (req.body.service1 !== undefined) user.service1 = req.body.service1;
    if (req.body.service2 !== undefined) user.service2 = req.body.service2;
    if (req.body.service3 !== undefined) user.service3 = req.body.service3;
    if (req.body.service4 !== undefined) user.service4 = req.body.service4;
    if (req.body.telegram !== undefined) user.telegram = req.body.telegram;
     
      // Décrémenter le crédit de l'utilisateur
    if (user.credit > 0) {
      user.credit -= 1;
    }
      // Enregistrer les modifications dans la base de données
      await user.save();
  
      // Répondre avec un statut de succès
      res.status(200).json({ message: 'Profil utilisateur mis à jour avec succès', remainingCredits: user.credit });
    } catch (error) {
      // En cas d'erreur, renvoyer une réponse avec un code d'erreur
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du profil utilisateur' });
    }
  });

  app.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;

 let transporter = nodemailer.createTransport({
  host: process.env.USERHOST,
  port: 465,
  secure: true, 
  auth: {
    user: process.env.USERSMTP,
    pass: process.env.PASSWORDSMTP,
  },
});
    
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }
  
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 heure
    await user.save();
     // Obtenir l'adresse IP
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Obtenir le navigateur et le système d'exploitation
  const agent = useragent.parse(req.headers['user-agent']);
  const browser = agent.toAgent();
  const os = agent.os.toString();
    const mailOptions = {
      to: user.email,
      from: '"CONNECT TEAM" <support@connect2card.com>',
      subject: 'Réinitialisation de mot de passe',
      template: 'emails/reset',
      context: {
        userName: user.userName,
        nom: user.nom,
        prenom: user.prenom,
        date: user.date,
        phone: user.phoneNumber,
        email: user.email,
        resetLink: `http://${req.headers.host}/reset-password/${token}`,
        ipAddress: ipAddress,
        browser: browser,
        os: os,
      }
    };
  
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', err);
        return res.status(500).send('Erreur lors de l\'envoi de l\'e-mail');
      }
      res.status(200).send('Un e-mail de réinitialisation a été envoyé à ' + user.email);
    });
  });

  // Route pour activer un utilisateur
app.patch('/activate-profile/:userName', async (req, res) => {
  try {
    const userName = req.params.userName;
    const user = await User.findOneAndUpdate(
      { userName },
      { isActive: true },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.status(200).json({ message: 'Profil activé avec succès', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l\'activation du profil' });
  }
});

// Route pour désactiver un utilisateur
app.patch('/api/users/:userName/toggle-status', async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await User.findOne({ userName });
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({ 
      message: `Profil ${user.isActive ? 'activé' : 'désactivé'} avec succès`,
      isActive: user.isActive 
    });
  } catch (error) {
    console.error('Erreur lors du basculement du statut du profil:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

//route pour les statistiques

app.get('/api/users/:userName/visits-history', async (req, res) => {
  try {
    const { userName } = req.params;
    const { period } = req.query; // 'day', 'week', 'month', 'quarter'
    
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const now = new Date();
    let startDate;

    switch(period) {
      case 'day':
        startDate = new Date(now.setDate(now.getDate() - 1));
        break;
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'quarter':
        startDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      default:
        startDate = new Date(now.setDate(now.getDate() - 7)); // default to week
    }

    const visitsHistory = user.visitsHistory.filter(visit => visit.date >= startDate);

    // Agréger les visites par jour
    const aggregatedVisits = visitsHistory.reduce((acc, visit) => {
      const date = visit.date.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += visit.count;
      return acc;
    }, {});

    const formattedData = Object.keys(aggregatedVisits).map(date => ({
      name: date,
      visits: aggregatedVisits[date]
    }));

    res.json(formattedData);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique des visites:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

//suspendre/réactiver un compte
app.patch('/api/users/:userName/toggle-suspension', async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await User.findOne({ userName });
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    user.isSuspended = !user.isSuspended;
    if (user.isSuspended) {
      user.isActive = false; // Désactiver le profil si le compte est suspendu
    }
    await user.save();

    res.status(200).json({ 
      message: `Compte ${user.isSuspended ? 'suspendu' : 'réactivé'} avec succès`,
      isSuspended: user.isSuspended,
      isActive: user.isActive
    });
  } catch (error) {
    console.error('Erreur lors de la modification de l\'état de suspension:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});



module.exports = app;