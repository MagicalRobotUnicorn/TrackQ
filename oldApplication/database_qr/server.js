var sha = require("js-sha256");
var qr = require("qrcode");
var jsqr = require('jsqr');
var http = require('http');

 const PSD = require('psd');

const PORT = 3030;


// id of asset in the collection as a sha256


var hashedValue = sha('Elven Warrior6');

console.log(hashedValue);
var returnedCode;

qr.toFile('newsample.png', hashedValue, {
  color: {
    dark: '#0000FF',  // Blue dots
    light: '#000000' // Transparent background
  }
}, function (err) {
  if (err) throw err
  console.log('done')
});

PSD.open('newsample.png').then(function (psd) {
  psd.image.saveAsPng('newsample.png');
}).catch(err => "Error: " + err);




// var currentCode = qr.toDataURL(hashedValue)
// .then(res => {
//   returnedCode = res.substr(0, 25);
// });

// var code = jsqr(returnedCode);

// if (code) {
//   console.log("Found Code:", code);
// }

