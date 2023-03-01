const People = require('../models/people')

const getPeople = async(req) => {
try{
    const everyone = await People.find();

    return everyone

}catch (error) {
   return error
}
}

const getPeopleByid =  async (req) => {
    try{
        const someone = await People.findById(req.params.id)
        return someone;
    } catch (error) {
        return error
    }
}

const savePeople = async(req) => {
    const people = new People(req.body)
    try{
        const savepeople = await people.save()
        return 201;

    } catch (error){
       return error
    }
}

const updatePeople = async (req) => {
    const checkId = await People.findById(req.params.id)
    if(!checkId) return 404
    try{
        const updatepeople = await People.updateOne({_id:req.params.id},{$set: req.body})
       return 200
    }catch (error) {
       return error
    }
}

const killPeople =  async (req) => {
    const checkId = await People.findById(req.params.id)
    try{
      const killpeople = await People.deleteOne({_id:req.params.id})
      return 200
    }catch (error) {
        return error
    }
}

module.exports = { getPeople,getPeopleByid,savePeople,updatePeople,killPeople }