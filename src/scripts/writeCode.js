var sha = require("js-sha256");
var qr = require("qrcode");
var jsqr = require('jsqr');

var hashedValue = sha('Elven Warrior6');

console.log(hashedValue);
let returnedCode;

returnedCode = qr.toDataURL(hashedValue)
.then(res => {
  returnedCode = res.substr(0, 25);
});


QRCode.toFile('./', 'Some text', {
  color: {
    dark: '#00F',  // Blue dots
    light: '#0000' // Transparent background
  }
}, function (err) {
  if (err) throw err
  console.log('done')
});

// var code = jsqr(returnedCode);

// if (code) {
//   console.log("Found Code:", code);
// }
