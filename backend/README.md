# Mapping-Chronicles - Backend

### Descripción
Este proyecto contiene la lógica de negocio y los endpoints necesarios para que el cliente (móvil/web) pueda interactuar con la información de las rutas, usuarios y demás información necesaria para la ejecución del producto. El proyecto está desarrollado utilizando JavaScript y TypeScript para el tipado en tiempo de desarrollo, MongoDB para la persistencia de datos en bases de datos y Mongoose como ODM para poder interactuar desde el código con la base de datos.

### Tecnologías:
- Node.js v18.17.0
- Express v4.18.2
- MongoDB
- Mongoose v7.2.2
- Typescript v5.4.5
- Docker / Docker compose

### ¿Cómo ejecutarlo?
Inicialmente deben agregarse todas las variables de entorno necesarias para ejecutar el proyecto. El proyecto puede ejecutarse con Docker o con de manera local, si se ejecuta de manera local, las variables de entorno son las siguientes:
```
NODE_ENV=development
PORT=3000

USERNAME=chronicles
DB_PORT=27017
DATABASE=mongodb://user:<PASSWORD>@mongodb:27017/chronicles?authSource=admin
DATABASE_PASSWORD=root

JWT_SECRET=9999999
JWT_EXPIRES_IN="1d" # 1 day
JWT_COOKIE_EXPIRES_IN = 90

EMAIL_USERNAME=""
EMAIL_PASSWORD=""
EMAIL_HOST=""
EMAIL_PORT=""
MAPBOX_TOKEN=token321
```

Si el proyecto se inicializa con Docker, es necesario agregar las siguientes variables de entorno adicionales, las cuales se utilizan para inicializar el container de MongoDB con Docker:
```
MONGO_INITDB_ROOT_USERNAME='user'
MONGO_INITDB_ROOT_PASSWORD='root'
DB_DATABASE='chronicles'
```

#### Ejecutando con Node.js localmente
Una vez configuradas las variables de entorno, es necesario tener un servidor de MongoDB para poder persistir la información.
Teniendo esto configurado, se deben de instalar las dependencias utilizando el comando
```
npm run install
o
yarn install
```
Luego de esto se debe ejecutar el comando
```
npm run start
o
yarn install
```

#### Ejecutando con Docker
Una vez configuradas las variables de entorno, los contenedores están configurados en el archivo docker-compose.yml, entonces solo es necesario ejecutar el comando
```
docker compose up <dev o prod>
```
dependiendo del entorno, puede ser dev o prod el proyecto se ejecuta en el puerto definido.

### ¿Por qué utilizar TypeScript?
Se decidió implementar TypeScirpt para poder encontrar errores en tiempo de compilación mientras el proyecto se está desarrollando, con esto se evita el hecho de encontrar problemas cuando el proyecto ya está desplegado.

