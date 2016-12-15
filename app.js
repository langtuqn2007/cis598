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
app.set('view engine', 'pug');

// Serve statics files
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize the API keys to get the stormpath API working
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
app.get('/', function (req, res) {
	res.render('index')
});

// 2nd Route, Render Home Page
app.get('/account', stormpath.getUser, function (req, res) {
	res.render('account', {
		title: 'Welcome to Home Page'
	});
});

// 3rd route, for display result of player summary
app.get('/player_summary', function (req, res) {
	// input value from search
	var val = req.query.search;
	var url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=1CCFCAC9300684C6D1E6CD96F8F649B8&steamids=" + val;
	request_playersummary(url, function (data) {
		res.send(data);
	});
});
// Ajax function to return the results for third route
function request_playersummary(url, callback) {
	// request module is used to process the url and return the results in JSON format
	request(url, function (err, resp, body) {
		var resultsArray = [];
		body = JSON.parse(body);

		// logic used to traverse through and push out data for player summary
		if (!body.response.players) {
			players = "No player found. Try again.";
			callback(players);
		} else {
			players = body.response.players;
			for (var i = 0; i < players.length; i++) {
				resultsArray.push({
					profileurl: players[i]["profileurl"],
					personaname: players[i]["personaname"],
					avatarfull: players[i]["avatarfull"],
					realname: players[i]["realname"],
					loccountrycode: players[i]["loccountrycode"],
					locstatecode: players[i]["locstatecode"]
				});
			};
		};
		// pass back the results to client side
		callback(resultsArray);
	});
};

// 4th route, for display result of game summary
app.get('/game_summary', function (req, res) {
	// input value from search
	var val = req.query.search;
	var url = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=1CCFCAC9300684C6D1E6CD96F8F649B8&steamid=" + val;
	request_gamesummary(url, function (data) {
		res.send(data);
	});
});
// Ajax function to return the results for 4th route
function request_gamesummary(url, callback) {
	// request module is used to process the url and return the results in JSON format
	request(url, function (err, resp, body) {
		var resultsArray = [];
		body = JSON.parse(body);

		// logic used to traverse through and push out data for game summary
		if (!body.response.games) {
			games = "No player found. Try again.";
			callback(games);
		} else {
			games = body.response.games;
			for (var i = 0; i < games.length; i++) {
				resultsArray.push({
					appid: games[i]["appid"],
					playtime_forever: games[i]["playtime_forever"]
				});
			};
		};
		// pass back the results to client side
		callback(resultsArray);
	});
};

// run server
http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});