const express = require('express');
const router = express.Router();

const ServiceBelong = require('../services/ServiceBelong');

router.post('/belong', (req, res) => {
  try {
    new ServiceBelong().create(req.body)
    .then(result => {
      res.status(201).send(result);
    }).catch(error => {
      res.status(409).send(error);
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/belong', (req, res) => {
  try {
    new ServiceBelong().search(req.body)
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

router.delete('/belong', (req, res) => {
  try {
    new ServiceBelong().delete(req.body)
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
