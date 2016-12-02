var exp = require('express');
    mstE = require('mustache-express'),
    bdyParser = require('body-parser'),
    methodOverride = require('method-override'),
    fetch = require('node-fetch'),
    pgp = require('pg-promise')(),
    app = exp(),
    PORT = process.env.PORT || 6969,
    db = pgp(process.env.DATABASE_URL ||'postgres://dominiquealexander@localhost:5432/gif_db');

    app.engine('html', mstE());
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');
    app.use('/', exp.static(__dirname + '/public'));
    app.use(methodOverride('_method'));
    app.use(bdyParser.urlencoded({extended:false}));
    app.use(bdyParser.json());

    //Create variable that stores user input from post route
    var theQuery;
    app.post('/tempor', function(req, res){

      theQuery = 'http://api.giphy.com/v1/gifs/search?q=' + req.body.data +
                   '&api_key=dc6zaTOxFJmzC&limit=27';

    });

    //Create variable that stores image url from API when user clicks on image on
    //home page. Post's the url using client side ajax and added to DB
    //using pg-promise.
    var img_url;
    app.post('/tempora', function(req,res){

      img_url = req.body.data;
      db.none("INSERT INTO gifs (url) VALUES ($1)", [img_url]);

    });

    //Create variable that stores image url from DB when user clicks on image on
    //favs page. Post's the url using client side ajax and deleted from DB using
    //pg-promise.
    var del_pic;
    app.post('/temporar', function(req,res){

      del_pic = req.body.data;
      db.none("DELETE FROM favs WHERE url = $1", [del_pic]);
      db.none("DELETE FROM gifs WHERE url = $1", [del_pic]);

    });

    //Create variable that stores image url and id from DB when user clicks on image
    //on favs page. Post's the url and id using client side ajax and inserting into
    //DB using pg-promise.
    var fav_url;
    var fav_id;
    app.post('/temporary', function(req,res){

      fav_url = req.body.data;
      fav_id = req.body.id;
      db.none("INSERT INTO favs (url, gifs_id) VALUES ($1,$2)", [fav_url,fav_id]);

    });

    //Loads the home page with trending gifs on first loads and loads gifs
    //related to user input using theQuery variable.
    var on = false;
    app.get('/', function(req,res){
      //second load
      if(on == true){

        fetch(theQuery)
        .then(function(data){
          return data.json();
        })
        .then(function(data){
          res.render('index', {
            data: data.data
          });
        });

      }
      //first load
      if (on == false){

        fetch('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=27')
        .then(function(data){
          return data.json();
        })
        .then(function(data){
          res.render('index', {
            data: data.data
          });
        })
        on = true;
      }
      //If it breaks somehow
      else{

        fetch(theQuery)
        .then(function(data){
          return data.json();
        })
        .then(function(data){
          res.render('index', {
            data: data.data
          });
        });

      }

    });

    //loads favorites page and grabs info from DB and renders it on the page
    app.get('/favs', function(req,res){

      db.any('SELECT DISTINCT id,url FROM gifs')
      .then(function(data){
        var favs = {'favs': data};
        res.render('fav', favs);
        on = false;
      })

    });

    //loads PORT for local host
    app.listen(PORT, function(){
      console.log('Sup Server!');
    });





