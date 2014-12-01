'use strict';
var os = require('os');
var fs = require('fs');
var path = require('path');

var test = require('tape');
var mkdirp = require('mkdirp');

var chokidar = require('chokidar');
// var gaze = require('gaze');
// var fsevents = require('fsevents');

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

test('symlink: chokidar', function (t) {
  t.test('* change to non symlinked file', function (tt) {
    tt.plan(2);
    var count = 0;
    var watcher = chokidar.watch(indexer(origin), {
      persistent: true
    });

    watcher.on('all', function (event) {
      console.log(event);
      count++;
      tt.ok(1);
      if (count === 2) {
        watcher.close();
      }
    });
    writeIt(origin);
  });
  t.end();
});

// test('symlink: fsevents', function(t) {
//   t.plan(1);
//   var watcher = fsevents(indexer(origin));
//   watcher.on('change', function (path, info) {
//     watcher.stop();
//     t.ok(path);
//     console.log(path);
//     console.log(info);
//   });
//   watcher.start();
// });

// test('symlink: fswatch', function (t) {
  // var watcher = fs
// });

//   // t.test('* change to double symlinked file', function (tt) {
//   //   tt.plan(1);
//   //   tt.ok(true, 'beep boop');
//   // });
//   // t.test('* change to double symlinked file', function (tt) {
//   //   tt.plan(1);
//   //   tt.ok(true, 'beep boop');
//   // });
//   t.end();
// });
// test('chokidar: damn it chokidar', function (t) {

  // w.close();


  //
  // console.log(watcher)
  // t.end();
// });

// test('chokidar: non symlinked file', function (t) {
//   var filePath = path.join(__dirname, 'fixturs', 'changeme.js');
//   var w = chokidar.watch(filePath, {
//     persistent: true
//   });
//   w.on('change', function (file) {
//     console.log('boogie woogie');
//     t.equal(file, indexer(origin));
//     t.end();
//   });
//   // writeIt(origin);
// });
//     // tt.end();
//     tt.plan(1);
//     var target = indexer(origin);
//     gaze(target, function (err, watcher) {
//       tt.error(err);
//       watcher.close();
//       return;
//     });
//     return;
    // hyperion.on('changed', function (filepath) {
    //   console.log('wat?');
    //   t.equal(filepath, target);
    // });

    // writeIt(origin);
    // hyperion.close();

    // tt.ok(1);
    // gaze(indexer(origin), function (err, watcher) {
//       tt.error(err, 'there should be no error from gaze when creating a watcher');
//       tt.ok(1);
//       // watcher.on('changed', function (filePath) {
//         // tt.equal(filePath, indexer(origin));
//         // tt.end();
//       // });
//       watcher.close();
//       // writeIt(origin);
//     });
    // tt.ok(true, 'beep boop');
  // });
  // t.test('* change to single symlinked file', function (tt) {
  //   tt.plan(1);
  //   tt.ok(true, 'beep boop');
  // });
  // t.test('* change to double symlinked file', function (tt) {
  //   tt.plan(1);
  //   tt.ok(true, 'beep boop');
  // });
  // console.log('frustrating');
  // return;
  // t.end();
// });
