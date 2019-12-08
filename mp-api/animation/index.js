//动画相关

//在vue扩展
export function animationInVue(Vue) {
  Vue.prototype.$slide = slide;
  Vue.prototype.$scale = scale;
}

const defaultAnimationOpts = {
  duration: 300,
  timingFunction: 'ease'
};

//创建动画
function createAnimation(opts = defaultAnimationOpts) {
  return uni.createAnimation(opts);
}

//上动画 不带参数都是返回open状态
function slide(opts = {
  animationOpts: defaultAnimationOpts,
  opacity: 1,
  y: 0
}) {
  //初始动画构建
  const {
    opacity,
    animationOpts,
    y
  } = opts;
  const animation = createAnimation(animationOpts);
  animation.translateY(y).opacity(opacity).step();
  return animation.export();
}

//缩放动画  不带参数都是返回open状态
function scale(opts = {
  animationOpts: defaultAnimationOpts,
  opacity: 1,
  scale: 1
}) {
  //初始动画构建
  const {
    opacity,
    animationOpts,
    scale
  } = opts;
  const animation = createAnimation(animationOpts);
  animation.scale(scale).opacity(opacity).step();
  return animation.export();
}
