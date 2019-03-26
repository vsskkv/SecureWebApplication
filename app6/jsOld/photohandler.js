// https://gist.github.com/runeb/c11f864cd7ead969a5f0 ==> Exif rotate
// http://www.askingbox.com/tutorial/jquery-send-html5-canvas-to-server-via-ajax
// https://code.tutsplus.com/tutorials/uploading-files-with-ajax--net-21077
'use strict';
var xoffset, yoffset;
// ================================================================================
function _arrayBufferToBase64( buffer ) {
  var binary = ''
  var bytes = new Uint8Array( buffer )
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode( bytes[ i ] )
  }
  return window.btoa( binary );
}
// ================================================================================
var orientation = function(file, callback) {
  var fileReader = new FileReader();
  fileReader.onloadend = function() {
    var base64img = "data:" + file.type + ";base64," + _arrayBufferToBase64(fileReader.result);
    var scanner = new DataView(fileReader.result);
    var idx = 0;
    var value = 1; // Non-rotated is the default
    if(fileReader.result.length < 2 || scanner.getUint16(idx) != 0xFFD8) {
      // Not a JPEG
      if(callback) {
        callback(base64img, value);
      }
      return;
    }
    idx += 2;
    var maxBytes = scanner.byteLength;
    while(idx < maxBytes - 2) {
      var uint16 = scanner.getUint16(idx);
      idx += 2;
      switch(uint16) {
        case 0xFFE1: // Start of EXIF
          var exifLength = scanner.getUint16(idx);
          maxBytes = exifLength - idx;
          idx += 2;
          break;
        case 0x0112: // Orientation tag
          // Read the value, its 6 bytes further out
          // See page 102 at the following URL
          // http://www.kodak.com/global/plugins/acrobat/en/service/digCam/exifStandard2.pdf
          value = scanner.getUint16(idx + 6, false);
          maxBytes = 0; // Stop scanning
          break;
      }
    }
    if(callback) {
      if(value == 3) { callback(base64img, Math.PI); }
      else if(value == 6) { callback(base64img, Math.PI * 0.5); } 
      else if(value == 8) { callback(base64img, Math.PI * 1.5); } 
      else { callback(base64img, 0); }
    }
  }
  fileReader.readAsArrayBuffer(file);
};
// ================================================================================
$(function() {
  $('#files').change(function(e) {
    var files = e.target.files; // FileList object
    console.log("files change");
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, file; file = files[i]; i++) {
      if(file) {
        var ext = getFileExt(file.name);
        console.log(file.name + ", " + ext);
        if(ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
          orientation(file, function(base64img, value) {
            var i = new Image();
            i.src = base64img;
            i.onload = function() {
              var xoffset, yoffset, scale, b1 = 800, bHalf = 400, b2 = 300, r;

              var myCanvas0 = document.createElement('canvas');
              var myContext0 = myCanvas0.getContext('2d');
              myCanvas0.width  = b1;
              myCanvas0.height = b1;

              var myCanvas1 = document.createElement('canvas');
              var myContext1 = myCanvas1.getContext('2d');

              if(i.width > i.height) { scale = b1 / i.width; }
              else { scale = b1 / i.height; }

              xoffset = parseInt((b1 - i.width * scale) * 0.5);
              yoffset = parseInt((b1 - i.height * scale) * 0.5);
              console.log(i.width + ", " + i.height + ", offsets: " + xoffset + ", " + yoffset);

              if(value) {
                // Rotate
                myContext0.clearRect(0, 0, b1, b1);
                myContext0.translate(bHalf, bHalf);
                myContext0.rotate(value);
                myContext0.translate(-bHalf, -bHalf);
              }
              myContext0.drawImage(i, 0, 0, i.width, i.height, xoffset, yoffset, b1 - 2 * xoffset, b1 - 2 * yoffset);

              if(value == 0 || value == Math.PI) {
                myCanvas1.width = myCanvas0.width - 2 * xoffset;
                myCanvas1.height = myCanvas0.height - 2 * yoffset;              
                myContext1.drawImage(myCanvas0, -xoffset, -yoffset); 
              } else {
                myCanvas1.width = myCanvas0.height - 2 * yoffset;
                myCanvas1.height = myCanvas0.width - 2 * xoffset;
                myContext1.drawImage(myCanvas0, -yoffset, -xoffset); 
              }

              // Upload before we display the image
              var dataURL = myCanvas1.toDataURL();
              uploadThisImageNow(dataURL, myCanvas1.width, myCanvas1.height);

            }
          });
        } else {
          alert("ERROR: Cannot upload " + ext + " files");
        }
      }
    } 
  });
});
// ================================================================================
function getFileExt(filename) {
  var arr = filename.split(".");
  return "." + arr[(arr.length - 1)].toLowerCase();
}
// ================================================================================
