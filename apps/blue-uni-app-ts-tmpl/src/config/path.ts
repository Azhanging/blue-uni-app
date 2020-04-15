const env = process.env.PROJECT_ENV;
//环境地址
const path = ((): any => {
	switch (env) {
		case 'base':
			//beta环境path
			return {};
		case 'prod':
			//生产环境path
			return {
				static: ``,
				home: `/pages/home/index`
			};
		default:
			//测试环境path
			return {
				static: ``,
				home: `/pages/home/index`,
				register: `/pages/register/index`
			};
	}
})();

export default path;
