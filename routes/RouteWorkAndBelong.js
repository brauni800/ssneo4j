const express = require('express');
const router = express.Router();

const ServiceWorkAndBelong = require('../services/ServiceWorkAndBelong');

router.post('/wb/search', (req, res) => {
  try {
    new ServiceWorkAndBelong().search(req.body)
    .then(result => {
      console.log(result);
      res.send(result);
    }).catch(error => console.log(error));
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;