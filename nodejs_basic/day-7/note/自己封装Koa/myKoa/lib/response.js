"use strict";

module.exports = {
  get status() {
    return this.res.statusCode;
  },
  set status(code) {
    this.res.statusCode = code;
  },
  get message() {
    return this.res.statusMessage;
  },
  set message(msg) {
    this.res.statusMessage = msg;
  },
  get body() {
    return this._body;
  },
  set body(val) {
    this._body = val;
  }
};
