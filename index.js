var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

app.use(express.static("public"));

app.get('/home', function(req, res){
	res.render('homepage.ejs')
});

app.get('/blog', function(req, res){
	res.render('blog.ejs')
})

app.get('/contact', function(req, res){
	res.render('contact.ejs')
})

app.listen(process.env.PORT || 3000, function (){
	console.log('Example app listening on port 3000!')
});
