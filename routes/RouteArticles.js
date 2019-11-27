const express = require('express');
const router = express.Router();

const ServiceArticles = require('../services/ServiceArticles');

router.post('/article', (req, res) => {
  try {
    new ServiceArticles().create(req.body)
    .then(node => {
      res.status(201).send(node);
    }).catch(error => {
      res.status(409).send(error);
    });
  } catch (error) { 
    res.status(400).send(error);
  }
});

router.get('/article', (req, res) => {
  try {
    new ServiceArticles().search(req.body)
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

router.delete('/article', (req, res) => {
  try {
    new ServiceArticles().delete(req.body)
    .then(result => {
      res.send(result);
    }).catch(error => {
      if (typeof error === 'string') res.status(404).send(error);
      else res.status(409).send(error.code);
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
