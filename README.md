# Cloudinary to Hugo
This is a very rough (no tests) command line script that reads the metadata for your [Cloudinary](http://cloudinary.com/) hosted images and generates Hugo static content for each of them.

## Features
This script leverages the Cloudinary API and reformats the response to the Markdown suitable for the [Hugo](https://gohugo.io/) static site generator.

The domainant colour feature Cloudinary generates for each image is an excellent feature they provide, so I have leveraged this here.

For best results, it is recommended to upload high resolution TIFF images to Cloudinary. They will generate JPEG and WebP images you need.

## Running 
To run this, you will need the following:

- [NodeJS ~7.6.x](https://nodejs.org/en/).
- Your Cloudinary [account and cloud name](http://cloudinary.com/documentation/solution_overview#account_and_api_setup).
- Your Cloudinary [key and secret](http://cloudinary.com/documentation/solution_overview#access_identifiers).

## Setting up
Check this project out using Git and rename `config.sample.js` to `config.js` and swap out the substitutes with your details as required above.

Once you have that set up, run `node index.js` and wait for the script to finish. If all went well, you will see a new directory named `generated` with a nested structure based on the albums you have set up in Cloudinary.

Here is an example of one of the Markdown files that will be generated:

```
---
title:    "lake"
type:   "photo"
mediatype:    "upload"
description:    "TBC"
date:   "2017-04-14 19:48:07"
album:    "landscapes"
filename:   "lake.md"
series:   ""
cl_public_id:   "landscapes/lake"
cl_version:   1497004718
format:   "tiff"
bytes:    2797356
width:    2560
height:   1440
colours:
- "#7D7D7D"
- "#303030"
- "#CDCDCD"
- "#D6D6D5"
- "#767675"
exposure_mode:    "Auto"
program:    "Aperture-priority AE"
aperture:   undefined
focal_length:   "16.0 mm"
iso:    "100"
shutter_speed:    undefined
metering:   "Multi-segment"
flash:    "Off, Did not fire"
white_balance:    "Auto"
colour_temp:    "2.0"
has_crop:   "No"
orientation:    "Horizontal (normal)"
camera_model:   "NIKON D800"
lens_info:    "No lens info"
artist:   "No artist info"
x_resolution:   "300"
y_resolution:   "300"
---
```

## Using this in Hugo
I created a responsive image partial on my photography website which you can see [here](https://github.com/matfin/cinematt/blob/master/site/layouts/partials/picture.html).

I created this script because I didn't want to have to manually enter the data for each photo.