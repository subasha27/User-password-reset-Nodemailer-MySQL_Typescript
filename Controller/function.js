const { Sign} = require('../Models/models');
const {authschema,updateschema } = require("../utils/validation");
const bcrypt = require("bcrypt");
const {existingUserMessage,catchErrorMessage,dataNotFoundMessage} = require("../Controller/errorMessage");

const createUser = async(req,res)=>{
  try{
    const userVal = authschema.validate(req.body);
    const hashPass = await bcrypt.hash(req.body.password, 10);
    console.log(hashPass)
    const userData = {
      name: req.body.name,
      mail: req.body.mail,
      password: hashPass
    }
    if(userVal.error){
      return res.status(400).json({ message: userVal.error.details[0].message });
      }
      const existingUser = await Sign.findOne({where:{mail:userData.mail}});
      if(existingUser) {
         const msg = await existingUserMessage();
        return res.send(msg)
      }else{
        let createData = await Sign.create({where:{mail:userData.mail}});
        return res.status (200).json(`User created Successfully Created Id = ${createData.id},`)
      }
    }catch(err){
    console.error(err);
    catchErrorMessage(res);
  }
}


const updateUser = async(req,res)=>{
  try{
    const id = req.params.id;
      const upHashPass = await bcrypt.hash(req.body.password, 10);
      const upDetails=  {
        name: req.body.name,
        mail: req.body.mail,
        password: upHashPass
      }
      const userVal = updateschema.validate(req.body);
      if(userVal.error){
        return res.status(400).json({ message: userVal.error.details[0].message });
      }
      const checkUser = await Sign.findByPk(id);
      if(!checkUser) {
        dataNotFoundMessage(res);
      }
      await checkUser.update(upDetails);
      res.json({message:"Updated", data : checkUser})
  }catch(err){
    console.error(err);
    catchErrorMessage(res);
  }
}

const deleteUser = async(req,res)=>{
  try{
    const id = req.params.id;
    const checkUser = await Sign.findByPk(id);
      if(!checkUser) {
        dataNotFoundMessage(res);
      }
      await checkUser.destroy();
      res.json({message:"Deleted",})
  }catch(err){
    console.error(err);
    catchErrorMessage(res);
  }
}
const getUser = async(req,res)=>{
  try{
    const id = req.params.id;
    const checkUser = await Sign.findByPk(id);
      if(!checkUser) {
        dataNotFoundMessage(res);
      }
      res.json({ userData: checkUser });
  }catch(err){
    console.error(err);
    catchErrorMessage(res);
  }
}
const getAllUser = async(req,res)=>{
  try{
    const id = req.params.id;
    const allUsers = await Sign.findAll();
      res.json({ allData: allUsers });
  }catch(err){
    console.error(err);
    catchErrorMessage(res);
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUser
};