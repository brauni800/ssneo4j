const express = require('express');
const router = express.Router();

const ServiceAuthor = require('../services/ServiceAuthor');

router.post('/author', (req, res) => {
  try {
    new ServiceAuthor().createAuthor(req.body)
    .then(node => {
      console.log(node);
      res.send(node);
    }).catch(error => console.log(error));
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get('/author', (req, res) => {
  try {
    new ServiceAuthor().search(req.body)
    .then(result => {
      res.send(result);
    }).catch(error => {
      if (!error) res.sendStatus(404);
      else res.status(400).send(error.code);
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;