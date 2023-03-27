var express = require('express');
const {midleware_auth} = require('../controllers/controller_client_auth')
var router = express.Router();
router.get('/test',midleware_auth)
module.exports = router;