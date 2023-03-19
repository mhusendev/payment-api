const keycloack  = require('../keycloak/action')
const validation = require('../keycloak/helper')
const keygen = require('uuid')
const Account = require('../models/account')
const midleware = async(req) => {
  

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

    console.log(revalidation)

    return revalidation
}



const revalidate = async(req,userAuth) => {

    if(userAuth == false) {
        let token = await validation.useTokensession(req,'refresh_token') ? await validation.useTokensession(req,'refresh_token') : await validation.useTokensession(req,'token')

        let regenerate = await keycloack.getToken(req,token)
        // console.log("ini generate"+JSON.stringify(regenerate))
        return regenerate
        
    
    } else {
        return {status:true,session:{}}
    }
}

const isLogedin = async(req,res,next)=>{
    let getAuth = await midleware(req)
    // console.log('ini auth:'+getAuth)
    // console.log(req.session)
    if(!getAuth.status) {
    res.sendStatus(401)
    }else{
        next()
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
    let token = await validation.useTokensession(req,'access_token') ? await validation.useTokensession(req,'access_token') : ''
    var response = await keycloack.getInfo(token)
    // console.log(response)
    return response
}

const checkKey = async(data) =>{
    try {
        const account = await Account.find({data:data});
        let result = (account.length >0)? true : false
        return result
    } catch (error) {
        return false
    }

}


const generateKey = async(req)=> {
    let token = await validation.useTokensession(req,'access_token') ? await validation.useTokensession(req,'access_token') : ''
    let response = await keycloack.getInfo(token)
    let responsedata = response.data ? response.data : ''
    // console.log(response.data)
    let datauser =  validation.encode(responsedata)
    let uid =  keygen.v4()

    try{
        let checkuid = await checkKey(datauser)
        console.log(checkuid)
        if(!checkuid) {
          let data = new Account({apikey:uid, data: datauser})
          const savedata = await data.save()
          console.log(savedata)
          return {apikey:uid}
        } else {
            const updatekey = await Account.updateOne({data:datauser}, {$set: {apikey:uid}});
            console.log('data') 
            return {apikey:uid}
        }
    } catch {
        console.log('gagal')
        return ''
    }


}

module.exports = { midleware , register,getAccountData,isLogedin,generateKey }