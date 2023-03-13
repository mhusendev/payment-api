var axios = require('axios');
const { json } = require('body-parser');
var qs = require('qs');
const { config_keycloak }= require('./config')




const authKeycloack = async (token) => {
    var value;
    var data = qs.stringify({
        'token': token,
        'client_id': config_keycloak.payment_client_id,
        'client_secret': config_keycloak.payment_client_secret
    });
    var config = {
        method: 'post',
        url: 'https://keycloak.cws.co.id/realms/mallada/protocol/openid-connect/token/introspect',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    await axios(config)
        .then((response) => {
            let hasil = response.data;

            if (hasil.active == false) {
                value = false
                // console.log(value)
            } else {
                // console.log(hasil)
                value = true

            }
        })
        .catch((error) => {
            console.log("data eror");
            value = false
            //   res.sendStatus(401)
        });

    return value
}
const getToken = async (req,reftoken) => {
    //    let session = await req.session
        var value;
        // console.log(reftoken)
        var data = qs.stringify({
            'refresh_token': reftoken,
            'client_id': config_keycloak.payment_client_id,
            'client_secret': config_keycloak.payment_client_secret,
            'grant_type': 'refresh_token'
        });
        var config = {
            method: 'post',
            url: 'https://keycloak.cws.co.id/realms/mallada/protocol/openid-connect/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };
        // console.log(JSON.stringify(config))
        await axios(config)
            .then((response) => {
                
                // console.log(response)
                let token = response.data
                 
                // console.log(response.status)
                //    console.log(token.status)
                if (response.status == 400) {
                    value ={status: false, session: req.session }
                } else {
                    //   console.log("ini sesi"+session)
                    // console.log(response.data)
                    
                    req.session = {
                        passport: {
                            user: {
                                access_token: token.access_token,
                                refresh_token: token.refresh_token,
                               
                            }
                        }
                    }
                     session_to_b = {
                        passport: {
                            user: {
                                access_token: token.access_token,
                                refresh_token: token.refresh_token,
                               
                            }
                        }
                     }
                    if(req.session == null) {
                        value = {status: true, session: session_to_b}
                    }
                    value ={status: true, session: req.session }
                    // console.log(JSON.stringify(req.session))
                }
    
            })
            .catch((error) => {
    
                //   res.sendStatus(401)
                value ={status: false, session: req.session }
                // console.log(error)
            });
    
        return value
    }
    


const getInfo = async (access_token) => {
    var value;
    //    console.log(reftoken)
 
        var config = {
            method: 'GET',
            url: 'https://keycloak.cws.co.id/realms/mallada/protocol/openid-connect/userinfo',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },

        };

        await axios(config)
            .then((response) => {


                value = response
                // console.log(response)

            })
            .catch((error) => {
                // console.log(error);
                // console.log(error)
                value = error.response
            });

    


    return value
}

const logOut = async (refToken) => {
    var value;
    var data = qs.stringify({
        'refresh_token': refToken,
        'client_id': config_keycloak.payment_client_id,
        'client_secret': config_keycloak.payment_client_secret
    });
    var config = {
        method: 'post',
        url: 'https://keycloak.cws.co.id/realms/mallada/protocol/openid-connect/logout',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };
    await axios(config)
        .then((response) => {
            value = response.status
        })
        .catch((error) => {
            console.log(error)
            //   res.sendStatus(401)
        });

    return value

}

const update_password = async (data) => {
    var value ;
    var tokenadmin = await token_admin();
    var sendata = {
        credentials: data.credentials,

    }
    var config = {
        method: 'put',
        url: 'https://keycloak.cws.co.id/admin/realms/mallada/users/'+data.id,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenadmin
        },
        data: sendata
    }
    await axios(config)
    .then((response) => {
        value = response
    })
    .catch((error) => {
        // console.log(error)
        value = error.response
    });

return value
}
const token_admin = async () => {
    var value;
    var data = qs.stringify({
        'grant_type': 'client_credentials',
        'client_id': config_keycloak.admin_client_id,
        'client_secret': config_keycloak.admin_client_secret
    });
    var config = {
        method: 'post',
        url: 'https://keycloak.cws.co.id/realms/master/protocol/openid-connect/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',

        },
        data: data
    }

    await axios(config)
        .then((response) => {
            value = response.data.access_token
        })
        .catch((error) => {
            console.log("eror get tokenadmin");
            //   res.sendStatus(401)
        });

    return value
}

const register = async (data) => {
    var tokenadmin = await token_admin();
    var value
   
    var sendata = {
        enabled: data.enabled,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        credentials: data.credentials,
        groups: [],
        attributes: {
           app_code: data.attributes.app_code,
           app_name:data.attributes.app_name,
           contact:JSON.stringify(data.attributes.contact),
           date_created:data.attributes.date_created,
           url_notification: data.attributes.url_notification                          
          
        }
    }
    // console.log(sendata)
    var config = {
        method: 'post',
        url: 'https://keycloak.cws.co.id/admin/realms/mallada/users',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenadmin
        },
        data: sendata
    }
    await axios(config)
        .then((response) => {
            value = response
            // console.log(response)
        })
        .catch((error) => {
            // console.log(error)
            value = error.response
        });

    return value
}

const update_attribute = async (data) => {
    var tokenadmin = await token_admin();
    var value
    var sendata
    if (data != null) {
        if (data.hasOwnProperty('attr')) {
            sendata = {
                attributes: {
                    alamat_info: JSON.stringify(data.attr.alamat_info),
                    birth: JSON.stringify(data.attr.birth),
                    phone: data.attr.phone,
                    image:JSON.stringify(data.attr.image),
                    gender: data.attr.gender,
                }
            }

        } else {
            sendata = data
        }

        var config = {
            method: 'put',
            url: 'https://keycloak.cws.co.id/admin/realms/mallada/users/' + data.id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenadmin
            },
            data: sendata
        }
        await axios(config)
            .then((response) => {
                value = response
            })
            .catch((error) => {
                // console.log("eror di update")
                // console.log(error)
                value = error.response
            });
    } else {
        value = { status: 405, message: 'invalid parameter' }
    }
    return value
}

const SearchEmail = async (email) => {
    var tokenadmin = await token_admin();
    var value
   
    
    // console.log(sendata)
    var config = {
        method: 'GET',
        url: 'https://keycloak.cws.co.id/admin/realms/mallada/users?email='+email,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenadmin
        }
    }
    await axios(config)
        .then((response) => {
            value = response
       
        })
        .catch((error) => {
            // console.log(error)
            value = error.response
        });

    return value
}
const find_Email_token_valid = async (email,token) => {
    var tokenadmin = await token;
    var value
   
    
    // console.log(sendata)
    var config = {
        method: 'GET',
        url: 'https://keycloak.cws.co.id/admin/realms/mallada/users?email='+email,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenadmin
        }
    }
    await axios(config)
        .then((response) => {
            value = response
       
        })
        .catch((error) => {
            // console.log(error)
            value = error.response
        });

    return value
}

module.exports = { 
    update_password,
    authKeycloack, 
    token_admin,
    register, 
    logOut, 
    getInfo, 
    update_attribute,
    getToken,
    find_Email_token_valid,
    SearchEmail }