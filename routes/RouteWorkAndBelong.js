const express = require('express');
const router = express.Router();

const ServiceWorkAndBelong = require('../services/ServiceWorkAndBelong');

router.post('/work-belong', (req, res) => {
  try {
    new ServiceWorkAndBelong().create(req.body)
    .then(result => {
      res.status(201).send(result);
    }).catch(error => {
      res.status(409).send(error);
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/work-belong', (req, res) => {
  try {
    new ServiceWorkAndBelong().search(req.body)
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

router.delete('/work-belong', (req, res) => {
  try {
    new ServiceWorkAndBelong().delete(req.body)
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
