const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  https.get("https://api.openweathermap.org/data/2.5/weather?q=Pernik&appid=c63308cb9addc39cc5cf55480ea61ce0&units=metric", function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData= JSON.parse(data)
      const weatherTemp = weatherData.main.temp
      const weatherDesc = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const iconLink  =  "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<html><head><style> div {text-align:center; border-radius:15px; background-color:#DFE8CC; margin:auto; margin-top:100px; padding-top:20px; padding:10px; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);transition: 0.3s; width: 40%; div:hover{box-shadow: 0 8px 16px 0 rgba(0,0,0,0.3);;}} </style></head><body><div><h1>The temperature in Pernik is <br><br>" + weatherTemp + "C " + "</h1><h2>"+ weatherDesc +"</h2>");
      res.write("<br><img src=\"" + iconLink + "\">");
      res.write("<html>   <head>    <title>Weather app</title>     <style> .card {   box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);   transition: 0.3s; width:90%; border-radius:15px;   margin:auto;     text-align: center;      margin-top:10%;     background-color:#DFE8CC; }  .card:hover {   box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2); }  button{   background-color:#647E68;   color:white;   padding:2%;   border-radius:15px; } </style>   </head>   <body>  <div class=\"card\">     <h1>Check the weather for a city you'd like</h1>     <form class=\"cityName\" action=\"/\" method=\"post\">       <label for=\"city\">Type in your city:</label>       <input id=\"city\" type=\"text\" name=\"cityName\" value=\"\"> <button type=\"submit\" name=\"button\">Check the weather</button>     </form>    </div> </div>    </body> </html>")
      res.send();

    })
  });
})

app.post("/", function(req, res){
  var city = req.body.cityName;

  const weatherQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c63308cb9addc39cc5cf55480ea61ce0&units=metric"
  https.get(weatherQuery, function(response){
    response.on("data", function(data){
      const weatherData= JSON.parse(data)
      const weatherTemp = weatherData.main.temp
      const weatherDesc = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const iconLink  =  "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<html><head><style> div {text-align:center; border-radius:15px; background-color:#DFE8CC; margin:auto; margin-top:100px; padding-top:20px; padding:10px; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);transition: 0.3s; width: 40%; div:hover{box-shadow: 0 8px 16px 0 rgba(0,0,0,0.3);;}} </style></head><body><div><h1>The temperature in " + city + " is <br><br>" + weatherTemp + "C " + "</h1><h2>"+ weatherDesc +"</h2>");
      res.write("<br><img src=\"" + iconLink + "\">");
      res.send();
    })
  });
})
app.listen(3000, function(){
  console.log("Server is running on port 3000.");
})
