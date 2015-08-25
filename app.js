var express = require('express');

var fs = require('fs');

var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

var server = require('http').Server(app);
var io = require('socket.io').listen(server);
//server.listen(8080);
/* On utilise les sessions */
app.use(session({secret: 'todotopsecret'}))
.set('view engine', 'jade')

.use(express.static((__dirname, 'public')))



.use(function(req, res, next){
    if (typeof(req.session.list) == 'undefined') {
        req.session.list = [];
    }
    next();
});


app.get('/index', function(req, res) {
  res.render('index', { title: 'Node', message: 'SNAKE POWERED BY NODE.JS'});
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
  res.render('home', {n1: req.session.list[0], n2: req.session.list[1]});

  io.sockets.on('connection', function (socket) {
    socket.on('newClient',function(client){
      console.log(client + ' est connecté !');
      socket.set('pseudo', client);
      socket.get('pseudo', function(error, pseudo){
        socket.broadcast.emit('message', pseudo);
      })
    });
  });
  
})

.use(function(req, res, next){
    res.redirect('/index');
})

.listen(8080);