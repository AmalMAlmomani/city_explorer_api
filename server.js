'use strict';
//The nodeJs server

//some library called dotenv,enable us to use some enviroment variable
require('dotenv').config();

//require some file from express, library
const express = require('express');

//this will help us to do the interaction between frontend and backend, this will tell our server where to accept the request from and who to response to.
const cors = require('cors');

//the port that will run our application on, something related for node that will running on our heroku server 
const PORT = process.env.PORT || 4000;

//express have property, that will run our server 
const app = express();

app.use(cors());


app.get('/', (request, response) =>{ 
    response.status(200).send('Home Page!');
});

app.get('/bad',(request,response) => {
    throw new Error('oh nooo!');
});
///get function for location
app.get('/location',(request,response) => {
    try{ 
    const geoData = require('./data/geo.json');
    const city = request.query.city;
    const locationData = new Location(city, geoData);
    response.status(200).json(locationData);
    // console.log('DATA:', geoData);
    // geoData[0].display_name
    } catch(error){
        errorHandler(error,request,response);
    }
});
/*{
    "search_query": "seattle",
    "formatted_query": "Seattle, WA, USA",
    "latitude": "47.606210",
    "longitude": "-122.332071"
  }*/

  const arrWeather = [];
  app.get('/weather',(request,response) => {
         try{

       const geoData = require('./data/darksky.json');
          const weather = request.query.weather;
          geoData.data.forEach(value => {
              let weatherDescription = value.weather.description;
              let dateDay = value.valid_date;
               const weatherData = new Weather(weatherDescription, dateDay);
               arrWeather.push(weatherData);
          });
            
         } catch{
            notFoundHandler(request,response);
         }
         response.send(arrWeather);
  });




 /* [
    {
      "forecast": "Partly cloudy until afternoon.",
      "time": "Mon Jan 01 2001"
    },
    {
      "forecast": "Mostly cloudy in the morning.",
      "time": "Tue Jan 02 2001"
    },
    ...
  ]*/

app.use('*',notFoundHandler);
///constructor function for Location
function Location(city, geoData){
    this.search_query = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;


}

///constructor for the weather
function Weather(description,date){
    this.description = description ;
    this.date = date;
}
//that will handle any other request that doesn't match our route

function notFoundHandler(request,response){
    response.status(404).send('Sorry, something went wrong');
}
function errorHandler(error,request,response){
    response.status(500).send("error");
}

//to make our server work
app.listen(PORT,() => console.log(`the server is up and running on ${PORT}`));


//this function is telling our server go look at this folder for any static files(html files or CSS) 
// app.use(express.static('./public'));
//The server has two method:1.send-that willsend any text, object, tags and rendred to the page  2.json-it will return a json format to our client 
//to do some action on the browser 

    //ready to response to the client 
//     response.status(200).send('Hello')
// });
// app.get('/data',(request,response)=>{
//     let data=[{name:"Javascript"},{name:"paython"},{name:"C#"}];
//     response.status(200).json(data);
// });

//how we responding 


