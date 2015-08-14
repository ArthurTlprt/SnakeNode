var express = require('express');
var app = express();

/* On affiche la todolist et le formulaire */
app.get('/index', function(req, res) { 
    res.render('index.ejs', {});
})

app.use(function(req, res, next){
    res.redirect('/index');
})

app.listen(8080);