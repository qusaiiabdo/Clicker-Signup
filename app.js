const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
    const firsName = req.body.firstN;
    const lastName = req.body.lastN;
    const email = req.body.email;
    
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firsName,
                LNAME: lastName
            }
        }]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/17769bedc9";
    const options = {
        method: "POST",
        auth: "bla-bla-bla:634d7909ffa91c621a00cbbe9cc2a8d3-us14"
    };
    const request = https.request(url, options, function (response) {
        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });
  //request.write(jsonData);
    request.end();
});


app.post("/failure",function(req,res){
    res.redirect("/")
})
app.listen(process.env.PORT||3000, function () {
    console.log("Server is running on port 3000");
});