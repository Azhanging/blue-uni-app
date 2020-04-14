import config from '@config';
import utils from 'blue-utils';

//查询黑名单
export function blackListFilter ( opts: {
	path: string;
	blackList: {
		path: string | RegExp;
		sharePath: string;
	}[]
} ): string {
	const {path, blackList} = opts;
	const homePath: string = config.path.home;
	for (let i = 0; i < blackList.length; i++) {
		const item = blackList[i];
		if ((typeof item.path === 'string' && item.path === path) ||
			(item.path instanceof RegExp && item.path.test(path))) {
			//匹配字符串类型
			return utils.hook(null, item.sharePath) || homePath;
		}
	}
	//没有查询到返回默认的地址
	return path;
}