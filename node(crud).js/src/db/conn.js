const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/youtuberegistrastion").then(()=>{
    console.log("connection sussess");
}).catch((e)=>{
    console.log(`no connection`);
})