const express = require('express');
const parseCSVFile = require('../workers/parse-csv');
const router = express.Router();

router.get('/', parseCSVFile);

module.exports = router;
