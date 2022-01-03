import { BASE_SIZE } from "../consts/CONST";

class ComUtils {
  setRem = () => {
    // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
    console.log("setRem----+++++++");
    const scale = document.documentElement.clientWidth / 750;
    // 设置页面根节点字体大小
    document.documentElement.style.fontSize =
      BASE_SIZE * Math.min(scale, 2) + "px";
  };
  isMobile = () => {
    try {
      const flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      console.log("flag-->", flag);

      return flag !== null;
    } catch (error) {
      return false;
    }
  };
}

export default new ComUtils();
