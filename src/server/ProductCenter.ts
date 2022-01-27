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

  static artAddCheckBatch(data: IArtAddCheckBatchQ): Promise<any> {
    return http.post('/product-center/art/addCheckBatch', data, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
  }

  static artAddBatch(data: IArtAddCheckBatchQ): Promise<any> {
    return http.post('/product-center/art/addBatch', data, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
  }
  // * 获取已申请的信息
  static artistApplyInfo(): Promise<any>{
    return http.get('/product-center/artistApply/info')
  }
}

export default ProductCenter
