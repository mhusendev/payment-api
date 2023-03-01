const keycloack =  require('../keycloak/action')
const helper = require('../keycloak/helper')
const register = async(req) => {
    let data = {
        enabled: false,
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
            alamat_info: [{
                label: "alamat utama",
                provinsi: req.body.province,
                kota: req.body.city,
                kecamatan: req.body.subdistrict,
                jalan: req.body.address,
                tlp: req.body.phone,
                default: true
            }],
            phone: req.body.phone,
            gender:req.body.gender,
            birth: req.body.birth
        }
    }
    let query = await keycloack.register(data)
    if (query.status !== 201) {
        return {status: query.status,data:JSON.stringify((query.data))}
    } else {
        return {status: query.status,data:JSON.stringify((query.data))}
    }
}

const getDataCustomer = async (req) => {
    var response = await helper.getInfocustomer(req)
    return response
}

const updateDataCustomer = async (req) => {
    var getinfo = await helper.getInfocustomer(req);
    var default_attr = {
        phone: '',
        first_name:'',
        last_name: '',
        gender: '',
        birth: '',
        image:'',
    }
    if (getinfo.status == 401 || getinfo.status == 400) {
        return { status:401}
    } else {
        if (getinfo.value.phone == null || getinfo.value.gender == null
            || getinfo.value.birth == null) {

        } else {
            if (getinfo.value.birth.day == null || getinfo.value.birth.month == null
                || getinfo.value.birth.year == null) {
                default_attr.birth = { day: '', month: '', year: '' }
            } else {
                default_attr.birth = {
                    day: req.body.birth.day,
                    month: req.body.birth.month,
                    year: req.body.birth.year
                }
            }

            default_attr.gender = req.body.gender
            
            default_attr.phone = req.body.phone

        }
        // console.log(default_attr)
        
        let data = {
            id: getinfo.value.sub,
            firstName : req.body.first_name,
            lastName: req.body.last_name,
            attr: {
                alamat_info: getinfo.value.alamat_info[0],
                image:getinfo.value.image,
                phone: default_attr.phone,
                gender: default_attr.gender,
                birth: default_attr.birth
            }

        }
        let query = await keycloack.update_attribute(data)
        if (query.status !== null) {
            if (query.status !== 204 || query.status !== 200 || query.status !== 201) {
                return {status:query.status,message:query.data}
            } else {
                return {status:204, message: "success update data" }
            }
        } else {
            return {status:404}
        }


    }
}

module.exports = { register, getDataCustomer, updateDataCustomer }