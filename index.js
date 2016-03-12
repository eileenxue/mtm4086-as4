var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsmate = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');

var User = require('./models/user');

var app = express();


mongoose.connect('mongodb://root:12345@ds011429.mlab.com:11429/mtm4086-as4', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to the database");
    }
});

//Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUnitialized: true,
    secret: "EileenIsAwesome"
}));
app.use(flash());

app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

app.use(mainRoutes);
/*Can also do it this way, where hello is the parent, and mainRoutes are the child, 
For example, /hello/about */
/*app.use('/hello', mainRoutes);*/
app.use(userRoutes);


/*
app.get('/', function (req, res) {
    var name = "Eileen";
    res.json("My name is " + name);
});

app.get('/shop', function (req, res) {
    res.json("Welcome to my shop");
});
*/

/*app.post()
app.put()
app.delete()*/

app.listen(3000, function (err) {
    if (err) throw err;
    console.log("Server is Running");
});