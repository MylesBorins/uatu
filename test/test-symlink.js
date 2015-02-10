'use strict';
var os = require('os');
var fs = require('fs');
var path = require('path');

var test = require('tape');
var mkdirp = require('mkdirp');

var chokidar = require('chokidar');

var basePath = path.join(os.tmpdir(), 'uatu-' + Date.now().toString());
var origin = path.join(basePath, 'first');
var onceRemoved = path.join(basePath, 'second');
var twiceRemoved = path.join(basePath, 'third');

var dictionary = ['oh', 'my', 'glob', 'algebraic', 'tony-haw-pro-skater-2010'];

var getRandomWord = function () {
  return dictionary[Math.floor(Math.random() * dictionary.length)];
};

var payload = 'Oh hai';

function indexer(root) {
  return path.join(root, 'index.js');
}

function writeIt(root) {
  payload = [payload, getRandomWord()].join(' ');
  fs.writeFileSync(indexer(root), payload);
}

test('symlink: setup', function (t) {
  t.plan(1);
  mkdirp.sync(origin);
  fs.symlinkSync(origin, onceRemoved, 'dir');
  fs.symlinkSync(onceRemoved, twiceRemoved, 'dir');
  writeIt(origin);
  t.ok(true, 'all done!');
});

test('change to non symlinked file', function (t) {
  t.plan(1);
  var watcher = chokidar.watch(indexer(origin), {
    persistent: true
  });

  watcher.on('change', function (event) {
    t.ok(1, event);
    watcher.close();
  });
  writeIt(origin);
});
