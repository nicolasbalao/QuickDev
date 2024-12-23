FROM node:22-alpine AS builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

ARG VITE_BACKEND_URL

ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

COPY package.json ./

RUN npm install

COPY . ./

# Target dev
FROM builder AS dev
CMD ["npm", "run", "dev"]


FROM builder AS prod-builder
RUN npm run build

# TARGET prod
FROM nginx:latest AS prod

COPY --from=prod-builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]