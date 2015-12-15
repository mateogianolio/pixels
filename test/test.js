(function () {
  'use strict';

  var px = require('../pixels');

  // read image file as Float64Array
  var image = px.read('./test/test.jpg', Float64Array);

  /**
   * Image format: {
   *   width: <Number>,
   *   height: <Number>,
   *   data: <Float64Array>
   * }
   **/
  console.log(image.width + ' x ' + image.height, 'px');

  // reduce [r, g, b, a, ...] => [x, ...]
  // i.e. convert to grayscale, see https://en.wikipedia.org/wiki/Grayscale
  px.reduce(image,
    (r, g, b, a) =>
      0.2126 * r +
      0.7152 * g +
      0.0722 * b
  );

  // expand [x, ...] => [r, g, b, a, ...]
  // and make brightest pixels transparent
  px.expand(image,
    (x) =>
      [x, x, x, (x > 0.9) ? 0 : 1]
  );

  px.write('./test/output.png', image);
  px.write('./test/output.jpg', image);
}());
