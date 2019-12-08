const path = require('path');

function resolve(dir) {
	return path.join(__dirname, '..', dir);
}

module.exports = {
	configureWebpack:{
		resolve: {
			alias: {
				/*$开头都是指向外部公共资源*/
				'$assets': resolve(`./assets`),
				'$request': resolve(`./mp-api/request`),
				'$config': resolve(`./config`),
				'$css': resolve(`./public/css`),
				'$api': resolve(`./api`),
				'$mp-api': resolve(`./mp-api`),
				'$use-in-vue': resolve(`./use-in-vue`),
				'$mixin-components': resolve(`./mixin-components`),
				'$blue-components': resolve(`./public/css/blue-components/src`),
				'$code': resolve(`./code`)
			}
		}
  }
};