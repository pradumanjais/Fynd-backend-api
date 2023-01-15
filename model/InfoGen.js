const mongoose=require('mongoose');

const InfoGenSchema=new mongoose.Schema({
   name:String,
   mobile:Number,
   email:{ type: String, required: true},
   district:String,
   starttime:String,
   endtime:String,
   currentdate: {type: Date,default: Date.now },
   pincode:{type: Number,required: true},
});

// Export Admin Schema
module.exports=mongoose.model("infogen_data",InfoGenSchema);