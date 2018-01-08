module.exports = {
  access: {
    username: 'username', // Basic Auth username
    password: 'password', // Basic Auth password
  },
  s3: {
    region: 'eu-central-1', // https://docs.aws.amazon.com/de_de/general/latest/gr/rande.html#apigateway_region
    accessKeyId: '', // create via AWS IAM
    secretAccessKey: '', // create via AWS IAM
    bucket: 'bucke-name', // unique name of your bucket that contains folders with photos
  },
  suffix: { // describes naming scheme of the photo files
    small: '_small.jpg', // small image versions are suffixed with this
    full: '_full.jpg' // the corresponding full image versions are suffixed with this
  }
};