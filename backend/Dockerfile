FROM node:22-alpine AS base

# Installer des outils communs dans l'image de base
RUN apk add --no-cache git bash curl build-base && \
    curl https://sh.rustup.rs -sSf | sh -s -- -y && \
    apk add --no-cache go

# Ajouter Rust au PATH pour toutes les étapes
ENV PATH="/root/.cargo/bin:${PATH}"

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
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
EXPOSE 3333

# Ajouter le script start.sh
COPY start.sh /app/start.sh
# Donner les permissions d'exécution au script
RUN chmod +x /app/start.sh
# Utiliser le script comme CMD
CMD ["sh", "/app/start.sh"]