import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

function DownloadModal({ code, onClose }) {
  const soDuKhaDung = useSelector((state: RootState) => state.wallet.soDu.khaDung);

  const [captcha, setCaptcha] = useState(() => String(Math.floor(1000 + Math.random() * 9000)));
  const [nhapCaptcha, setNhapCaptcha] = useState('');
  const [loiCaptcha, setLoiCaptcha] = useState('');
  const [daXacNhan, setDaXacNhan] = useState(false);

  const soDuConLai = soDuKhaDung - code.phiTai;
  const duTien = soDuConLai >= 0;

  const kiemTraCaptcha = () => {
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
    setDaXacNhan(true);
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
                {daXacNhan && <div className="alert alert-success py-2 mt-2 mb-0">Mã xác nhận đúng</div>}
              </div>
            )}
          </div>

          <div className="modal-footer py-2">
            <button className="btn btn-secondary btn-sm" onClick={onClose}>Đóng</button>
            <button className="btn btn-success btn-sm fw-bold" disabled={!duTien} onClick={kiemTraCaptcha}>
              DOWNLOAD CODE NGAY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadModal;
