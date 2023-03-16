var express = require('express');
const { isLogedin } = require('../controllers/controller_auth');
var router = express.Router();

// /* GET users listing. */
// router.get('', function(req, res, next) {
//   let token = req.session.passport.user.refresh_token || req.headers.authorization 
//   if(token) {
//     next()
//   } else {
//     res.send(401)
//   }
  
// });
// router.put('', function(req, res, next) {
//   next()
// });
// router.post('', function(req,res,next){
//   next()
// })
// router.get('/api/payment/v1/auth',isLogedin,(req,res,next)=>{next()})
router.get('/api/payment/v1/account/apikey',isLogedin,(req,res,next)=>{next()})
module.exports = router;
