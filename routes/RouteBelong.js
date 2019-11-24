const express = require('express');
const router = express.Router();

const ServiceBelong = require('../services/ServiceBelong');

router.post('/b/search', (req, res) => {
  try {
    new ServiceBelong().search(req.body)
    .then(result => {
      console.log(result);
      res.send(result);
    }).catch(error => console.log(error));
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;