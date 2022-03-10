const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req , res){
res.sendFile(__dirname + "/index.html");

});


app.post("/" , function(req , res){
  var city =  req.body.cityName;
  console.log(city);

  const querry = city;
  const apiKey = "fe6c84f83c6fa470b8b5ade90aa02df8";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+querry+"&appid=" + apiKey + "&units="+ unit;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data" , function(data){
    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp
    const icn = weatherData.weather[0].icon
    var imgSrc = "http://openweathermap.org/img/wn/"+ icn + "@2x.png"
    console.log(icn);
    const weatherDescription = weatherData.weather[0].description
    res.write("<h1> the temp is " + temp + " in "+ city +". </h1>");
    res.write("<p> The weather is currently" + weatherDescription + "<p>");
    res.write("<img src=" + imgSrc + " alt = Weather Condition>")
    res.send();
    });

  });


});




app.listen(3000, function(){
  console.log("Listning");
});
