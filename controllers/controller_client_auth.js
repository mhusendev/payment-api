const Account = require('../models/account')
const helper = require('../keycloak/helper');
const app = require('../app');

const isThereAccount = async (apikey, app_id) => {

    try{
        const account = await Account.findOne({apikey:apikey});
        // console.log(account)
        // let result = (account.length >0)? true : false
        // return result
        let data_account = account.data
        // console.log(data_account)
        let result_data = helper.decode(data_account.toString()) ? helper.decode(data_account.toString()) :''
        
        if (JSON.parse(result_data).app_code === app_id) {
            return true
        } else {
            return false
        }


        
    }
    catch (err){
        console.log(err)
       return false
    }
}

const midleware_auth = async (req, res) => {
  let app_id = req.headers.app_id ? req.headers.app_id :''
  let apikey = req.headers.apikey ? req.headers.apikey :''

  let check_data = await isThereAccount(apikey,app_id)
 
  if(check_data) {
    res.send({message:'authorize'})
  } else {
    res.send({message:'invalid client id'})
  }
  

}

module.exports ={ midleware_auth }