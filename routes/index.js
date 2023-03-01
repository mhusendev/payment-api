var express = require('express');
var router = express.Router();
const passport = require('passport');
require('../keycloak/localLogin')

/* GET home page. */
router.get('/customers/login', function(req, res, next) {
  var refer =  req.headers.referer
  if(req.session.isNew) {
      return res.render('index',{domain:refer,failed:req.query.failed?req.query.failed:false})
  } else {
      return res.redirect(refer)
     
  }
});
router.post('/customers/login', passport.authenticate('local',{failureRedirect:'/customers/login?failed=Login Gagal'}), function (req, res) {
  console.log('berhasil')
  // res.redirect(req.body.domain)
  res.redirect('./api/auth/v1/api-documentation')
})
module.exports = router;
