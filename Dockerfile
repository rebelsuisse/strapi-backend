# Étape 1: Utiliser une image de base officielle avec Node.js 20.
# 'alpine' est une version très légère de Linux.
FROM node:20-alpine

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /opt/app

# Étape 2: Copier les fichiers de dépendances et les installer
# On copie ces fichiers en premier pour profiter du cache de Docker.
# Si ces fichiers ne changent pas, Docker n'exécutera pas 'npm install' à chaque fois.
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Étape 3: Copier le reste du code de votre application
COPY . .

# Étape 4: Construire l'interface d'administration de Strapi
ENV NODE_ENV=production
RUN npm run build

# Étape 5: Exposer le port sur lequel Strapi tourne
EXPOSE 1337

# Étape 6: La commande pour démarrer l'application quand le conteneur se lance
CMD ["npm", "run", "start"]
