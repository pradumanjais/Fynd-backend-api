const AdminReg = require('../model/adminReg');
const InfoGen = require('../model/InfoGen');
//jwt token implimentation
const dotenv=require('dotenv').config();
const secretKey=process.env.secretKey;
//jwt require
const jwt=require('jsonwebtoken');
//password hashing
const bcrypt=require("bcrypt");




//Admin registration functions
const adminregister = async (req, res) => {
    const pass=await bcrypt.hash(req.body.password,10);
    
    const register_data = new AdminReg({

        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        password: pass,
        pincode: req.body.pincode,
        district:req.body.district
        
    });
   try{
    const postdetails=await register_data.save();
    
    res.json({status:"Registration has been completed successfully"});
    
   }
   catch(err){
    res.status(400).send({'errmsg':err});
   }
}

//admin login function
const adminlogin =async (req,res)=>{
    try {
       
        const admindetails=await AdminReg.find({email:req.body.email})
        if(admindetails.length!=0){
            
           const enter_pass= req.body.pass;
           const databse_pass=admindetails[0].password;
           //verify password
            const verify_pass=await bcrypt.compare(enter_pass,databse_pass);
            if(verify_pass){
                //generate token data
                login_data={email:admindetails[0].email,adminid:admindetails[0]._id};

            jwt.sign({login_data},secretKey,{expiresIn:'8600s'},(err,token)=>{
            res.status(200).json({'token':token,name:admindetails[0].name,email:admindetails[0].email,aid:admindetails[0]._id,pincode:admindetails[0].pincode,district:admindetails[0].district})
          })

            }else{
                res.status(404).json({'errmsg':'Password Not Matched!'})
            }
        }else{
            res.status(404).json({'errmsg':'User not found!'})
        }
       
    }
    catch(error){
        res.status(400).json({'errmsg':error})
    }
}





//generate information

const info_genrate = async (req, res) => {

    const info_data = new InfoGen({

        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        starttime: req.body.start,
        endtime: req.body.end,
        pincode: req.body.pincode,
        district:req.body.district
        
    });
   try{
    const postdetails=await info_data.save();
    
    res.json({status:"Information has been generated successfully"});
    
   }
   catch(err){
    res.status(400).send({'errmsg':err});
   }
}


//fetch information by email
const fetch_info =async (req,res)=>{
    try {
        const reqinfo=await InfoGen.find({email:req.body.email}).sort({currentdate:-1}) //sort by date Desc
        if(reqinfo.length!=0){
            res.status(200).json(reqinfo)
        }else{
            res.status(404).json({'errmsg':'Data not found!'})
        }
    }
    catch(error){
        res.status(400).json({'errmsg':error})
    }
  }




  //delete information
const info_delete=async (req,res)=>{
    try {
       await InfoGen.deleteOne({_id:req.params.infoid})
       res.json({status:"Information has been deleted!"})
    }
    catch(error){
        res.json({Showmessage:error});
    }
  }
  

//export function

module.exports={
    adminregister,
    adminlogin,
    info_genrate,
    fetch_info,
    info_delete
}