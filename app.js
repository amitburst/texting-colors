var express = require('express');
var bodyParser = require('body-parser');
var parse = require('parse-color');
var request = require('request');

// Initialize the Express app.
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Handle the '/' URL.
app.post('/', function(req, res) {
  // Get the color string.
  var colorString = req.body.Body;
  if (typeof colorString !== 'string') {
    console.log('Invalid body: %s', JSON.stringify(req.body));
    return res.end();
  }

  // Parse the color string.
  var color = parse(colorString);
  if (color.rgb === undefined) {
    console.log('Could not parse color string: %s', colorString);
    return res.end();
  }

  // Reformat the color into an RRR,GGG,BBB string format.
  var rgbArray = color.rgb.map(function(value) {
    return ('000' + value).substr(-3, 3);
  });
  var rgbString = rgbArray.join(',');
  
  // Send the color string to the Spark Core.
  console.log('Sending the RGB color string "%s" to the Spark Core', rgbString);
  var url = 'https://api.spark.io/v1/devices/' + process.env.DEVICE_ID + '/color';
  var form = {params: rgbString, access_token: process.env.ACCESS_TOKEN};
  request.post({url: url, form: form}, function(err, response, body) {
    if (err !== null || response.statusCode !== 200) {
      console.log('Could not send the RGB color string to the Spark Core: %s', JSON.stringify(body));
      return;
    }
    console.log('Successfully sent the RGB color string "%s" to the Spark core', rgbString);
  });

  return res.end();
});

// Start the server.
var server = app.listen(process.env.PORT, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App running at http://%s:%s', host, port);
});
