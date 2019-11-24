const express = require('express');
const router = express.Router();

const ServiceWorkAndBelong = require('../services/ServiceWorkAndBelong');

router.get('/wb/sjr/:sjr', (req, res) => {
  try {
    new ServiceWorkAndBelong().getSjrBiggerThan(req.params)
    .then(result => {
      console.log(result);
      res.send(result);
    }).catch(error => console.log(error));
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;