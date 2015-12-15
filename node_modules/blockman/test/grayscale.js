(function () {
  'use strict';

  var fs = require('fs'),
      PNG = require('pngjs').PNG,
      bm = require('../blockman');

  // 1. Read image into a node Buffer
  var image = PNG.sync.read(fs.readFileSync('./test/test.png'));

  // 2. Create a Float64Array view of the image data buffer
  var f64 = new Float64Array(image.data);

  // Reduce every 4 elements (R, G, B and alpha respectively).
  // Resulting array will be 1/4 the size of the original.
  var f64Gray = bm.reduce(f64,
    (r, g, b, a) =>
      0.2126 * (r / 255) +
      0.7152 * (g / 255) +
      0.0722 * (b / 255)
  );

  // 4. Expand the image back to its original size
  f64Gray = bm.expand(
    f64Gray,
    x => [
      x * 255,
      x * 255,
      x * 255,
      255
    ]
  );

  // 5. Replace image data
  image.data = new Uint8ClampedArray(f64Gray);

  // 6. Write new image to file
  fs.writeFileSync('./test/test.gray.png', PNG.sync.write(image));
  console.log('wrote to ./test/test.gray.png');
  console.log('---');
}());
