# Mapping-Chronicles - Frontend

### Descripción
Este proyecto es la interfaz de usuario del sistema Mapping-Chronicles, que permite a los usuarios interactuar con la información de las rutas, usuarios y otros datos relevantes. Está desarrollado con React utilizando JavaScript, y emplea diversas librerías para la gestión de estado, manejo de mapas, y diseño de la interfaz.

### Tecnologías:
- React v18.2.0
- Material-UI (Core v4.12.4, Icons v4.11.3)
- Axios v1.4.0
- Mapbox GL JS v2.14.1
- React Map GL v7.0.23
- React Map GL Geocoder v2.2.0
- SweetAlert v2.1.2
- Timeago.js v4.0.2

### ¿Cómo ejecutarlo?
Inicialmente, deben configurarse las variables de entorno necesarias para ejecutar el proyecto. Las variables de entorno se almacenan en un archivo `.env` en la raíz del proyecto. Un ejemplo de archivo `.env` podría ser:


REACT_APP_MAPBOX_TOKEN=your_mapbox_token_here
REACT_APP_API_URL=http://localhost:5000/api


#### Ejecutando localmente
1. **Instalar dependencias:**  
   Ejecutar el siguiente comando para instalar todas las dependencias necesarias:
	```bash
   npm install
   yarn install
   ```
2. **Iniciar el servidor de desarrollo**
Para iniciar la aplicación en modo de desarrollo, ejecutar:
	  ```bash
   npm start
   yarn start 
   ```

3. **Construir la aplicación:**
Para preparar la aplicación para producción, ejecutar:
	```bash
	npm start
	yarn start 
	```

### ¿Por qué utilizar React?

React es una biblioteca de JavaScript para construir interfaces de usuario. Se decidió usar React por su capacidad de crear aplicaciones web interactivas y dinámicas de manera eficiente. La utilización de componentes reutilizables y un sistema de gestión de estado avanzado permite un desarrollo más rápido y mantenimiento más sencillo del código.


### Scripts disponibles

En el archivo `package.json`, se han definido varios scripts para automatizar tareas comunes:

-   `start`: Inicia la aplicación en modo de desarrollo.
-   `build`: Construye la aplicación para producción.
-   `test`: Ejecuta las pruebas.
-   `eject`: Expone la configuración de Create React App para personalización avanzada.

### Configuración de ESLint

El proyecto está configurado para utilizar ESLint con las configuraciones recomendadas para aplicaciones React, asegurando que el código sea consistente y libre de errores comunes.

### Browserslist
El proyecto está configurado para ser compatible con las siguientes versiones de navegadores:

### Proxy
Para el desarrollo local, se ha configurado un proxy en `package.json` para redirigir las solicitudes API al backend:

	```bash
	"proxy": "http://localhost:5000/api"
	```
	
Esto permite que las solicitudes desde el frontend al backend sean manejadas sin problemas de CORS durante el desarrollo.
