# STEAM SALVAGE

Steam Salvage is a small web-app inspired by SteamDB. To be specific, a user can: 

  - Create a local identity
  - Obtain summary information about a Steam account
  - Discover what kind of games that user tend to play the most
  - Calculate the current value of that Steam account's library
  - And more...
  
### Tech

Dillinger uses a number of open source projects to work properly:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [jQuery] - duh

And Steam Salvage is an open source itself

### Installation & Running

Steam Salvage requires [Node.js](https://nodejs.org/) to run.

Install the dependencies, and start the app:

```sh
$ cd cis598
$ npm install
$ node app.js
```
Then open a web browser and type:
```sh
localhost:3000
```
### Todos
 - Implement identity management
 - Keep improving the search page
 
License
----

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job)

   [node.js]: <http://nodejs.org>
   [jQuery]: <http://jquery.com>
   [Express]: <http://expressjs.com/>
