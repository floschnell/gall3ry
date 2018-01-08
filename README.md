# Gall3ry

A very lightweight nodejs Amazon S3 photo album viewer.

You can feed this application with an S3 bucket and it will take the folders and image files and render them into a nice gallery website.

If you want to host your photos in a cheap fashion, then you could for instance host this application on a free [heroku](https://www.heroku.com/) instance.

Furthermore it is benificial to host your photos on AWS, because you can backup them very easily to Galcier.

## UI & Customizability

The example image shows contents of an album. When the user clicks onto an image, it will be displayed in some kind of lightbox. The whole visual presentation is quite bare, so it will be easy to customize it to your needs.

![preview](example.png "Album presentation looks something like this")

## Setup

First you need to run `yarn install`, this will install all needed dependencies. After that copy the file `config.template.js` to a new file named `config.js`. Then edit the file and fill in the missing configuration values.

Your bucket structure should implement following structure:
- album folder 1
  - image1_small.jpg
  - image1_full.jpg
  - image2_small.jpg
  - image2_full.jpg
- album folder 2
  - some_other_image_small.jpg
  - some_other_image_full.jpg

## Run

Simple invoke `yarn start` to run the application. It will then host all the albums on port 3000.