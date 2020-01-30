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
app.use(require('./routes/RouteWorkAndBelong'));
app.use(require('./routes/RouteWork'));
app.use(require('./routes/RouteBelong'));
app.use(require('./routes/RouteCSV'))

//listen port
app.listen(PORT, () => {
  console.log(`Connected by port ${PORT}`);
});