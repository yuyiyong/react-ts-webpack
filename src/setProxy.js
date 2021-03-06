const proxySettings = {
  // 接口代理1
  '/nft-service': {
    target: 'https://api.gmduck.com',
    changeOrigin: true,
    pathRewrite: {
      'nft-service': 'nft-service',
    },
  },
  // 接口代理2
  '/api-2/': {
    target: 'http://198.168.111.111:3002',
    changeOrigin: true,
    pathRewrite: {
      '^/api-2': '',
    },
  },
  // .....
}

module.exports = proxySettings
