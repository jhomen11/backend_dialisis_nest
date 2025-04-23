# Usa la imagen oficial de Node.js con Alpine (más ligera)
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Instala dependencias globales útiles para desarrollo
RUN npm install -g @nestjs/cli nodemon

# Copia los archivos de configuración de paquetes primero
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Instala las dependencias del proyecto (incluyendo devDependencies)
RUN npm install

# Copia todo el código fuente (se excluirá lo del .dockerignore)
COPY . .

# Puerto para la aplicación (ajusta según tu configuración)
EXPOSE 3000

# Puerto para depuración (opcional)
EXPOSE 9229

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "start:dev"]