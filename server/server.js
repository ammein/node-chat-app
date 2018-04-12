const path = require('path');
const publicPath = path.join(__dirname , "../public");
const express = require('express');

var app = express();
app.use(express.static(publicPath));

app.listen(8000 , ()=>{
    console.log("Started on port 8000");
});