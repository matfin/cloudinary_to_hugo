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
			type,
			colors
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
		this.type 			= 'photo';
		this.mediatype 		= type;
		this.description 	= 'TBC';
		this.date 			= this.formatDate(DateCreated, TimeCreated);
		this.album 			= id_split[0] || 'no-album';
		this.filename 		= `${this.title.replace(/[\W_]+/g, '-')}.md`;
		this.series 		= '';
		this.cl_public_id	= public_id;
		this.cl_version 	= version;
		this.format			= format;
		this.bytes			= bytes;
		this.width 			= width;
		this.height 		= height;
		this.colours 		= colors;

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

	formatDate (date, time) {
		if(date == null) {
			return '1970-01-01';
		}
		if(time == null) {
			return `${date.replace(/\:+/g, '-')}`;
		}
		return `${date.replace(/\:+/g, '-')} ${time}`;
	}

	extractColours (colours) {
		if(colours == null) {
			return false;
		}
		return colours.map(colour => `- "${colour[0]}"`);
	}

	get hugoString () {
		let keys = Object.keys(this);
		
		let items = keys.map((key) => {
			let value = this[key];

			if(key === 'colours') {
				let extracted_colours = this.extractColours(value);
				if(extracted_colours) {
					return `${key}:\n${this.extractColours(value).join('\n')}`;
				}
				else {
					return '';
				}
			}

			if(typeof value === 'string') {
				return `${key}:\t\t"${value}"`;
			}
			
			return `${key}:\t\t${value}`;
		});

		return `---\n${items.join('\n')}\n---`;
	}
}