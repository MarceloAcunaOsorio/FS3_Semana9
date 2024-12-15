# estapa de compilacion
FROM node:22.11.0 AS dev-deps

WORKDIR /app

COPY package*.json ./

RUN npm instal

# etapa 2

FROM node:22.11.0 AS builder

WORKDIR /app

COPY --from=dev-deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

# etapa de produccion
FROM nginx:1.23.3 AS prod

# Expose port 85
EXPOSE 8085

COPY --from=builder /app/dist/proyecto-front-end/browser/ /usr/share/nginx/html

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
