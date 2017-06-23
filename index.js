var express = require('express');
var app = express();
// const bodyParser = require('body-parser');
const pg = require('pg');
// const conString = 'postgres://postgres@db-endpoint:5432/postgres';

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

// app.use(bodyParser());
// app.use(bodyParser.urlencoded({extended:false}))

app.get('/', function(req, res){
	res.render('home.ejs',{
		name: "Home Page"
	})
})

app.get('/post', function (req, res, next) {
	pg.connect(conString, function (err, client, done){
    if (err){
      return next(err)
    }
    client.query('SELECT * FROM posts;', function (err, result){
      if (err){
        return next(err)
      }
			res.render('blogpost.ejs',{posts:result.rows})
      done()
    })
  })
})

app.post('/post',function(req,res,next){
  const blogPost = req.body
  pg.connect(conString, function (err, client, done){
    if (err){
      return next(err)
    }
    client.query('INSERT INTO posts (title,body) VALUES ($1, $2);',[blogPost.title,blogPost.text], function (err, result){
      done()
      if (err){
        return next(err)
      }
      res.redirect('/post')
    })
  })
})

app.listen(process.env.PORT || 3000, function (){
	console.log('Example app listening on port 3000!')
})
