(function() {
  'use strict';

  module.exports.map =
    (data, f) => {
      var length = data.length,
          size = f.length,
          constructor = data.constructor || Array,
          block;
      if (length % size !== 0)
        throw new Error('Array length must be divisible by iterator argument count.');

      var result = new constructor(length);
      for (var i = 0; i < length; i += size) {
        block = f(...data.slice(i, i + size));
        for (var j = 0; j < block.length; j++)
          result[i + j] = block[j];
      }

      return result;
    };

  module.exports.expand =
    (data, f) => {
      var length = data.length,
          size = f.length,
          step = f().length,
          constructor = data.constructor || Array,
          block;

      if (length % size !== 0)
        throw new Error('Array length must be divisible by iterator argument count.');

      var result = new constructor(length * (step / size));
      for (var i = 0; i < length; i += size) {
        block = data.slice(i, i + step);
        block = f(...block);
        for (var j = 0; j < step; j++)
          result[i * (step / size) + j] = block[j];
      }

      return result;
    };

  module.exports.reduce =
    (data, f) => {
      var length = data.length,
          size = f.length,
          constructor = data.constructor || Array,
          block;
      if (length % size !== 0)
        throw new Error('Array length must be divisible by iterator argument count.');

      var result = new constructor(length / size);
      for (var i = 0, j = 0; i < length; i += size, j++)
        result[j] = f(...data.slice(i, i + size));

      return result;
    };
}());
