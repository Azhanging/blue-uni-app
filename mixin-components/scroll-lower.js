import utils from 'blue-utils';

//default mixin more data config
function scrollLower(opts = {
	loadKey: 'loadMore'
}) {
	return utils.extend({
		data() {
			return {
				[opts.loadKey || 'loadMore']: {
					//加载的数据相关
					data: {
						list: []
					},
					//请求数据相关
					ajax: {
						url: "",
						params: {
							page: 0
						}
					},
					//滑动的距离
					lowerThreshold: 50,
					//列表长度，用于判定数据长度，下一页是否还有数据
					listLen: 10,
					//状态
					status: {
						disabled: false
					},
					//钩子相关
					hooks: {
						//拿到数据后执行的钩子
						got(res) {
							try {
								return res.data['list'];
							} catch (e) {
								return [];
							}
						}
					}
				}
			};
		},
		methods: {
			//加载方法
			scrollLower(opts = {
				loadKey: 'loadMore'
			}) {
				return new Promise((resolve, reject) => {
					const {
						status,
						data,
						ajax,
						listLen,
						hooks
					} = this[opts.loadKey];

					//没有数据退出处理
					if (status.disabled) {
						reject();
						return;
					}

					//分页++
					ajax.params.page++;

					//获取列表数据
					this.$request({
						data: ajax.params,
					}).then((res) => {
						//通过got拦截数据
						const listData = utils.hook(this, hooks.got, [res]) || [];
						//合并list数据
						data.list = data.list.concat(listData);
						//(检查列表数据是为空 || 少于预期长度) 都是视为没有下一页数据
						if (listData.length < 1 || listData.length < listLen) {
							status.disabled = true;
						}
						//还有数据的时候处理
						resolve(res);
					});
				});
			},

			//清除loadMore的列表和状态
			resetScrollLower(opts = {
				loadKey: `loadMore`
			}) {
				return new Promise((resolve, reject) => {
					try {
						const {loadKey} = opts;
						const loadMore = this[loadKey];
						const loadMoreData = loadMore.data;
						loadMore.params.page = 1;
						loadMoreData.list = [];
						loadMore.state = {
							disabled: false
						};
						resolve();
					} catch (e) {
						reject(e);
					}
				});
			}
		}
	}, opts);
}

//mixin config
export default scrollLower;
