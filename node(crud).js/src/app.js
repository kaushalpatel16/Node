const express =require("express");
const path=require("path")
const app=express();


require("./db/conn");
const { json }=require("express"); 
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")
const Register=require("./models/Registers.js");
const cookieParser=require("cookie-parser");

const static_path=path.join(__dirname,"../public") ;
const template_path =path.join(__dirname,"../templates/views") ;
 


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));


app.set("view engine","hbs");
app.set("views",template_path);
 


app.get('/', (req, res)=>{
    const token =req.cookies.jwt;
    const date = new Date();
    // Verifying the JWT token
    jwt.verify(token, 'mynameiskaushaliamtraineeeeeeeeeee', function(err, decoded) {
    if (err) {
        console.log(`${date.getHours()}:${date.getMinutes()}
                                       :${date.getSeconds()}`);
        console.log(err);
        res.render("login_page");
    }
    else {
        console.log(`${date.getHours()}:${date.getMinutes()}
                                       :${date.getSeconds()}`);
        console.log("Token verifified successfully");
        res.render("register");
    }
    });

 });
 
 app.get('/login_page', (req, res)=>{
    if(req.cookies.jwt){
        res.render("register");

    }
    else{
        res.render("login_page");
    }

 });
 
 app.get('/sign_up', (req, res)=>{
    res.render("sign_up");
 });
 app.get('/register', (req, res)=>{
    res.render("register");
 });

 ///sign_up
 
 app.post('/sign_up',async (req,res)=>{
     try{
      const password = req.body.password;
      const paswwordHash=await  bcrypt.hash(password,10);
      console.log(paswwordHash);

      const adduser=new Register({
        username:req.body.username, 
        email:req.body.email,
        city:req.body.city,
        state:req.body.state,
        dob:req.body.dob,
        phone:req.body.phone,
        password:paswwordHash
        
      }) 

      const registered = await adduser.save();
      res.status(201).render("login_page");
    
    }catch(error){
         res.status(400).send(error);
     }
 });

 /// login 


app.post("/login",async (req,res)=>{
    try{
        const username= req.body.username;
        const password = req.body.password;
        console.log(username+"this is user");
        const name=await Register.findOne({username:username});
        console.log(name.password);
        const paswwordmatch=await  bcrypt.compare(password,name.password);
        const paswwordHash=await bcrypt.hash(password,10);
        console.log(paswwordHash);
       

        const token = await name .generateAuthToken();
        console.log("the token part => " + token);
        
        res.cookie("jwt",token,{
            expires:new Date(Date.now()+400000),
            httpOnly:true,
            secure:true
        });
        
        if(paswwordmatch){
            res.status(200).render("register");
        }
        else{
            res.send("invalid details");
        }
    }
    catch(error){
        res.status(400).send("invalid details");
    }

})








 
 app.listen(8080 ,()=>{
     console.log('server is running on 8081' );
 });


 