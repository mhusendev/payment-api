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
module.exports = {useTokensession, parseJwt}


// if(token) {
//     axios -> endpoint pay -> (token->status 401) {
//         login

//     } else {
//         value
//     }
// } else {
//     axios ->login
// }

// chek token valid/tidak