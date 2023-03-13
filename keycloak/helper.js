const keycloack = require('./action')


function useTokensession(req,type) {
    // console.log(req.session)
   if(type === "refresh_token"){
    // console.lnah og(req.session)
    if (req.session) {
        if (!req.session.passport) {
            return ''
        } else {
            if (req.session.passport.user.refreshToken) {
                return req.session.passport.user.refreshToken
            } else {
                return req.session.passport.user.refresh_token
            }
        }
    }
   }else if(type === "access_token"){
    if (req.session) {
        if (!req.session.passport) {
            return ''
        } else {
            if (req.session.passport.user.access_token) {
                return req.session.passport.user.access_token
            } 
        }
    }
   } else {
    let headers;
    let token;
    if (req.headers.authorization != null) {
        headers = req.headers.authorization
        token = headers && headers.split(' ')[1]
        // console.log(token)
        return token
    } else {
        return ''
    }
}
}
function decode_base64(text) {
    const result = isJson(new Buffer.from(text, 'base64').toString('utf-8'))
    return result
}
function isJson(str) {
    let json_string = str;
    try {
        JSON.parse(json_string);
        return json_string
    } catch (e) {
        return false;
    }
    // return json_string;
}
function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}


async function getInfocustomer(req) {
    let headers;
    var results = {
        status: '',
        value: ''
    }
    if (req.headers.authorization != null) {
        headers = req.headers.authorization
        //   console.log(true)
    }


    if (!headers) {
        if (!req.session) {
            // const req_session = session && session.split(' ')[1]

            res.sendStatus(401)

        } else {
            let session = await useTokensession(req)

            let view = await keycloack.getInfo(req, session)
            logs.info("lihat data user")
            if (view.status !== 200 || view.status !== 201
                || view.status !== 204) {
                results.status = view.status
                results.value = view.data
            }
            else {
                results.status = view.status
                results.value = view.data
            }

        }

    } else {
        // const req_token = headers && headers.split(' ')[1]
        // const get_token = JSON.parse(helper.decode_base64(req_token))
        let token = headers && headers.split(' ')[1]

        let view = await keycloack.getInfo(req, token)
        //   console.log(view)
        if (view != null) {
            if (view.status !== 200 || view.status !== 201
                || view.status !== 204) {
                results.status = view.status
                results.value = view.data

            }
            else {
                results.status = view.status
                results.value = view.data
            }
        } else {
            results.value = { message: "user not found" }
            results.status = 405
        }
    }
    return results
}

module.exports = {useTokensession, parseJwt,getInfocustomer}