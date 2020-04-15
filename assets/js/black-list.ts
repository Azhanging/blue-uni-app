import config from '@config';
import utils from 'blue-utils';

//黑名单列表配置
export interface TBlackListOpts {
	path: string | RegExp;
	sharePath: string | Function;
}

//黑名单过滤配置选项
interface TBlackListFilterOpts {
	path: string;
	blackList: TBlackListOpts[]
}

//查询黑名单
export function blackListFilter ( opts: TBlackListFilterOpts ): string {
	const {path, blackList = []} = opts;
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