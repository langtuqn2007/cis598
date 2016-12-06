/////////////////////////////
////    server side     ////
///////////////////////////

// dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var request = require('request');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// first route
app.get('/', function(req, res) {res.render('index')});

// second route
app.get('/searching', function(req, res){
	// input value from search
	var val = req.query.search;

	var url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=1CCFCAC9300684C6D1E6CD96F8F649B8&steamids=" + val;
	requests(url,function(data){
		res.send(data);
	});
});

function requests(url, callback) {
	// request module is used to process the url and return the results in JSON format
	request(url, function(err, resp, body) {
		var resultsArray = [];
		body = JSON.parse(body);

		// logic used to print out player summaries
		if (!body.response.players) {
			players = "No player found. Try again.";
			callback(players);
		} else {
			players = body.response.players;
			for (var i=0; i<players.length; i++) {
				resultsArray.push(
					{profileurl:players[i]["profileurl"], personaname:players[i]["personaname"],avatarfull:players[i]["avatarfull"],realname:players[i]["realname"]}
				);
			};
		};
	  // pass back the results to client side
	  callback(resultsArray);
	});
};

// run server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
