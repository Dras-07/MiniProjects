const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const { realpathSync } = require("fs");


const app = express();

app.use(bodyParser.urlencoded({extented:true}));


app.post("/",function(req,res){
    console.log(req.body.cityName);
      const query=req.body.cityName;
    const APIkey="09534e699c2bd46061d15ad2e925360b";
    const units="metrics";

    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+APIkey+"&units="+units;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData=JSON.parse(data)
            const temperature=weatherData.main.temp
            const weatherDescription=weatherData.weather[0].description
            const  icon=weatherData.weather[0].icon
            

           
           var imageUrl="http://openweathermap.org/img/wn/"+ icon +"@2x.png"
           const ans="http://openweathermap.org/img/wn/10d@2x.png"
           console.log(imageUrl);
            res.write("<h1> The temparatre in "+query +" is "+ temperature +" degrees Celsius.</h1>")
            res.write("<p>The Weather Description is "+weatherDescription+"<p>")
            res.write("<img src="+imageUrl+">");
            res.send()
        });
    });
    //console.log("post recieved");
});
app.listen(3000, function(){
console.log('Server Started ')
})