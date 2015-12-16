# pixels

Image processing library.

```bash
$ npm install pixels
$ npm test
```

```javascript
var px = require('pixels');
```

### Usage

Read image into a `Float64Array`.

```javascript
image = px.read('./test/input.jpg', Float64Array);
```

Reduce image into [grayscale](https://en.wikipedia.org/wiki/Grayscale) bitmap.

```javascript
// reduce [r, g, b, a, ...] => [x, ...]
px.reduce(image,
  (r, g, b, a) =>
    0.2126 * r +
    0.7152 * g +
    0.0722 * b
);
```

Expand back to original size and set `alpha` to a random value.

```javascript
// expand [x, ...] => [r, g, b, a, ...]
px.expand(image,
  (x) =>
    [x, x, x, Math.random()]
);
```

Output to file.

```javascript
px.write('./test/output.png', image);
px.write('./test/output.jpg', image);
```

| Original | Processed PNG | Processed JPEG |
| --- | --- | --- |
| ![original](test/input.jpg) | ![png](test/output.png) | ![jpeg](test/output.jpg) |

### API

#### `read(file, type)`

Reads an image `file` into the specified `type` (`TypedArray`).

#### `write(file, image)`

Writes an `image` to `file`.

#### `reduce(image, f)`

Reduces blocks of data in an `image`. Block size is inferred from the number of arguments in `f`. See [blockman](https://github.com/mateogianolio/blockman).

#### `expand(image, f)`

Expands blocks of data in an `image`. Block size is inferred from the number of arguments in `f`. See [blockman](https://github.com/mateogianolio/blockman).
