const keycloack  = require('../keycloak/action')
const validation = require('../keycloak/helper')
const midleware = async(req) => {
  
    let permission = false;
    let token ;
    headers = req.headers['btob'] ? true: false
    if(headers){
        token = await validation.useTokensession(req,'token')
    } else{
        token = await validation.useTokensession(req,'access_token')
    }

    let userAuth = await keycloack.authKeycloack(token)
    let auth_to_validation = {
        status:userAuth,
        session: {}
    } 
    let revalidation = await revalidate(req,auth_to_validation.status)

    //  console.log(JSON.stringify(req.session))

    return revalidation
}

const revalidate = async(req,userAuth) => {

    if(userAuth == false) {
        let token = await validation.useTokensession(req,'refresh_token') ? await validation.useTokensession(req,'refresh_token') : await validation.useTokensession(req,'token')

        let regenerate = await keycloack.getToken(req,token)
   
        return regenerate
        
    
    } else {
        return {status:true,session:{}}
    }
}
const register = async(req) => {
    let data = {
        enabled: true,
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        credentials: [
            {
                type: "password",
                value: req.body.password,
                temporary: false
            }
        ],
        groups: [],
        attributes: {
            app_code: req.body.app_code,
            app_name:req.body.app_name,
            contact:req.body.contact,
            date_created:req.body.date_created,
            url_notification: req.body.url_notification   
        }
    }
    let query = await keycloack.register(data)
    // console.log(query)
    if (query.status !== 201) {
        return {status: query.status,data:JSON.stringify((query.data))}
    } else {
        return {status: query.status,data:JSON.stringify((query.data))}
    }
}

const getAccountData = async (req) => {
    let token = await helper.useTokensession(req,'access_token') ? await helper.useTokensession(req,'access_token') : ''
    var response = await keycloack.getInfo(token)
    console.log(response)
    return response
}


module.exports = { midleware , register,getAccountData }