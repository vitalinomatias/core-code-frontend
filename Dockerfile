## Build
# docker build -t full-front:0.1.0 .

## Run
# docker run -p 3000:3000 -d full-front:0.1.0

## Entrar al contenedor
# docker run -it full-front:0.1.0 /bin/bash

FROM node:18.9.0

COPY . /opt/app

WORKDIR /opt/app

ENV REACT_APP_BACKEND_BASE_URL="http://172.17.0.3:8500"

RUN npm install

# RUN npm run build

# RUN npm install -g serve

# CMD ["serve", "-s", "build"]
