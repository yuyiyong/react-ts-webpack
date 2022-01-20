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
