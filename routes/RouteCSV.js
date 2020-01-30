const express = require('express');
const router = express.Router();
const path =  require('path');
const multer = require('multer');

const ServiceCSV = require('../services/ServiceCSV');

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, './uploads')
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage})

router.post('/upload', upload.single('file'), (req, res)=>{
    try {
        console.log(`Storage location is ${req.hostname}/${req.file.path}`);
        new ServiceCSV().readCSV('./uploads/prueba_csv.csv');
        return res.send(req.file);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;