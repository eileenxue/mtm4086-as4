var express = require('express');
var morgan = require('morgan');

var app = express();

//Middleware
app.use(morgan('dev'));

app.get('/', function (req, res) {
    var name = "Eileen";
    res.json("My name is " + name);
});

app.get('/shop', function (req, res) {
    res.json("Welcome to my shop");
});

/*app.post()
app.put()
app.delete()*/

app.listen(3000, function (err) {
    if (err) throw err;
    console.log("Server is Running");
})