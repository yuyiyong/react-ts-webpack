import  CONST  from 'Src/consts/CONST';
import http from 'Src/utils/http'
class UserCenter {
  /**
   * @description:
   * @param {loginByEmailParams} data
   * @return {*}
   */
  static loginByEmail(data: loginByEmailParams): Promise<ResType<LoginEmailResponse>> {
    // return http.post('/user-center/login/email', data, {
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8',
    //   },
    // })
    return http.get("/nft-service/coin/chainlist/new?status=0");
  }

  static sendEmail(data: sendEmailParams): Promise<any> {
    return http.post('/user-center/msg/sendEmail', data, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
  }

  static infoSet(): Promise<ResType<InfoSetResponse>> {
    return http.get('/user-center/info/set', { headers: { showLoading: CONST.LOADING } })
  }
}

export default UserCenter
