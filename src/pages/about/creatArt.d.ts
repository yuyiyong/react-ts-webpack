// Generated by https://quicktype.io
interface ICheckArt {
  artCount: number
  chainId: number
  gas: number
  name: string
  description: string
  currencyId: number
  collectionId: number
  // userId:       number;
  url: string
}

interface ICreateArt extends ICheckArt {
  safePassword: string
}

// Generated by https://quicktype.io

interface IArtAddCheckBatchQ {
  chainId: number
  gas: number
  artList: ArtList[]
  currencyId: number
  collectionId: number
  //   userId: number
}

interface ArtList {
  artCount: number
  name: string
  description: string
  url: string
}

// Generated by https://quicktype.io

interface IArtAddBatchQ extends IArtAddCheckBatchQ {
  safePassword: string
  // userId:       number;
}
