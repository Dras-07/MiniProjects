//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    console.log(req.body);
    var h=parseFloat(req.body.Height);
    var w=parseFloat(req.body.Weight);
var ans=(w)/(h*h);
    res.send("Your BMI is "+ans);

})


app.listen(3000,function(){
    console.log("Server is running");
});