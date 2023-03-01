const keycloack  = require('../keycloak/action')
const validation = require('../keycloak/helper')
const midleware = async(req) => {
  
    let permission = false;

    let token = await validation.useTokensession(req) ? await validation.useTokensession(req) : ''
    let userAuth = await keycloack.authKeycloack(token)
    if(!userAuth) return  false

    return true
}

module.exports = { midleware }