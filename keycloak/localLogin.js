const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
var axios = require('axios');
var qs = require('qs');

passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
  });
passport.use(new LocalStrategy(
    {
       usernameField: "username",
       passwordField: "password"
    },
     async function(username, password, done) {
        var value
        var data = qs.stringify({
            'grant_type': 'password',
            'username': username,
            'password': password,
            'client_id': 'mallada',
            'client_secret': 'k3gGjmTtLHfBViYunEIAVqCY9hKrbj6q'
        });
        var config = {
            method: 'post',
            url: 'https://keycloak.cws.co.id/realms/mallada/protocol/openid-connect/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        }
    
        await axios(config)
        .then( (response) => {
            value = response.data
        })
        .catch( (error) => {
            console.log(error);
            //   res.sendStatus(401)
        });
      return done(null, value)
    }
  ));