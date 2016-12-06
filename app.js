/////////////////////////////
////    server side     ////
///////////////////////////

// dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var request = require('request');
var stormpath = require('express-stormpath');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Serve statics files
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize the API keys to get the stormpath working
app.use(stormpath.init(app, {
    expand: {
        customData: true
    },
    client: {
        apiKey: {
            file: './apikey.properties'
        }
    },
    application: {
        href: 'https://api.stormpath.com/v1/applications/28CLMYbXhildtw92iFMsiH',
    }
}));

// Work with Stormpath API
app.use('/profile', stormpath.loginRequired, require('./routes/profile')());
app.on('stormpath.ready', function () {
    console.log('Stormpath Ready');
});

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

// 3rd Route, Render Home Page
app.get('/account', stormpath.getUser, function (req, res) {
    res.render('account', {
        title: 'Welcome to Home Page'
    });
});

// Ajax function to return the results for Steam player summary
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
