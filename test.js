var test = require('tape');
var cat = require('./');
var Readable = require('stream').Readable;
var Writable = require('stream').Writable;
var concat = require('concat-stream');
var through = require('through');

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

test('forward errors', function(t){
  t.plan(1);
  var src = emits('oops');
  var c = cat([src]);
  c.on('error', function(err){
    t.ok(err);
  });
  src.emit('error', new Error);
});

test('quick push streams', function(t){
  t.plan(1);
  var a = through();
  var b = through();
  cat([a, b]).pipe(concat(function(str){
    t.equal(str.toString(), 'ab');
  }));
  b.emit('data', 'b');
  a.emit('data', 'a');
  a.end();
  b.end();
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

