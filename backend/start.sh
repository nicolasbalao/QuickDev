#!/bin/bash
#!/bin/sh

# Afficher les commandes exécutées pour le debug (optionnel)
set -e

echo "🔄 Running migrations..."
node ace migration:run 

echo "🌱 Running seeders..."
node ace db:seed 

echo "🚀 Starting the AdonisJS server..."
node ./bin/server.js
