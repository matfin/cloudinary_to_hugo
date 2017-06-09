const 	request = require('request'),
		fs		= require('fs'),
		Photo 	= require('./photo'),
		config	= require('./config');

const getData = (max=200) => {
	let {
		cl_url,
		cl_cloud_name,
		cl_key,
		cl_secret
	} = config;


	let url = `https://${cl_key}:${cl_secret}@${cl_url}/${cl_cloud_name}/resources/image?max_results=${max}`;

	return new Promise((resolve, reject) => {
		request(url, (error, response, body) => {
			if(error) {
				reject(error);
			}
			else {
				resolve(body);
			}
		});
	});
};

const populate = async () => {
	let images = await getData();
	return images;
};


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

// let single = require('./single.json'),
// 	photo = new Photo(single);

// console.log(photo.hugoString);