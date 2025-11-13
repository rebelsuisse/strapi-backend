'use strict';

const { ValidationError } = require('@strapi/utils').errors;

console.log("✅ Fichier de lifecycle pour 'the-wall-of-shame' loaded !");

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    // Pour une relation, on vérifie que la clé 'sujet' est présente ET qu'elle n'est pas nulle.
    // L'ID 0 n'est pas valide, donc on peut simplement vérifier si la valeur est "truthy".
    if (!data.sujet) {
      throw new ValidationError('At least one Subject is mandatory');
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    // On vérifie si quelqu'un essaie de déconnecter le sujet.
    // En général, lors d'une mise à jour, la relation est envoyée comme { disconnect: [...] } ou { connect: [...] }
    // La vérification la plus simple est de s'assurer que si 'sujet' est dans les données, il n'est pas nul.
    if (data.sujet === null) {
      throw new ValidationError('Subject cannot be removed');
    }
  }
};
