const path = require('path');


function resolve(_path) {
	return path.join(__dirname, './src', _path);
}

//中间层路径
const middlewarePath = resolve('../../..');

const {
	copyDir,
	watchDir
} = require('../../vue-config/dir');

//文件列表
const copyDirOpts = {
	blackList: [
		/blue-component/ig
	],
	dirList: [{
		dirPath: path.join(middlewarePath, 'components'),
		destPath: resolve(''),
		destDirName: 'components'
	}]
};


copyDir(copyDirOpts);
watchDir(copyDirOpts);