var PassThrough = require('stream').PassThrough;
var readonly = require('read-only-stream');

module.exports = function cat(streams){
  var out = PassThrough();

  (function next(i){
    var stream = streams[i];
    if (!stream) return out.push(null);
    stream.pipe(out, { end: false });
    stream.on('end', function(){
      next(i + 1);
    });
  })(0);

  return readonly(out);
};
