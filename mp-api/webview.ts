import config from '@config';

class WebView {
	webView: any;

	constructor () {
		this._init();
	}

	_init () {
		this.webView = {};
	}

	setWebView ( webview: any ) {
		this.webView = webview;
	}

	getWebView () {
		return this.webView;
	}

	removeWebView () {
		this._init();
	}

	navigateTo ( opts: {
		url: string;
	} ) {
		this.setWebView(opts);
		uni.navigateTo({
			url: opts.url || config.path.webview
		});
	}
}

export function webViewInVue ( Vue: any ) {
	Vue.prototype.$webView = new WebView();
}