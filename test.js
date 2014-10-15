var test = require('tape');
var cat = require('./');
var Readable = require('stream').Readable;
var Writable = require('stream').Writable;
var concat = require('concat-stream');

test('concatenates', function(t){
  t.plan(1);
  cat([emits('abc'), emits('def')]).pipe(concat(function(str){
    t.equal(str.toString(), 'abcdef');
  }));
});

test('early end', function(t){
  var dest = Writable();
  dest._write = function(_, _, cb){
    cb();
    dest.end();
  };
  cat([emits('abc'), emits('def')]).pipe(dest);
  dest.on('finish', function(){
    t.end();
  });
});

test('read only', function(t){
  t.notOk(cat([]).writable);
  t.end();
});

function emits(str){
  var chars = str.split('');
  var idx = 0;
  var out = Readable();
  out._read = function(){
    out.push(chars[idx++]);
  };
  return out;
}

