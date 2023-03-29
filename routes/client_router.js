var express = require('express');
const {midleware_auth} = require('../controllers/controller_client_auth')
var router = express.Router();
router.post('/api/payment/v1/transaction/pay',midleware_auth,(req,res,next)=>{next()})
module.exports = router;