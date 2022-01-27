import * as React from 'react'
import './setting/footer.scss'
import QRCode from 'qrcode.react'
import useAppDownloadUrl from 'Src/hooks/useAppDownloadUrl'
import Pre from 'Src/components/Pre/Pre'
import { WEI_BO_URL } from 'Src/consts/CONST'

export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
  const { downUrlState } = useAppDownloadUrl({})

  return (
    <footer>
      {/* <Pre>{downUrlState}</Pre> */}
      <div className="footer_wrap">
        <div className="foot_row_1">
          <div className="foot_l">
            <div className="foot_l_1">
              <div className="f_logo"></div>
              <div className="footer_title">
                <span>米塔</span> <span>——中国最大的NFT艺术交易平台</span>
              </div>
            </div>
            <div className="contect_us">联系我们</div>
            <div className="email_f">Busnissyishu@outlook.com</div>
          </div>
          <div className="foot_r">
            <div className="f_qr_b_wrap">
              <div className="title">关注我们</div>
              <div className="f_qr_gzh"></div>
            </div>
            <div className="f_qr_b_wrap">
              <div className="title"></div>
              <div className="f_qr">
                <QRCode
                  id="qrCode"
                  value={WEI_BO_URL}
                  size={65} // 二维码的大小
                  fgColor="#000000" // 二维码的颜色
                  style={{ margin: 'auto' }}
                  // imageSettings={{
                  //   // 二维码中间的logo图片
                  //   src: 'logoUrl',
                  //   height: 100,
                  //   width: 100,
                  //   excavate: true, // 中间图片所在的位置是否镂空
                  // }}
                />
              </div>
            </div>

            <div className="f_qr_b_wrap margin_l_30">
              <div className="title">下载app</div>
              <div className="f_qr">
                <QRCode
                  id="qrCode"
                  value={downUrlState.value ? downUrlState.value.android : ''}
                  size={65} // 二维码的大小
                  fgColor="#000000" // 二维码的颜色
                  style={{ margin: 'auto' }}
                  // imageSettings={{
                  //   // 二维码中间的logo图片
                  //   src: 'logoUrl',
                  //   height: 100,
                  //   width: 100,
                  //   excavate: true, // 中间图片所在的位置是否镂空
                  // }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="foot_line"></div>
        <div className="foot_cp">浙ICP备2021029813号-4 米塔@copyright 2022</div>
      </div>
    </footer>
  )
}
