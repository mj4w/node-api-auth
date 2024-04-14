# node-api-auth

> [!NOTE]
> This API is Basic Authentication in Node + Express.


## npm 
npm init -y

```npm install --save express mongoose @hapi/joi bcrpyt```

```npm install morgan http-errors dotenv```

npm start using ```nodemon``` package
```node
"scripts": {
  "start": "nodemon app.js"
}
```

## send request
install extension ```Rest Client```
create a file ```rest.http```
go to file & click ```send request```

## Routes
``` /auth/register ```
``` /auth/login ```
``` /auth/logout ```
``` /auth/refresh-token ```

## Application
[Visual Studio Code](https://code.visualstudio.com/Download)

[Postman](https://www.postman.com/downloads/)

[MongoDB Community](https://www.mongodb.com/try/download/community)

## Documentation
[Joi Validation Schema](https://hapi.dev/tutorials/validation/?lang=en_US)

[JSON Web Tokens](https://jwt.io/)

[NodeJs Doc](https://nodejs.org/docs/latest/api/synopsis.html)

[Random Key Generator](https://randomkeygen.com/)

## Run JS file 
e.g.
``` nodemon ./helpers/generate_keys.js ```