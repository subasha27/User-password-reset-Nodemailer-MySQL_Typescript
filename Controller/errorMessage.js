

const myPromise = new Promise((resolve, reject) =>{
    if (true) {
      resolve("User Already Exists in result");
    } else {
      reject(    `User Already Exists in promise resolve`
      );
    }
  });


const existingUserMessage=async(res)=>{
    return await myPromise
    
}
const catchErrorMessage=(res)=>{
    return res.status(500).send({message:"Server Error..."});
}
const  dataNotFoundMessage=(res)=>{
    return res.status(404).json({message:"Data Not Found"});

}

module.exports = {
    existingUserMessage,
    catchErrorMessage,
    dataNotFoundMessage
}