const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const mongoose=require('mongoose');

//server port
const PORT=process.env.PORT || 4040

//admin routes
const adminroutes=require('./routes/adminRouter')


const application=express();



//Middleware
application.use(cors());
application.use(express.json());


//admin middleware
application.use('/api',adminroutes);



//database connection
dotenv.config();
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log('successfully connected with database !');
})
.catch((error)=>{
    console.log('Error occured : '+error);
})






application.listen(PORT,()=>{
console.log('Server is connected successfull on port '+PORT)
})