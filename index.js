const 	request = require('request'),
		fs		= require('fs'),
		Photo 	= require('./photo'),
		config	= require('./config');


// const getData = (time = 1000) => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			resolve({
// 				data: {
// 					testing: true,
// 					time: time
// 				}
// 			});
// 		}, time);
// 	});
// };

// const makeRequestPromised = () => {
// 	getData().then(data => {
// 		console.log(data);
// 		return 'Promised done!';
// 	});
// };

// makeRequestPromised();

// const makeRequestAsynced = async () => {
// 	for(let i = 1; i <= 10; i++) {
// 		let data = await getData(1000);
// 		console.log('We got data that looks like: ', data);
// 	}

// };

// makeRequestAsynced();

let single = require('./single.json'),
	photo = new Photo(single);

console.log(photo.hugoString);