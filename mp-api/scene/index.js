/*
* 场景码相关业务
* */
import { setShareQuery } from "../share";
import { checkRegister } from '$mp-api/register';
import utils from 'blue-utils';
import config from '@config';

//检查场景码
export function checkScene(opts) {

  //避免没有参数
  if (!opts.query) opts.query = {};

  //修改path
  opts.path = `/${opts.path}`;

  //获取场景值
  const scene = opts.scene;
  const query = utils.parseParams(decodeURIComponent(opts.query.scene));

  //切入的场景码
  const sceneCode = [
    1007, 1008, 1011, 1012,
    1013, 1014, 1048, 1049,
    1036, 1073, 1074, 1096,
    1038
  ];

  //检查切入的场景码
  if (sceneCode.indexOf(scene) !== -1) {
    //设置分享参数
    setShareQuery(query);
    //config中的show hook
    utils.hook(null, config.hooks.show, [opts]);
  }
}