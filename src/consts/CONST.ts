const BASE_SIZE = 16
export enum LANG {
  cn,
  en,
}

export enum THEME {
  dark,
  light,
}

const COOKIE = {
  DEVICE: 'DEVICE',
  TOKENS: 'TKD98F0S8D0',
  DAY: 180,
}

export default {
  BASE_SIZE,
  LANG,
  COOKIE,
  LOADING: 'LOADING',
}

export const UPLOAD_TYPE = {
  ARTIST_AVATAR: 'artist_avatar', // 艺术家头像,
  ARTIST_BACKGROUND: 'artist_background', // 艺术家背景,
  ART_IMAGE: 'art_image', // 艺术图片,
  ARTIST_APPROVAL: 'artist_approval', // 艺术家认证授权函
}

export const IOS_APP_DOWNLOAD_URL = 'https://testflight.apple.com/join/r1rP9Ozw'
export const WEI_BO_URL = 'https://weibo.com/u/7734033386'

export enum AUDIT_STATUS {
  NO_APPLY, //未申请
  TO_AUDIT, // 待审核
  TO_PASS, // 待审核
  TO_REJECT, // 待审核
}
export const AUDIT_STATUS_TYPE = {
  [AUDIT_STATUS.NO_APPLY]: '未申请',
  [AUDIT_STATUS.TO_AUDIT]: ' 待审核',
  [AUDIT_STATUS.TO_PASS]: ' 待审核',
  [AUDIT_STATUS.TO_REJECT]: ' 待审核',
}
