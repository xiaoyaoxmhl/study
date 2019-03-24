module.exports = {
  get header() {
    return this.req.headers;
  },
  set header(val) {
    this.req.headers = val;
  },

  get headers() {
    return this.req.headers;
  },
  set headers(val) {
    this.req.headers = val;
  },
  get url() {
    return this.req.url;
  },
  set url(val) {
    this.req.url = val;
  },
  get method() {
    return this.req.method;
  },
  set method(val) {
    this.req.method = val;
  },
  get path() {
    return parse(this.req).pathname;
  },
  set path(path) {
    const url = parse(this.req);
    if (url.pathname === path) return;

    url.pathname = path;
    url.path = null;

    this.url = stringify(url);
  },

  get querystring() {
    if (!this.req) return "";
    return parse(this.req).query || "";
  },

  set querystring(str) {
    const url = parse(this.req);
    if (url.search === `?${str}`) return;

    url.search = str;
    url.path = null;

    this.url = stringify(url);
  }
};
