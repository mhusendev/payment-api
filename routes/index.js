var express = require('express');
var router = express.Router();
const passport = require('passport');
require('../keycloak/localLogin')
const {parseJwt} = require('../keycloak/helper')

/* GET home page. */
router.get('/login', function(req, res, next) {
  var refer =  req.headers.referer
  if(req.session.isNew) {
      return res.render('login',{domain:refer,failed:req.query.failed?req.query.failed:false})
  } else {
      return res.redirect('/dashboard')
     
  }
});
router.post('/login', passport.authenticate('local',{failureRedirect:'/login?failed=Login Gagal'}), function (req, res) {
  res.send({message:'login sukses'})
})

router.get('/', (req,res) =>{
  if(req.session.isNew) {
    return res.render('index')
} else {
    return res.redirect('/dashboard')
   
}
})

router.get('/dashboard', (req,res) =>{
  if(req.session.isNew) {
    return res.redirect('/')
} else {
    let data = parseJwt(req.session.passport.user.access_token)
    return res.render('dashboard',{info:data?data:false})
   
}
})



module.exports = router;
