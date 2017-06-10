const 	request = require('request'),
		fs		= require('fs'),
		Photo 	= require('./photo'),
		config	= require('./config');

let {
	cl_url,
	cl_cloud_name,
	cl_key,
	cl_secret
} = config;

const makeRequest = (url) => {
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

const getPhotos = (max=3) => {
	return makeRequest(`https://${cl_key}:${cl_secret}@${cl_url}/${cl_cloud_name}/resources/image?max_results=${max}`);
};

const getPhoto = (public_id) => {
	return makeRequest(`https://${cl_key}:${cl_secret}@${cl_url}/${cl_cloud_name}/resources/image/upload/${public_id}?image_metadata=true`);
};

const writeFile = (photo) => {
	fs.writeFile(`./generated/${photo.album}/${photo.title}.md`, photo.hugoString, console.log, console.error);
};

const writeHugoFiles = async (photos) => {
	photos = photos.map((item) =>  new Photo(JSON.parse(item)));
	photos.forEach(writeFile);
};

const run = async () => {
	let photos 	= JSON.parse(await getPhotos()).resources;
	let	tasks	= photos.map((photo) => getPhoto(photo.public_id));

	Promise
	.all(tasks)
	.then(writeHugoFiles)
	.catch(console.log);
};

// run();

// let x = new Photo(require('./single.json'));

// console.log(x.hugoString);