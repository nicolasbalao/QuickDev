FROM node:22-alpine AS base

# Installer des outils communs dans l'image de base
RUN apk add --no-cache git bash curl build-base 


USER node
# Installer Rust en tant que l'utilisateur `appuser`
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y

# Ajouter Rust au PATH pour toutes les étapes
ENV PATH="/home/node/.cargo/bin:${PATH}"


# All deps stage
FROM base AS deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci

# Production only deps stage
FROM base AS production-deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci 

# Build stage
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build


# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /app

# Passer temporairement à `root` pour effectuer des tâches administratives
USER root

# Copier et configurer le script `start.sh`
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Créer des répertoires et attribuer les permissions à l'utilisateur `node`
RUN mkdir -p /app/projects && chown -R node:node /app/projects

# Revenir à l'utilisateur `node`
USER node

# Copier les fichiers de production
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app

EXPOSE 3333

# Utiliser le script comme CMD
CMD ["sh", "/app/start.sh"]