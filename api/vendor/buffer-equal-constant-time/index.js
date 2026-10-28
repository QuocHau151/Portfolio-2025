'use strict';
// Shim cho buffer-equal-constant-time: giữ nguyên API gốc nhưng không dùng
// buffer.SlowBuffer (đã bị gỡ ở Node 26). So sánh bằng crypto.timingSafeEqual.
var Buffer = require('buffer').Buffer;
var timingSafeEqual = require('crypto').timingSafeEqual;

module.exports = bufferEq;

function bufferEq(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    return false;
  }
  // Độ dài buffer không phải thông tin bí mật, nên được phép return sớm
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
}

var origBufEqual = Buffer.prototype.equal;

bufferEq.install = function () {
  Buffer.prototype.equal = function equal(that) {
    return bufferEq(this, that);
  };
};

bufferEq.restore = function () {
  Buffer.prototype.equal = origBufEqual;
};
