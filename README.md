Anywhere 随启随用的静态文件服务器
==============================

Running static file server anywhere. 随时随地将你的当前目录变成一个静态文件服务器的根目录。

## Installation

Install it as a command line tool via `npm -g`.

```sh
npm install anywhere -g
```

## Execution

```sh
$ anywhere
// or with port
$ anywhere -p 8000
// or start it but silent(don't open browser)
$ anywhere -s
// or with hostname
$ anywhere -h localhost -p 8888
// or with folder
$ anywhere -d ~/git/anywhere
// or enable html5 history
$ anywhere -f /index.html
```

## Help

```sh
$ anywhere --help
Usage:
  anywhere --help // print help information
  anywhere // 8000 as default port, current folder as root
  anywhere 8888 // 8888 as port
  anywhere -p 8989 // 8989 as port
  anywhere -s // don't open browser
  anywhere -h localhost // localhost as hostname
  anywhere -d /home // /home as root
  anywhere -f /index.html  // Enable html5 history,the index is /index.html
```

## Visit

```
http://localhost:8000
```
执行命令后，默认浏览器将为您自动打开主页。

## License
The MIT license.
