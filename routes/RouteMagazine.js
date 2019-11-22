const express = require('express');
const router = express.Router();

const ServiceMagazine = require('../services/ServiceMagazine');

router.post('/magazine', (req, res) => {
  try {
    new ServiceMagazine().createMagazine(req.body)
    .then(node => {
      console.log(node);
      res.send(node);
    }).catch(error => console.log(error));
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get('/magazine', (req, res) => {
  try {
    new ServiceMagazine().getAll()
    .then(result => {
      console.log(result);
      res.send(result);
    }).catch(error => console.log(error));
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;