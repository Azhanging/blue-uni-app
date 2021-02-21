import utils from 'blue-utils';

//默认数据key
const BASE_KEY = `scroll`;

//加载状态
enum STATUS {
	NORMAL = `normal`,
	NO_MORE = `no-more`,
	ERROR = `error`
}

//默认提示
const tips = {
	[ STATUS.NORMAL ]: `数据加载中...`,
	[ STATUS.NO_MORE ]: `暂无更多数据`,
	[ STATUS.ERROR ]: `数据加载异常...`
};

//表单数据
interface TScrollForm {
	[ propName: string ]: any;
}

//scroll数据类型
interface TScrollData {
	//scroll项目名
	name: string;
	//表达数据
	form?: TScrollForm;
	//状态
	status?: STATUS;
	//表单数据
	//当前提示
	currentTip?: string;
	//提示
	tips: {
		[ statusName: string ]: string
	};
	//列表数据
	list?: any[];
	//重置状态
	resetStatus?: boolean;

	//其他参数
	[ propName: string ]: any;
}

//scroll mixin配置
interface TScrollOpts {
	baseDataName?: string;
	scrolls?: TScrollData[];
}

//生成的scroll name map
interface TScrollNameMap {
	[ propName: string ]: TScrollData;
}

function getScrollData ( opts: TScrollData ): TScrollData {
	return utils.extend({
		//scroll name
		name: ``,
		//表单数据
		form: {},
		//加载状态 //normal(正常) | no-more(不能再加数据了) | error(加载数据错误)
		status: STATUS.NORMAL,
		//当前提示
		currentTip: tips[ STATUS.NORMAL ],
		//提示
		tips,
		//列表数据
		list: [],
		//重置状态
		resetStatus: false
	}, (() => {
		const _opts: any = {};
		utils.each(opts || {}, ( item: any, key: string ) => {
			_opts[ key ] = utils.hook(null, item);
		});
		return _opts;
	})());
}

//生成scroll mixin
export default function scrollMixin ( opts: TScrollOpts = {} ) {
	const {
		baseDataName = BASE_KEY,
		scrolls: _scrolls = []
	} = opts;

	//设置默认的name
	if (_scrolls.length === 0) {
		throw (`请配置相关scroll name信息`);
	}

	function getScrolls (): TScrollNameMap {
		//多个scroll数据
		const scrolls: TScrollNameMap = {};
		_scrolls.forEach(( scroll: TScrollData ) => {
			scrolls[ scroll.name ] = getScrollData(scroll);
		});
		return scrolls;
	}

	return {
		data () {
			return {
				[ baseDataName ]: {
					//多个滑动
					scrolls: getScrolls(),
					//加载状态
					STATUS,
					//重置状态
					resetStatus: false
				},
			};
		},
		methods: {
			getScroll ( name: string ): TScrollData {
				if (name.indexOf(`.`) !== -1) {
					const [baseDataName, subName] = name.split(`.`);
					return (this as any)[ baseDataName ].scrolls[ subName ];
				}
				return (this as any)[ baseDataName ].scrolls[ name ];
			},
			//设置可滑动状态
			scrollStatus ( name: string, status: STATUS ) {
				const scroll: TScrollData = (this as any).getScroll(name);
				//获取状态
				if (status === undefined) {
					return scroll.status !== STATUS.NO_MORE;
				}
				//设置状态
				scroll.status = status;
				//设置当前状态提醒信息
				(this as any).setScrollCurrentTips(name, status);
			},
			//获取form
			scrollForm ( name: string, params: TScrollForm = {} ): void | TScrollForm {
				const scroll: TScrollData = (this as any).getScroll(name);
				if (params) {
					const { form } = scroll;
					scroll.form = utils.extend(form, params);
				} else {
					return scroll.form;
				}
			},
			//重置列表数据
			scrollList ( name: string, list: any[], reset: boolean = false ): void | any[] {
				const scroll: TScrollData = (this as any).getScroll(name);
				if (reset) {
					scroll.list = [];
					(this as any).scrollStatus(name, STATUS.NORMAL);
				} else {
					if (list === undefined) return scroll.list;
					scroll.list = list;
				}
			},
			//设置当前的提示信息
			setScrollCurrentTips ( name: string, status: STATUS ): void {
				const scroll: TScrollData = (this as any).getScroll(name);
				const { tips } = scroll;
				scroll.currentTip = tips[ status ] || ``;
			},
			//重置所有的状态
			resetScrolls ( _baseDataName: string = baseDataName ): Promise<any> {
				// @ts-ignore
				return new Promise(( resolve ) => {
					let scroll: TScrollData;
					if (_baseDataName.indexOf(`.`) !== -1) {
						//针对单个scroll重置
						const [baseDataName, name]: string[] = _baseDataName.split(`.`);
						const currentScrolls = (this as any)[ baseDataName ].scrolls;
						scroll = currentScrolls[ name ] = getScrolls()[ name ];
					} else {
						//用于多个scroll重置
						scroll = (this as any)[ _baseDataName ];
						scroll.scrolls = getScrolls();
					}
					//设置重置状态
					if (!scroll) return;
					scroll.resetStatus = true;
					setTimeout(() => {
						//反处理重置状态
						scroll.resetStatus = false;
						resolve();
					}, 10);
				});
			}
		}
	};
}