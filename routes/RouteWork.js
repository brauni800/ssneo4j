const express = require('express');
const router = express.Router();

const ServiceWork = require('../services/ServiceWork');

router.post('/work', (req, res) => {
  try {
    new ServiceWork().create(req.body)
    .then(result => {
      res.status(201).send(result);
    }).catch(error => {
      res.status(409).send(error);
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/work', (req, res) => {
  try {
    new ServiceWork().search(req.body)
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

router.delete('/work', (req, res) => {
  try {
    new ServiceWork().delete(req.body)
    .then(result => {
      res.send(result);
    }).catch(error => {
      res.status(404).send(error);
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
