# smallapp

This app uses: 

Server side :
 - NodeJS
 - Gulp
 - Mongo
 - bower

Client side :
 - AngularJS
 - Bootstrap


#- Goal : #
Small tutorial that show how to use a simple app with
Angular and NodeJS.
create a small app, with a REST server to make client side and server side independent from each other. 


This tutorial assume that mongo and node is already installed for server side.

# Install Node dependencies#
On the working folder install dependencies by executing :
```
   npm install
```

##### What am I installing ?

| modules      	| What it does? | 
| ------------- |-------------:|
| gulp-nodemon 	| allow us to run node from gulp | 
| gulp-pipe 	| makes it easy to work with gulp |
| gulp-jshint   | check JS files for errors in code |
| gulp-sass    	| compile sass files |
| gulp-concat 	| concat files for distribution |
| gulp-uglify	| compress js files for distribution |
| gulp-minify-css| compress css files for distribution|
| gulp-rename   | allow us to rename files |
| gulp-watch 	| watch for file changes |
| gulp-inject 	| injects JS and CS files |
| gulp-flatten  | build folder without relative paths |
| gulp-filter 	| makes filtering easy |
| main-bower-files| grab libraries files from bower_components |
| browser-sync  | reload browser on file changes |
| express 		| Node framework |
| mongoose 		| Mongodb Object modeling for node |
| underscore 	| JS library with useful functions |
| mongoose-types| SchemaTypes handle definition |
| body-parser 	| node body parsing middleware |
| method-override | Improve REST |
| passport 		| Authentication middleware for Node |
| passport-local | Allow custom auth. on passport |
| bcrypt-nodejs | cryptography library |
| express-session | Session middleware |
| bower 		| packages manager |
| del			| easy delete of files and folders |
| stream-series | force injection order |


bower vs npm
bower is a package manager for fron-end
npm is a package manager for back-end