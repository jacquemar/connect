const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

// Chemin où le fichier sitemap sera sauvegardé
const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');

// Créer un flux pour le sitemap
const sitemap = new SitemapStream({ hostname: 'https://www.connect2card.com' });

// Liste des routes de votre site (ajoutez toutes les routes publiques ici)
const urls = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/home', changefreq: 'daily', priority: 0.9 },
  { url: '/profile/:userName', changefreq: 'weekly', priority: 0.8 },
  { url: '/login', changefreq: 'monthly', priority: 0.7 },
  { url: '/demande', changefreq: 'monthly', priority: 0.7 },
  { url: '/conditions-generales', changefreq: 'monthly', priority: 0.7 },
  { url: '/confidentialites', changefreq: 'monthly', priority: 0.7 },
  { url: '/mentions-legales', changefreq: 'monthly', priority: 0.7 },
  { url: '/cookies', changefreq: 'monthly', priority: 0.7 },
  { url: '/blog', changefreq: 'weekly', priority: 0.8 },
  { url: '/faq', changefreq: 'monthly', priority: 0.7 },
  { url: '/recuperer-mot-de-passe', changefreq: 'monthly', priority: 0.6 },
];

// Ajouter chaque route au sitemap
urls.forEach((url) => sitemap.write(url));

// Terminer l'écriture du sitemap et sauvegarder le fichier
sitemap.end();

streamToPromise(sitemap)
  .then((data) => {
    createWriteStream(sitemapPath).write(data.toString());
    console.log('Sitemap créé avec succès à:', sitemapPath);
  })
  .catch((err) => {
    console.error('Erreur lors de la génération du sitemap:', err);
  });
