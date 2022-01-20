import http from 'Src/utils/http'
class NftServer {
  static chainlist():Promise<ResType<ICoinChainlist[]>> {
    return http.get('/nft-service/coin/chainlist/new?status=0')
  }
}

export default NftServer
