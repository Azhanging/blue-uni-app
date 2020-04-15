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

	getWebView (): any {
		return this.webView;
	}

	removeWebView () {
		this._init();
	}

	navigateTo ( opts: {
		url: string;
		src: string;
		title?: string;
	} ) {
		this.setWebView(opts);
		uni.navigateTo({
			url: opts.url || config.path.webview
		});
	}
}

export function webViewInVue ( Vue: any ): void {
	Vue.prototype.$webView = new WebView();
}