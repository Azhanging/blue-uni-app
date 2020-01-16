import config from '@config';

class WebView {
  constructor() {
    this._init();
  }

  _init() {
    this.webView = {};
  }

  setWebView(webview) {
    this.webView = webview;
  }

  getWebView() {
    return this.webView;
  }

  removeWebView() {
    this._init();
  }

  navigateTo(opts = {}) {
    this.setWebView(opts);
    uni.navigateTo({
      url: opts.url || config.path.webview
    });
  }
}

export function webViewInVue(Vue) {
  Vue.prototype.$webView = new WebView();
}