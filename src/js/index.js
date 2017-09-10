const 	request = require('request'),
				fs 			= require('fs'),
				mkdirp	= require('mkdirp'),
				Photo 	= require('./photo'),
				config	= require('./config');

const {
	cl_url,
	cl_cloud_name,
	cl_key,
	cl_secret
} = config;

const makeRequest = (url) => {
	return new Promise((resolve, reject) => {
		request(url, (error, response, body) => {
			if(error || body.error) {
				reject(error);
			}
			else {
				resolve(body);
			}
		});
	});
};

const getPhotos = (max=300) => {
	return makeRequest(`https://${cl_key}:${cl_secret}@${cl_url}/${cl_cloud_name}/resources/image?max_results=${max}`);
};

const getPhoto = (public_id) => {
	console.log(`Getting photo with id ${public_id}`);
	return makeRequest(`https://${cl_key}:${cl_secret}@${cl_url}/${cl_cloud_name}/resources/image/upload/${public_id}?image_metadata=true&colors=true`);
};

const writeFile = (photo) => {
	const path = `./generated/${photo.album}`;
	new Promise((resolve, reject) => {
		mkdirp(path, (err) => {
			if(err) {
				reject(err)
			}
			else {
				resolve({done: true});
			}
		});
	}).then((result) => {
		fs.writeFileSync(`${path}/${photo.title}.md`, photo.hugoString, console.log, console.error);
	}).catch((e) => {
		console.log({error: e});
	});
};

const writeHugoFiles = async (photos) => {
	photos = photos.map((item) =>  new Photo(JSON.parse(item)));
	photos.forEach(writeFile);
};

const run = async () => {
	const photos 	= JSON.parse(await getPhotos()).resources;
	const	tasks	= photos.map((photo) => getPhoto(photo.public_id));

	Promise
	.all(tasks)
	.then(writeHugoFiles)
	.catch(console.log);
};

run();