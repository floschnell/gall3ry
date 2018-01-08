var express = require('express');
var pug = require('pug');
var AWS = require('aws-sdk');
var basicAuth = require('basic-auth-connect');
var config = require('./config');

var port = process.env.PORT || 3000;

var app = express();
app.set('view engine', 'pug');
app.use(basicAuth(config.access.username, config.access.password));
app.use('/img', express.static('img'));
app.use('/styles', express.static('styles'));
app.use('/scripts', express.static('scripts'));

AWS.config.update(config.s3);
var s3 = new AWS.S3();

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

app.get('/', function (req, res) {

  var params = {
    Bucket: config.s3.bucket,
    Delimiter: '/'
  };

  s3.listObjects(params, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      var albums = [];
      for (var i in data.CommonPrefixes) {
        var prefix = data.CommonPrefixes[i].Prefix;
        var name = prefix.substr(0, prefix.length - 1).capitalize();
        var album = {
          'prefix': prefix,
          'name': name
        }
        albums.push(album);
      }
      res.render('index', {
        'albums': albums
      });
    }
  });
});

app.get('/:album', function (req, res) {

  var album = req.params.album;
  if (album.substr(album.length - 1, 1) !== '/') {
    album = album + '/';
  }

  var params = {
    Bucket: config.s3.bucket,
    Prefix: album,
    Delimiter: '/'
  };

  s3.listObjects(params, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      var images = [];
      for (i in data.Contents) {
        var image = data.Contents[i];
        if (image.Key.endsWith(config.suffix.small)) {
          var imageProps = {
            url: image.Key,
            full_suffix: config.suffix.full,
            rotation: (Math.random() * 20 - 10)
          };
          images.push(imageProps);
        }
      }
      res.render('album', {
        'name': album.substr(0, album.length - 1).capitalize(),
        'images': images
      });
    }
  });
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening at http://%s:%s', host, port);
});