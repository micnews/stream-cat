var PassThrough = require('stream').PassThrough;
var readonly = require('read-only-stream');
var Readable = require('stream').Readable;

module.exports = function cat(streams){
  // force pull mode
  streams = streams.map(function(stream){
    return Readable().wrap(stream);
  });

  var out = PassThrough();

  (function next(i){
    var stream = streams[i];
    if (!stream) return out.push(null);
    stream.pipe(out, { end: false });
    stream.on('error', function(err){
      out.emit('error', err);
    });
    stream.on('end', function(){
      next(i + 1);
    });
  })(0);

  return readonly(out);
};
