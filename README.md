
# Verificación de conocimiento (Kata)

Ejercicio para consumir APIs falsas, por medio de diferentes metodos. 
Consta de 2 partes, en la primera se consume la fake API de json server para consultar un listado de usuarios
por medio de 5 metodologías diferentes: 
- Usando el objeto XMLHttprequest.
- Usando la API Fetch con la sintaxis de promesas.
- Usando la API Fetch con la sintaxis de async-await.
- Usando la librería de Axios con la sintaxis de promesas.
- Usando la librería de Axios con la sintaxis de async-await.

En la segunda parte puedes hacer todas las operaciones del CRUD en una lista de caballeros por medio de una API falsa
 usando la dependencia de json server. 
 
## Video
https://youtu.be/EqVGQA769_s

## Preguntas:
- Podemos usar Axios de manera nativa en Java Script?
- Cual es uno de los motivos por los que sería más conveniente usar Axios en lugar de fetch?
- Cual es la ventaja de usar asincronismo en Java Sript?


## Antes de correr

Instale json server

```bash
  npm i json-server
```

Corra el siguiente comando

```bash
  json-server --watch assets/db.json
```

Abra el archivo index.html con Live Server o una extensión similar


Puede descargar la extensión.

```bash
  https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
```


## Authors

- [@mateog147](https://github.com/mateog147)

