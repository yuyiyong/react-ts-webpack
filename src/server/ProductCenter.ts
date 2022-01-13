import http from 'Src/utils/http'

class ProductCenter {
  static subjectRecommendPage(data: {chainId:number; pageNum: number; pageSize: number; position: number }): Promise<any> {
    return http.get('/product-center/game/page', { params: data })
  }
}

export default ProductCenter


