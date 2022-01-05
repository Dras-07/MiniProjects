const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {
    const fName = req.body.fName;
    const sName = req.body.sName;
    const email = req.body.email;

    const userData = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_feilds: {
                    FNAME: fName,
                    LNAME: sName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(userData);

    const url = "https://us20.api.mailchimp.com/3.0/lists/db5c06a5ec";

    const options = {
        method: "POST",
        auth: "Anjanay123:a631b017dce53968db2baf633b63ba11-us20"  
    }

    const request = https.request(url, options, (response) => {
      if(response.statusCode === 200)
      res.sendFile(__dirname + "/success.html");
      else
      res.sendFile(__dirname + "/failure.html");

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT ||  3000, () => {
    console.log("Server is running");
});





