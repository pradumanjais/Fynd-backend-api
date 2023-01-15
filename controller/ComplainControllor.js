const complain = require('../model/complain');

//Admin registration functions
const complain_register = async (req, res) => {

    const register_data = new complain({

        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        complain: req.body.complain,
        pincode: req.body.pincode,
        district:req.body.district
        
    });
   try{
    //save data
      await register_data.save();
    
    res.json({status:"Complain has been Registered successfully !"});
    
   }
   catch(err){
    res.status(400).send({'errmsg':err});
   }
}




//fetch complain by pincode
const fetch_complain =async (req,res)=>{
    try {
        const reqcomplain=await complain.find({pincode:req.body.pincode})
        if(reqcomplain.length!=0){
            res.status(200).json(reqcomplain)
        }else{
            res.status(404).json({'errmsg':'Data not found!'})
        }
    }
    catch(error){
        res.status(400).json({'errmsg':error})
    }
  }
  
  
  
  


//export function

module.exports={
complain_register,
fetch_complain
}