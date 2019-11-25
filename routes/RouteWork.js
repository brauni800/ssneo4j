const express = require('express');
const router = express.Router();

const ServiceWork = require('../services/ServiceWork');

router.post('/w/search', (req, res) => {
  try {
    new ServiceWork().search(req.body)
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

router.post('/w', (req, res) => {
  try {
    new ServiceWork().create(req.body)
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

router.delete('/w', (req, res) => {
  try {
    new ServiceWork().delete(req.body)
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