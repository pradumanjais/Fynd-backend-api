const mongoose=require('mongoose');

const ComplainSchema=new mongoose.Schema({
   name:String,
   mobile:Number,
   email:{ type: String, required: true},
   complain:String,
   district:String,
   pincode:{type: Number,required: true},
});

// Export Admin Schema
module.exports=mongoose.model("complain_data",ComplainSchema);