interface loginByEmailParams {
  email?: string
  code?: string
  img?: string
}
interface loginByMobileParams {
  mobile?: number
  code?: string
  countryCode?: number
}

interface LoginParams extends loginByEmailParams, loginByMobileParams {}

type sendEmailParams = {
  type: SEND_EMAIL_TYPE
  email: string
}
