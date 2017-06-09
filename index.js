const 	request = require('request'),
		fs		= require('fs'),
		Photo 	= require('./photo'),
		config	= require('./config');


let single = require('./single.json');

let photo = new Photo(single);

console.log(photo);
