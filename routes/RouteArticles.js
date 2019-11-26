const express = require('express');
const router = express.Router();

const ServiceArticles = require('../services/ServiceArticles');

router.post('/article', (req, res) => {
  try {
    new ServiceArticles().create(req.body)
    .then(node => {
      res.status(201).send(node);
    }).catch(error => {
      res.status(409).send(error);
    });
  } catch (error) { 
    res.status(400).send(error);
  }
});

module.exports = router;