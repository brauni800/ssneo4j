const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8080;

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: '*', credentials: true }));

//routes
app.use(require('./routes/RouteArticles'));
app.use(require('./routes/RouteMagazine'));
app.use(require('./routes/RouteAuthor'));

//listen port
app.listen(PORT, () => {
  console.log(`Connected by port ${PORT}`);
});