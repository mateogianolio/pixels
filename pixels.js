(function () {
  'use strict';

  var fs = require('fs'),
      bm = require('blockman'),
      sizeof = require('image-size'),
      PNG = require('pngjs').PNG,
      JPEG = require('jpeg-js');

  module.exports = {
    reduce:
      (image, f) =>
        image.data = bm.reduce(image.data, f),
    expand:
      (image, f) =>
        image.data = bm.expand(image.data, f),
    read:
      (file, type) => {
        type = type || Uint8ClampedArray;
        var ext = file.split('.').pop(),
            result = sizeof(file);

        switch (ext) {
        case 'png':
          result.data = new type(PNG.sync.read(fs.readFileSync(file)).data);
          break;
        case 'jpeg':
        case 'jpg':
          result.data = new type(JPEG.decode(fs.readFileSync(file)).data);
          break;
        }

        if (type !== Uint8ClampedArray)
          result.data = result.data.map(x => x / 255);

        return result;
      },
    write:
      (file, image) => {
        var ext = file.split('.').pop(),
            buffer;

        if (image.data.constructor !== Uint8ClampedArray)
          image.data = new Uint8ClampedArray(image.data.map(x => x * 255));

        switch(ext) {
        case 'png':
          buffer = PNG.sync.write(image);
          break;
        case 'jpeg':
        case 'jpg':
          buffer = JPEG.encode(image).data;
          break;
        }

        fs.writeFileSync(file, buffer);
      }
    };
}());
