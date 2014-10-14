var Readable = require('stream').Readable;
var read = require('stream-read');

module.exports = function cat(streams){
  var idx = 0;
  var ret = Readable();
  ret._read = function(){
    (function next(){
      var stream = streams[idx];
      if (!stream) return ret.push(null);
      read(stream, function(err, data){
        if (err) {
          endPending();
          return ret.emit('error', err);
        }
        if (!data) {
          idx++;
          next();
        } else {
          ret.push(data);
        }
      });
    })();
  };
  function endPending(){
    streams.slice(idx).forEach(function(stream){
      stream.end();
    });
  }
  return ret;
};
