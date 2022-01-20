import http from 'Src/utils/http'

class ProductCenter {
  static artAddCheck(data: ICheckArt): Promise<ResType<any>> {
    return http.post('/product-center/art/addCheck', data, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
  }

  static artAdd(data: ICreateArt): Promise<ResType<any>> {
    return http.post('/product-center/art/add', data, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
  }

  static artistCollectionPage(): Promise<ResType<ICollectionPage[]>> {
    return http.get('/product-center/artistCollection/page')
  }

  static artistCollectionAdd(data: ICollectionAddQ): Promise<ResType<any>> {
    return http.post('/product-center/artistCollection/add', data, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
  }

  static subjectRecommendPage(data: {
    chainId: number
    pageNum: number
    pageSize: number
    position: number
  }): Promise<any> {
    return http.get('/product-center/game/page', { params: data })
  }
}

export default ProductCenter
