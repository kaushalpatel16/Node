const mongoose =require("mongoose");
const jwt=require("jsonwebtoken")
const registerschema=new mongoose.Schema({

username: {
    type:String,
    required:true
},
email:{
        type:String,
        required:true,
        unique:true
    },


city:{
    type:String,
    required:true
},

state:{
    type:String,
    required:true
},

dob:{
    type:String,
    required:true
},

phone:{
    type:Number,
    required:true
},
password:{
    type:String,
    required:true
},
tokens:[{
    token:{
        type:String,
        required:true
    }
}]

})
//generate token

registerschema.methods.generateAuthToken = async function(){
     try{ 
        console.log(this._id);
        const token=jwt.sign({_id:this._id.toString()},"mynameiskaushaliamtraineeeeeeeeeee",
        {
            expiresIn: '1m'
        });
        const date = new Date();
        console.log(`Token Generated at:- ${date.getHours()}
                               :${date.getMinutes()}
                               :${date.getSeconds()}`);

        
        this.tokens=this.tokens.concat({token:token})
        await this.save();
        return token;
     }
     catch(error){
         res.send("the error part" +error);
         console.log("the error part"+error);
     }
};
const  Register = new mongoose.model("Register",registerschema);

module.exports=Register;