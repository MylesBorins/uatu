'use strict';
var os = require('os');
var fs = require('fs');
var path = require('path');

var test = require('tape');
var mkdirp = require('mkdirp');

var basePath = path.join(os.tmpdir(), 'uatu-' + Date.now().toString());
var firstPath = path.join(basePath, 'first');
var secondPath = path.join(basePath, 'second');
var thirdPath = path.join(basePath, 'third');
var filePath = path.join(firstPath, 'index.js');

test('symlink: setup', function (t) {
  t.plan(1);
  mkdirp.sync(firstPath);
  fs.writeFileSync(filePath, 'module.exports = \'everything is awesome\';\n');
  fs.symlinkSync(firstPath, secondPath, 'dir');
  fs.symlinkSync(secondPath, thirdPath, 'dir');
  t.ok(true, 'all done!');
});
