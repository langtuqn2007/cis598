# STEAM SALVAGE

Steam Salvage is a small web-app inspired by SteamDB. To be specific, a user can: 

  - Create a local identity
  - Obtain summary information about a Steam account
  - Discover what kind of games that user tend to play the most
  - Calculate the current value of that Steam account's library
  - And more...
  
### Tech

Steam Salvage uses a number of open source projects to work properly:

* [node.js] - Evented I/O for the backend
* [Express] - Node.js network app framework
* [express-stormpath] - Extension for Express.js that makes it simple to add user authentication to application
* [body-parser] - Node.js body parsing middleware
* [cookie-parser] - Parse Cookie header and populate req.cookies with an object keyed by the cookie names
* [csurf] - Node.js CSRF protection middleware
* [forms] - An easy way to create, parse and validate forms in node.js
* [pug] - Template engine
* [request] - Simplified HTTP client
* [xtend] - Extend an object by appending all of the properties from each object in a list

And Steam Salvage fetches data mainly from [SteamAPI](https://developer.valvesoftware.com/wiki/Steam_Web_API).

### Installation & Running

**Steam Salvage requires [Node.js](https://nodejs.org/) to run.**

Download/clone the repo. Then use a terminal and browse to the folder just installed to install the dependencies and start the app by doing the following:

```sh
$ npm install
$ node app.js
```
Then open a web browser and enter this address:
```sh
localhost:3000
```
### Todos
 - Keep improving the search page
 
License
----

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job)

   [node.js]: <http://nodejs.org>
   [jQuery]: <http://jquery.com>
   [Express]: <http://expressjs.com/>
   [body-parser]: <https://github.com/expressjs/body-parser>
   [cookie-parser]: <https://github.com/expressjs/cookie-parser>
   [csurf]: <https://github.com/expressjs/csurf>
   [express-stormpath]: <https://github.com/stormpath/express-stormpath>
   [forms]: <https://github.com/caolan/forms>
   [pug]: <https://github.com/pugjs/pug>
   [request]: <https://github.com/request/request>
   [xtend]: <https://github.com/Raynos/xtend>