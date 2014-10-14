
# stream-cat

  Concatenate streams, the simple way.

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

  Given an array of `streams`, drain one after another completely and stream the results. Returns a readable stream.

  Just like `cat streamA streamB`.

## License

  MIT

