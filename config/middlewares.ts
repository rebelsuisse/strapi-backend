export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'strapi.io', // Pour les images du marketplace Strapi
            // Si vous utilisez un provider externe comme AWS S3, ajoutez son URL ici
            // ex: 'votre-bucket.s3.votre-region.amazonaws.com'
          ],
          'media-src': ["'self'", 'data:', 'blob:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      header: '*',
      // !!! IMPORTANT : Ajoutez ici toutes les URL de votre frontend
      origin: [
        'http://localhost:3000', // Votre frontend en développement local
        'https://www.nopasaran.ch', // Votre domaine de production
        'https://nopasaran.ch', // La version sans www
        // Vercel génère des URLs de prévisualisation pour chaque branche.
        // Ce wildcard autorise toutes les prévisualisations.
        'https://*.vercel.app',
        // Il est bon d'autoriser aussi votre propre API pour que l'admin fonctionne bien
        'https://api.nopasaran.ch'
      ]
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
