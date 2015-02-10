'use strict';
var os = require('os');
var fs = require('fs');
var path = require('path');

var test = require('tape');
var mkdirp = require('mkdirp');

var chokidar = require('chokidar');

var basePath = path.join(os.tmpdir(), 'uatu-' + Date.now().toString());
var origin = path.join(basePath, 'first');
var deep = path.join(origin, 'one', 'two');
var deeper = path.join(deep, 'three');
var deepest = path.join(deeper, 'four');

var onceRemoved = path.join(basePath, 'second');

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

function testFolder(folder, t) {
  t.plan(1);
  var watcher = chokidar.watch(indexer(folder), {
    persistent: true
  });

  watcher.on('change', function (event) {
    t.ok(1, event);
    watcher.close();
  });
  writeIt(folder);
}

test('symlink: setup', function (t) {
  t.plan(1);
  mkdirp.sync(origin);
  mkdirp.sync(deep);
  mkdirp.sync(deeper);
  mkdirp.sync(deepest);
  fs.symlinkSync(origin, onceRemoved, 'dir');
  writeIt(origin);
  writeIt(deep);
  writeIt(deeper);
  writeIt(deepest);

  t.ok(true, 'all done!');
});

test('change to non symlinked file', function (t) {
  testFolder(origin, t);
});
