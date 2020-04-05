'use strict';
//The nodeJs server
//require some file from express, library
const express = require('express');
//express have property, that will run our server 
const app = express();
//this function is telling our server go look at this folder for any static files(html files or CSS) 
app.use(express.static('./public'));
//the port that will run our application on, something related for node that will running on our heroku server 
const PORT = process.env.PORT || 3000;
//The server has two method:1.send-that willsend any text, object, tags and rendred to the page  2.json-it will return a json format to our client 
//to do some action on the browser 
app.get('/hello',(request,response)=>{
    //ready to response to the client 
    response.status(200).send('Hello')
});
app.get('/data',(request,response)=>{
    let data=[{name:"Javascript"},{name:"paython"},{name:"C#"}];
    response.status(200).json(data);
});

//how we responding 

app.get('*', (request, response) => response.status(404).send('404 page not found'));
//to make our server work
app.listen(PORT,() => console.log(`Listening on port ${PORT}`));