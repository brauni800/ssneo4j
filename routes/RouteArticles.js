const express = require('express');
const router = express.Router();

const ServiceArticles = require('../services/ServiceArticles');

router.post('/article', (req, res) => {
  try {
    new ServiceArticles().createArticle(req.body)
    .then(node => {
      console.log(node);
      res.send(node);
    }).catch(error => console.log(error));
  } catch (error) { 
    res.status(400).json({ error });
  }
});

module.exports = router;