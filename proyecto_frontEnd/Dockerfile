# estapa de compilacion
FROM node:22.11.0 AS build

WORKDIR /app

COPY package*.json ./

RUN npm instal

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build /app/dist/proyecto-front-end/ /usr/share/nginx/html

RUN if [ -f /usr/share/nginx/html/index.csr.html ]; then mv /usr/share/nginx/html/index.csr.html /usr/share/nginx/html/index.html; fi

EXPOSE 85

CMD ["nginx", "-g", "daemon off;"]

