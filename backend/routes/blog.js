const express = require('express');
const router = express.Router();
const controller = require('../controllers/blog');

router.get('/', controller.time);


module.exports = router;
