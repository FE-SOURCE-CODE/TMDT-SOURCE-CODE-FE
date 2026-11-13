import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { muaCode } from '../store/slices/walletSlice';

function DownloadModal({ code, onClose }) {
  const dispatch = useDispatch();
  const soDuKhaDung = useSelector((state: RootState) => state.wallet.soDu.khaDung);
  const codeDaMua = useSelector((state: RootState) => state.wallet.codeDaMua);

  const [captcha, setCaptcha] = useState(() => String(Math.floor(1000 + Math.random() * 9000)));
  const [nhapCaptcha, setNhapCaptcha] = useState('');
  const [loiCaptcha, setLoiCaptcha] = useState('');
  const [vuaMua, setVuaMua] = useState(false);

  // đã mua rồi thì cho tải lại, không trừ tiền lần nữa
  const daMua = codeDaMua.some((item) => item.maCode === code.maCode);

  const soDuConLai = soDuKhaDung - code.phiTai;
  const duTien = soDuConLai >= 0;

  const xuLyDownload = () => {
    if (nhapCaptcha.trim() === '') {
      setLoiCaptcha('Bạn chưa nhập mã xác nhận');
      return;
    }

    if (nhapCaptcha.trim() !== captcha) {
      setLoiCaptcha('Mã xác nhận không đúng');
      // đổi mã mới sau mỗi lần nhập sai để không thử mò được
      setCaptcha(String(Math.floor(1000 + Math.random() * 9000)));
      setNhapCaptcha('');
      return;
    }

    setLoiCaptcha('');

    // sv-SE cho ra ngày giờ dạng 2026-11-13 20:55:00 giống dữ liệu trong JSON
    const ngayMua = new Date().toLocaleString('sv-SE');

    dispatch(
      muaCode({
        id: code.id,
        maCode: code.maCode,
        tenCode: code.tenCode,
        anh: code.anh,
        ngayMua: ngayMua,
        phiTai: code.phiTai,
        sdtNguoiBan: code.sdtNguoiBan,
        linkDownload: code.linkDownload,
      })
    );
    setVuaMua(true);
  };

  return (
    // bấm ra vùng tối bên ngoài thì đóng popup
    <div className="modal d-block download-modal" onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header py-2 bg-success text-white">
            <h6 className="modal-title fw-bold">
              <i className="bi bi-download me-2"></i>XÁC NHẬN DOWNLOAD
            </h6>
            <button className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body small">
            <p className="fw-bold mb-1">{code.tenCode}</p>
            <p className="text-muted mb-3">Mã code: {code.maCode}</p>

            {daMua && (
              <div>
                {vuaMua && (
                  <div className="alert alert-success py-2">
                    Thanh toán thành công, đã trừ {code.phiTai.toLocaleString('vi-VN')}đ khỏi số dư khả dụng
                  </div>
                )}
                {!vuaMua && <div className="alert alert-info py-2">Bạn đã mua code này, có thể tải lại không mất phí</div>}

                <div className="hop-link mb-3">
                  <div className="fw-bold text-success">LINK DOWNLOAD</div>
                  <a href={code.linkDownload} target="_blank">{code.linkDownload}</a>

                  {code.linkDuPhong && (
                    <div className="mt-2">
                      <div className="fw-bold text-success">LINK DỰ PHÒNG</div>
                      <a href={code.linkDuPhong} target="_blank">{code.linkDuPhong}</a>
                    </div>
                  )}
                </div>

                <div className="fw-bold mb-1">Thông tin liên hệ NGƯỜI BÁN</div>
                <div>Người bán: {code.nguoiBan}</div>
                <div>Email: {code.emailNguoiBan}</div>
                <div>SĐT/Zalo: {code.sdtNguoiBan}</div>
              </div>
            )}

            {!daMua && (
              <div>
                <div className="phep-tru mb-3">
                  <div className="dong">
                    <span>Số dư khả dụng</span>
                    <b>{soDuKhaDung.toLocaleString('vi-VN')}đ</b>
                  </div>
                  <div className="dong text-danger">
                    <span>Phí download</span>
                    <b>- {code.phiTai.toLocaleString('vi-VN')}đ</b>
                  </div>
                  <div className={duTien ? 'dong tong text-success' : 'dong tong text-danger'}>
                    <span>Số dư còn lại</span>
                    <b>{soDuConLai.toLocaleString('vi-VN')}đ</b>
                  </div>
                </div>

                {!duTien && (
                  <div className="alert alert-warning py-2">
                    Bạn còn thiếu {(code.phiTai - soDuKhaDung).toLocaleString('vi-VN')}đ, vui lòng nạp thêm tiền để tải code này
                  </div>
                )}

                {duTien && (
                  <div>
                    <label className="form-label fw-bold">Nhập mã xác nhận</label>
                    <div className="d-flex gap-2 align-items-center">
                      <span className="o-captcha">{captcha}</span>
                      <input
                        type="text"
                        maxLength={4}
                        className={loiCaptcha ? 'form-control is-invalid' : 'form-control'}
                        placeholder="4 chữ số"
                        value={nhapCaptcha}
                        onChange={(e) => setNhapCaptcha(e.target.value)}
                      />
                    </div>
                    {loiCaptcha && <div className="text-danger mt-2">{loiCaptcha}</div>}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="modal-footer py-2">
            <button className="btn btn-secondary btn-sm" onClick={onClose}>Đóng</button>
            {!daMua && (
              <button className="btn btn-success btn-sm fw-bold" disabled={!duTien} onClick={xuLyDownload}>
                DOWNLOAD CODE NGAY
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadModal;
