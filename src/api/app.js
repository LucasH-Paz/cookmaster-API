const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { handleErrors } = require('../Middlewares/erros');
const { validateNewUser, validateLogin, validateNewRecipe } = require('../Middlewares/usersMid');
const validateJWT = require('./auth/validateJWT');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

const apiRoutes = express.Router();
apiRoutes.post('/users', validateNewUser, routes.createUser);
apiRoutes.post('/login', validateLogin, routes.login);
apiRoutes.post('/recipes', validateJWT, validateNewRecipe, routes.createRecipe);
apiRoutes.get('/recipes/:id', routes.getById);
apiRoutes.get('/recipes', routes.getAll);
apiRoutes.put('/recipes/:id', validateJWT, validateNewRecipe, routes.update);
apiRoutes.delete('/recipes/:id', validateJWT, routes.remove);

app.use(apiRoutes);
app.use(handleErrors);

module.exports = app;

// FONTE: https://github.com/tryber/nodejs-jwt-base-project/blob/block-28-3/src/api/app.js
