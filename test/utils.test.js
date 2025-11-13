var test = require('node:test');
var assert = require('assert').strict;
var utils = require('../lib/utils');

test('utils.getAllIPAddresses - 应该返回IPv4地址数组', function() {
  var mockInterfaces = {
    'eth0': [
      { family: 'IPv4', address: '192.168.1.100', internal: false },
      { family: 'IPv6', address: '::1', internal: false }
    ],
    'lo': [
      { family: 'IPv4', address: '127.0.0.1', internal: true }
    ]
  };
  
  var result = utils.getAllIPAddresses(mockInterfaces);
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0], '192.168.1.100');
});

test('utils.getAllIPAddresses - 如果没有外部IP地址，应该返回127.0.0.1', function() {
  var mockInterfaces = {
    'lo': [
      { family: 'IPv4', address: '127.0.0.1', internal: true }
    ]
  };
  
  var result = utils.getAllIPAddresses(mockInterfaces);
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0], '127.0.0.1');
});

test('utils.getAllIPAddresses - 应该优先返回192开头的IP', function() {
  var mockInterfaces = {
    'eth0': [
      { family: 'IPv4', address: '10.0.0.1', internal: false },
      { family: 'IPv4', address: '192.168.1.100', internal: false }
    ]
  };
  
  var result = utils.getAllIPAddresses(mockInterfaces);
  assert.strictEqual(result.length, 2);
  assert.strictEqual(result[0], '192.168.1.100');
  assert.strictEqual(result[1], '10.0.0.1');
});

test('utils.getAllIPAddresses - 如果没有IP地址，应该返回127.0.0.1', function() {
  var mockInterfaces = {};
  var result = utils.getAllIPAddresses(mockInterfaces);
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0], '127.0.0.1');
});

