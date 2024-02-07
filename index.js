//import express from "express";
const express = require("express");

const app = express();
const port = 8081;

const axios = require('axios');


app.use((req, res, next)=> {

      res.setHeader("Access-Control-Allow-Origin","*");    //   تحديد من اي دومسن يتم استفبال الريكوست
      res.setHeader("Access-Control-Allow-Methods", "*");   //    تحديد نوع الدوال get , post put , delet
      res.setHeader("Access-Control-Allow-Headers", "Authorization"); 
      next();
      });

var cookie_value;


var usrurl = "bd3.ddns.net";


// const axios = require('axios');
app.post("/mikrotik",   (req, res) => {  
return new Promise(async(resolve, reject)=>{  


    const qs = require('qs');
    let data = qs.stringify({
      'username': req.query.username 
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://${usrurl}:8080/um/api/login`,
      headers: { 
        // 'Cookie': 'MTUMSESS=L8dXKNDjIi0bWBRFFbXefGI6atNHpajJ'
      },
      data : data
    };
    
    await axios.request(config)
    .then((response) => { 
       const str = response.headers["set-cookie"][0];
      //  var i = str.indexOf('=')+1;
      //  var ii = str.indexOf(';');
      //   cookie_value = str.substring(i, ii);
       var cookie = 'MTUMSESS'; 
        var i = str.indexOf(cookie+'='); if (i != -1) { 
          var eq = i+cookie.length+1; var end = str.indexOf(';', eq); 
          cookie_value = str.substring(eq, end == -1 ? undefined : end);
        }
        if(response.data["success"] == false){
        res.send( JSON.stringify(response.data) );

  
          }
        //   else{
     
        //   }
  
  
    })
    .catch((error) => {
      console.log(error);
    });



let configg = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://${usrurl}:8080/um/api/getUser`,
    headers: { 
      'Cookie': `MTUMSESS=${cookie_value}`
      // 'Cookie': 'MTUMSESS=L8dXKNDjIi0bWBRFFbXefGI6atNHpajJ'
    },
    data : "data"
    };
    
    await axios.request(configg)
    .then(async (response) => {
    
    if(response.data["success"] == false){
    res.send( JSON.stringify(response.data) );


    }else{
    res.send( JSON.stringify(response.data) );
    }
    })
    .catch((error) => {
    console.log(error);
    });



})

})



app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});