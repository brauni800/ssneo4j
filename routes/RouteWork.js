const express = require('express');
const router = express.Router();

const ServiceWork = require('../services/ServiceWork');

router.post('/w/search', (req, res) => {
  try {
    new ServiceWork().search(req.body)
    .then(result => {
      console.log(result);
      res.send(result);
    }).catch(error => console.log(error));
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;