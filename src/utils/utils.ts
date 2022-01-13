import { AREA, DEVICE } from './../consts/ENUM'
import { AxiosRequestConfig } from 'axios'
import CONST from '../consts/CONST'
import HookToast from 'Src/components/toast/HookToast'
const { BASE_SIZE } = CONST

class ComUtils {
  setRem = () => {
    // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
    console.log('setRem----+++++++')
    const scale = document.documentElement.clientWidth / 750
    // 设置页面根节点字体大小
    document.documentElement.style.fontSize = BASE_SIZE * Math.min(scale, 2) + 'px'
  }
  isMobile = () => {
    try {
      const flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
      )
      return flag !== null
    } catch (error) {
      return false
    }
  }
  getBrowserInfo = () => {
    let Sys: any = {}
    let ua = navigator.userAgent.toLowerCase()
    console.log('ua', ua)

    var reg = /(msie|firefox|chrome|opera|version).*?([\d.]+)/
    var m = ua.match(reg)
    console.log('m', m)
    if (m) {
      Sys.bv = m[0]
      Sys.browser = m[1].replace(/version/, "'safari")
      Sys.ver = m[2]
    }

    return Sys
  }
  RedomStr = (num: number) => {
    let str = ''
    for (let i = 0; i < num; i++) {
      const jiou = Math.floor(10 * Math.random())
      if (jiou % 2 === 1) {
        str += String.fromCharCode(Math.random() * 26 + 65)
      } else {
        str += String.fromCharCode(Math.random() * 26 + 97)
      }
    }
    return str // [65,91)
  }

  initHeaders = (config: AxiosRequestConfig<any>) => {
    let lang = 'tw'
    // config.headers!['device'] = DEVICE.pc.toString()
    config.headers!['device'] = DEVICE.android.toString()
    config.headers!['device_id'] = this.getCookie(CONST.COOKIE.DEVICE)
    config.headers!['app_version_code'] = 'web pc'
    config.headers!['access_token'] = this.getCookie(CONST.COOKIE.TOKENS)
    config.headers!['Platform'] = 'gameduck'
    config.headers!['trace_id'] = this.RedomStr(30)
    config.headers!['Accept-Language'] = lang
    config.headers!['area'] = AREA.sea.toString()
    // config.headers!['area'] = AREA.land.toString()
  }

  codeResult: CodeResult = ({ res, success, error }) => {
    try {
      if (res.code === 200) {
        success(res.data,res.page)
      } else {
        error && error(res.data)
        res.message && HookToast(res.message)
        if (res.code === 1003) {
          console.log('去登陆')
          // ! 是否去掉cookie
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * 获取cookie
   * @param name cookie名字
   * @returns {string|null}
   */
  getCookie(name: string) {
    let arr,
      reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if ((arr = document.cookie.match(reg))) {
      return unescape(arr[2])
    } else {
      return ''
    }
  }

  /**
   * 创建 cookie
   * @param cname 名字
   * @param cvalue 数据
   * @param exdays 时间
   */
  setCookie(cname: string, cvalue: string, exdays: number) {
    var date = new Date()
    date.setDate(date.getDate() + exdays) //getDate返回一个月中的某一天
    var expires = 'expires=' + date.toUTCString() //根据世界时 (UTC) 把 Date 对象转换为字符串
    document.cookie = cname + '=' + cvalue + '; ' + expires
  }
}

export default new ComUtils()
