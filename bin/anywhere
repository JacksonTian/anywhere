#!/usr/bin/env node

var os = require('os');
var fs = require('fs');
var path = require('path');
var http = require('http');
var https = require('https');

var connect = require('connect');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');
var fallback = require('connect-history-api-fallback');

var debug = require('debug');
debug.enable('anywhere');

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var argv = require("minimist")(process.argv.slice(2), {
  alias: {
    'silent': 's',
    'port': 'p',
    'hostname': 'h',
    'dir': 'd',
    'log': 'l',
    'fallback': 'f'
  },
  string: ['port', 'hostname', 'fallback'],
  boolean: ['silent', 'log'],
  'default': {
    'port': 8000,
    'dir': process.cwd()
  }
});

if (argv.help) {
  console.log("Usage:");
  console.log("  anywhere --help // print help information");
  console.log("  anywhere // 8000 as default port, current folder as root");
  console.log("  anywhere 8888 // 8888 as port");
  console.log("  anywhere -p 8989 // 8989 as port");
  console.log("  anywhere -s // don't open browser");
  console.log("  anywhere -h localhost // localhost as hostname");
  console.log("  anywhere -d /home // /home as root");
  console.log("  anywhere -l // print log");
  console.log("  anywhere -f // Enable history fallback");
  process.exit(0);
}

var openURL = function (url) {
  switch (process.platform) {
    case "darwin":
      exec('open ' + url);
      break;
    case "win32":
      exec('start ' + url);
      break;
    default:
      spawn('xdg-open', [url]);
    // I use `spawn` since `exec` fails on my machine (Linux i386).
    // I heard that `exec` has memory limitation of buffer size of 512k.
    // http://stackoverflow.com/a/16099450/222893
    // But I am not sure if this memory limit causes the failure of `exec`.
    // `xdg-open` is specified in freedesktop standard, so it should work on
    // Linux, *BSD, solaris, etc.
  }
};

/**
 * Get ip(v4) address
 * @return {String} the ipv4 address or 'localhost'
 */
var getIPAddress = function () {
  var ifaces = os.networkInterfaces();
  var ip = '';
  for (var dev in ifaces) {
    ifaces[dev].forEach(function (details) {
      if (ip === '' && details.family === 'IPv4' && !details.internal) {
        ip = details.address;
        return;
      }
    });
  }
  return ip || "127.0.0.1";
};

var log = debug('anywhere');

var app = connect();
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (argv.log) {
    log(req.method + ' ' + req.url);
  }
  next();
});
if (argv.fallback !== undefined) {
  console.log('Enable html5 history mode.');
  app.use(fallback({
    index: argv.fallback || '/index.html'
  }));
}
app.use(serveStatic(argv.dir, { 'index': ['index.html'] }));
app.use(serveIndex(argv.dir, { 'icons': true }));

// anywhere 8888
// anywhere -p 8989
// anywhere 8888 -s // silent
// anywhere -h localhost
// anywhere -d /home
var port = parseInt(argv._[0] || argv.port, 10);
var secure = port + 1;

var hostname = argv.hostname || getIPAddress();

http.createServer(app).listen(port, function () {
  // 忽略80端口
  port = (port != 80 ? ':' + port : '');
  var url = "http://" + hostname + port + '/';
  console.log("Running at " + url);
  if (!argv.silent) {
    openURL(url);
  }
});

var options = {
  key: fs.readFileSync(path.join(__dirname, '../keys', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../keys', 'cert.pem'))
};

https.createServer(options, app).listen(secure, function () {
  secure = (secure != 80 ? ':' + secure : '');
  var url = "https://" + hostname + secure + '/';
  console.log("Also running at " + url);
});
