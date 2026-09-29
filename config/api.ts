export default {
  rest: {
    defaultLimit: 100,
    // Plafond par requête. Au-delà, Strapi tronque silencieusement la réponse.
    // Le frontend (MAX_PAGE_SIZE dans src/lib/api.ts) pagine à cette taille :
    // les deux valeurs doivent rester égales.
    maxLimit: 100,
    withCount: true,
  },
};
