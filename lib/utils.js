/**
 * 工具函数模块
 */

var os = require('os');

/**
 * 获取所有IPv4地址
 * @param {Object} ifaces - os.networkInterfaces()的返回值
 * @return {Array} IPv4地址数组
 */
function getAllIPAddresses(ifaces = os.networkInterfaces()) {
  var ipList = [];
  for (var dev in ifaces) {
    ifaces[dev].forEach(function (details) {
      if (details.family === 'IPv4' && !details.internal) {
        ipList.push(details.address);
      }
    });
  }
  // Local IP first
  ipList.sort(function (ip1) {
    if(ip1.indexOf('192') >= 0){
      return -1;
    }
    return 1;
  });
  return ipList.length > 0 ? ipList : ["127.0.0.1"];
}

module.exports = {
  getAllIPAddresses: getAllIPAddresses
};

