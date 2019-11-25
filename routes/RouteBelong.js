const express = require('express');
const router = express.Router();

const ServiceBelong = require('../services/ServiceBelong');

router.post('/b/search', (req, res) => {
  try {
    new ServiceBelong().search(req.body)
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

router.post('/b', (req, res) => {
  try {
    new ServiceBelong().create(req.body)
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

router.delete('/b', (req, res) => {
  try {
    new ServiceBelong().delete(req.body)
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