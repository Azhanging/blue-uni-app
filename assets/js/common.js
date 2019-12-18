//公共方法
import * as mp from '$mp-api/compatible';

function s4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

//生成一个UUID
function guid() {
  return (s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4());
}

//获取ticket
export function getTicket() {
  let ticket = uni.getStorageSync("ticket");
  if (ticket === undefined || ticket === null || ticket === "") {
    ticket = guid();
    uni.setStorageSync('ticket', ticket);
  }
  return ticket;
}