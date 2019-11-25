const express = require('express');
const router = express.Router();

const ServiceWorkAndBelong = require('../services/ServiceWorkAndBelong');

router.post('/wb/search', (req, res) => {
  try {
    new ServiceWorkAndBelong().search(req.body)
    .then(result => {
      console.log(result);
      res.send(result);
    }).catch(error => {
      console.log(error);
      res.sendStatus(404);
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/wb', (req, res) => {
  try {
    new ServiceWorkAndBelong().create(req.body)
    .then(result => {
      console.log(result);
      res.send(result);
    }).catch(error => {
      console.log(error);
      res.status(409).send(error);
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/wb', (req, res) => {
  try {
    new ServiceWorkAndBelong().delete(req.body)
    .then(result => {
      console.log(result);
      res.send(result);
    }).catch(error => {
      console.log(error);
      res.status(404).send(error);
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;