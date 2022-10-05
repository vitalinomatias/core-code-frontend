## Build Local
# docker build -t full-front:0.1.0-nginx-alpine .
## Build GCP
# docker build --build-arg REACT_APP_BACKEND_BASE_URL=http://<public_backend_endpoint>:8500 -t full-front:0.1.0-nginx-alpine-gcp .

## Publish Container Image
# docker tag full-front:0.1.0-nginx-alpine-gcp <your_username>/full-front:0.1.0-nginx-alpine-gcp
# docker push <your_username>/full-front:0.1.0-nginx-alpine-gcp

## Run
# docker run -p 3000:80 -d full-front:0.1.0-nginx-alpine

## Entrar al contenedor
# docker run -it full-front:0.1.0 /bin/bash

FROM node:18.9.0 as compilacion

COPY . /opt/app

WORKDIR /opt/app

ARG REACT_APP_BACKEND_BASE_URL=http://localhost:8500

RUN npm install

RUN npm run build

FROM nginx:1.22.0-alpine

COPY --from=compilacion /opt/app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]