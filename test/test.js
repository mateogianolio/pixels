(function () {
  'use strict';

  var px = require('../pixels');

  // read image file as Float64Array
  var image = px.read('./test/input.jpg', Float64Array);

  /**
   * image: {
   *   width: 240,
   *   height: 214,
   *   data: <Float64Array ...>
   * }
   **/

  console.log('read input.jpg (' + image.width + 'x' + image.height + ')');

  // reduce [r, g, b, a, ...] => [x, ...]
  // i.e. convert to grayscale, see https://en.wikipedia.org/wiki/Grayscale
  px.reduce(image,
    (r, g, b, a) =>
      0.2126 * r +
      0.7152 * g +
      0.0722 * b
  );

  // expand [x, ...] => [r, g, b, a, ...]
  // and set alpha to random
  px.expand(image,
    (x) =>
      [x, x, x, Math.random()]
  );

  px.write('./test/output.png', image);
  console.log('wrote output.png (' + image.width + 'x' + image.height + ')');

  px.write('./test/output.jpg', image);
  console.log('wrote output.jpg (' + image.width + 'x' + image.height + ')');
}());
