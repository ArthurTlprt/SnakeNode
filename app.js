var express = require('express');

var haml = require('hamljs');
var fs = require('fs');

var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();


/* On utilise les sessions */
app.use(session({secret: 'todotopsecret'}))

.use(express.static((__dirname, 'public')))

.use(function(req, res, next){
    if (typeof(req.session.list) == 'undefined') {
        req.session.list = [];
    }
    next();
})

.get('/index', function(req, res) {
  var hamlView = fs.readFileSync('index.haml', 'utf8');
  res.end( haml.render(hamlView, {locals: ''}) );
})

.post('/index/add', urlencodedParser, function(req, res) {
  if (req.body.headN != '' && req.body.strawN != '') {
        req.session.list.push(req.body.headN);
        req.session.list.push(req.body.strawN);
        res.redirect('/home');
    }else{
        console.log(req.body.headN);
        res.redirect('/index');
    }
    
})

.get('/home', function(req, res) {
  var hamlView = fs.readFileSync('home.haml', 'utf8');
  res.end( haml.render(hamlView, {locals: req.session.list}) );
})

.use(function(req, res, next){
    res.redirect('/index');
})

.listen(8080);