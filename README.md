
# stream-cat

  Concatenate streams, the simple way.

  [![build status](https://secure.travis-ci.org/micnews/stream-cat.svg)](http://travis-ci.org/micnews/stream-cat)

  [![testling badge](https://ci.testling.com/micnews/stream-cat.png)](https://ci.testling.com/micnews/stream-cat)

## Example

```js
var cat = require('stream-cat');

cat([abcStream(), defStream()]).pipe(process.stdout);

// outputs:
a b c d e f
```

## Installation

```bash
$ npm install stream-cat
```

## API

### cat(streams)

  Given an array of `streams`, drain one after another completely and stream the results. Returns a readable stream. Errors are forwarded.

  Just like `cat streamA streamB`.

## License

  MIT

