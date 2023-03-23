const keycloack  = require('../keycloak/action')
const helper = require('../keycloak/helper')

const keygen = require('uuid')

let userOTP = {
    userdata: '',
    otp: '',
}

const generateOTP = async(req) => {
    let token = await helper.useTokensession(req,'access_token') ? await helper.useTokensession(req,'access_token') : ''
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    // get user info
    let response = await keycloack.getInfo(token)
    let responsedata = response.data ? response.data : ''
    // console.log(response.data)
    // encode user  info to base64
    let datauser =  helper.encode(responsedata)
    userOTP = {
        userdata :datauser,
        otp:OTP
    }
    console.log(JSON.stringify(userOTP))
    if(responsedata !== '') {
        // send Email here
        return true
    } else {
        return false
    }
}

const validateOTP = async(req) => {
    let token = await helper.useTokensession(req,'access_token') ? await helper.useTokensession(req,'access_token') : ''
      // get user info
      let response = await keycloack.getInfo(token)
      let responsedata = response.data ? response.data : ''

      // encode user  info to base64
      let datauser =  helper.encode(responsedata)
    let requestOTP = req.body.otp ? req.body.otp :''

   if(userOTP.userdata == datauser &&  userOTP.otp == requestOTP) {
    return true
   } else {
    return false
   }


}

module.exports = { generateOTP , validateOTP}