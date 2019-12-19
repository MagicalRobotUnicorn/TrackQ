const Instascan = require('instascan');

var scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
scanner.addListener('scan', function (content, image) {
  console.log(content);
});

Instascan.Camera.getCameras().then(function (cameras) {
  if (cameras.length > 0) {
    scanner.start(cameras[0]);
  }
});