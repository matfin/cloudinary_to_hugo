'use strict';

module.exports = class Photo {

	constructor (json) {
		let id_split = json.public_id.split('/');

		let {
			image_metadata,
			public_id,
			version,
			format,
			width,
			height,
			bytes,
			type
		} = json;

		let {
			DateCreated,
			TimeCreated,
			ExposureMode,
			ExposureProgram,
			ApertureValue,
			FocalLength,
			ISO,
			ShutterSpeedValue,
			MeteringMode,
			Flash,
			WhiteBalance,
			ColorTemperature,
			HasCrop,
			Orientation,
			Model,
			LensInfo,
			Artist,
			XResolution,
			YResolution
		} = image_metadata;

		/**
		 *	Basic data
		 */
		this.title 			= id_split[1] || 'no-title';
		this.type 			= type;
		this.description 	= 'TBC';
		this.date 			= `${DateCreated.replace(/\:+/g, '-')} ${TimeCreated}`
		this.album 			= id_split[0] || 'no-album';
		this.filename 		= `${this.title.replace(/[\W_]+/g, '-')}.md`;
		this.series 		= '';
		this.cl_public_id	= public_id;
		this.cl_version 	= version;
		this.format			= format;
		this.bytes			= bytes;
		this.width 			= width;
		this.height 		= height;

		/**
		 *	Exif metadata
		 */
		this.exposure_mode	= ExposureMode;
		this.program 		= ExposureProgram;
		this.aperture		= ApertureValue;
		this.focal_length	= FocalLength;
		this.iso 			= ISO;
		this.shutter_speed	= ShutterSpeedValue;
		this.metering 		= MeteringMode;
		this.flash 			= Flash;
		this.white_balance	= WhiteBalance;
		this.colour_temp	= ColorTemperature || 'No colour temperature';
		this.has_crop		= HasCrop || 'No';
		this.orientation 	= Orientation;
		this.camera_model 	= Model;
		this.lens_info 		= LensInfo || 'No lens info';
		this.artist 		= Artist || 'No artist info';
		this.x_resolution 	= XResolution;
		this.y_resolution 	= YResolution;
	}

	get hugoString () {
		let quote = (value) => typeof value === 'string' ? '"':'',
			items = Object.keys(this).map(key => `${key}:\t\t${quote(this[key])}${this[key]}${quote(this[key])}`).join('\n');
		return `---\n${items}\n---`;
	};
}