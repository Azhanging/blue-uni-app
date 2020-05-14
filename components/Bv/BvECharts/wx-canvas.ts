export default class WxCanvas {
	ctx: any;
	canvasId: string;
	chart: any;
	event: any;

	constructor ( ctx: any, canvasId: string ) {
		this.ctx = ctx;
		this.canvasId = canvasId;
		this.chart = null;

		WxCanvas.initStyle(ctx);
		this.initEvent();
	}

	static initStyle ( ...args: any[] ) {
		const [ctx]: any[] = args;

		['fillStyle', 'strokeStyle', 'globalAlpha',
			'textAlign', 'textBaseAlign', 'shadow', 'lineWidth',
			'lineCap', 'lineJoin', 'lineDash', 'miterLimit', 'fontSize'].forEach(( style: string ) => {
			Object.defineProperty(ctx, style, {
				set: ( value: any ) => {
					if ((style !== 'fillStyle' && style !== 'strokeStyle') || (value !== 'none' && value !== null)) {
						ctx[ `set${style.charAt(0).toUpperCase()}${style.slice(1)}` ](value);
					}
				},
			});
		});

		ctx.createRadialGradient = () => ctx.createCircularGradient(args);
	}

	getContext ( contextType: string ): any {
		return contextType === '2d' ? this.ctx : null;
	}

	setChart ( chart: any ) {
		this.chart = chart;
	}

	attachEvent () {
		// noop
	}

	detachEvent () {
		// noop
	}

	initEvent () {
		this.event = {};
		const eventNames = [{
			wxName: 'touchStart',
			ecName: 'mousedown',
		}, {
			wxName: 'touchMove',
			ecName: 'mousemove',
		}, {
			wxName: 'touchEnd',
			ecName: 'mouseup',
		}, {
			wxName: 'touchEnd',
			ecName: 'click',
		}];

		eventNames.forEach(( name: {
			wxName: string;
			ecName: string;
		} ) => {
			this.event[ name.wxName ] = ( e: any ) => {
				const touch = e.mp.touches[ 0 ];
				this.chart._zr.handler.dispatch(name.ecName, {
					zrX: name.wxName === 'tap' ? touch.clientX : touch.x,
					zrY: name.wxName === 'tap' ? touch.clientY : touch.y,
				});
			};
		});
	}
}