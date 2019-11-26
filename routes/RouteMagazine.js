const express = require('express');
const router = express.Router();

const ServiceMagazine = require('../services/ServiceMagazine');

router.post('/magazine', (req, res) => {
  try {
    new ServiceMagazine().create(req.body)
    .then(node => {
      res.status(201).send(node);
    }).catch(error => {
      res.status(409).send(error);
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/magazine', (req, res) => {
  try {
    new ServiceMagazine().search(req.body)
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

router.delete('/magazine', (req, res) => {
  try {
    new ServiceMagazine().delete(req.body)
    .then(result => {
      res.send(result);
    }).catch(error => {
      res.status(404).send(error.code);
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
