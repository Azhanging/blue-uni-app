//设置环境变量
function setProjectENV() {
  const argv = process.argv.splice(2);
  if (argv.length > 1) {
    process.env.PROJECT_ENV = argv[0];
  }
}

module.exports = {
  setProjectENV
};