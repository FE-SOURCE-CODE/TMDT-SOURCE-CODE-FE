import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { napTien } from '../store/slices/walletSlice';

function DepositQrModal({ isOpen, onClose }: any) {
  const dispatch = useDispatch();
  const [soTien, setSoTien] = useState(100000);
  const [daCopy, setDaCopy] = useState(false);
  const [daNapXong, setDaNapXong] = useState(false);

  if (!isOpen) return null;

  const cacMucTien = [50000, 100000, 200000, 500000];
  const noiDungCk = 'CODE tco185101';

  // copy noi dung chuyen khoan
  const handleCopy = () => {
    navigator.clipboard.writeText(noiDungCk);
    setDaCopy(true);
    setTimeout(() => setDaCopy(false), 2000);
  };

  // cong tien vao vi qua redux
  const handleXacNhanNap = () => {
    if (soTien <= 0) {
      alert('Vui lòng nhập số tiền hợp lệ');
      return;
    }
    dispatch(napTien(Number(soTien)));
    setDaNapXong(true);
    setTimeout(() => {
      setDaNapXong(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal show d-block modal-deposit-backdrop">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow border-0">
          <div className="modal-header bg-danger text-white py-2">
            <h6 className="modal-title fw-bold">
              <i className="bi bi-wallet2 me-2"></i>NẠP TIỀN VÀO TÀI KHOẢN
            </h6>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body p-3">
            {daNapXong ? (
              <div className="alert alert-success text-center py-4 mb-0">
                <i className="bi bi-check-circle-fill text-success fs-1 mb-2 d-block"></i>
                <h6 className="fw-bold mb-1">Nạp tiền thành công!</h6>
                <div className="small">Số dư khả dụng đã cộng thêm +{Number(soTien).toLocaleString()}đ</div>
              </div>
            ) : (
              <div>
                {/* chon nhanh muc tien */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted mb-2">
                    Chọn nhanh số tiền nạp:
                  </label>
                  <div className="d-flex flex-wrap gap-2">
                    {cacMucTien.map((muc) => (
                      <button
                        key={muc}
                        type="button"
                        className={soTien === muc ? 'btn btn-danger btn-sm' : 'btn btn-outline-secondary btn-sm'}
                        onClick={() => setSoTien(muc)}
                      >
                        {muc.toLocaleString()}đ
                      </button>
                    ))}
                  </div>
                </div>

                {/* nhap so tien khac */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted mb-1">
                    Hoặc nhập số tiền khác (VNĐ):
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={soTien}
                    onChange={(e) => setSoTien(Number(e.target.value))}
                  />
                </div>

                {/* ma qr chuyen khoan */}
                <div className="card bg-light border-0 p-3 text-center mb-3">
                  <div className="qr-container mx-auto mb-2 bg-white p-2 border rounded">
                    <img
                      src={'https://img.vietqr.io/image/MB-0311223344-compact2.png?amount=' + soTien + '&addInfo=CODE tco185101'}
                      alt="VietQR"
                      className="anh-qr"
                    />
                  </div>

                  <div className="small text-start">
                    <div className="d-flex justify-content-between py-1 border-bottom">
                      <span className="text-muted">Ngân hàng:</span>
                      <span className="fw-bold text-dark">MBBank (Quân Đội)</span>
                    </div>
                    <div className="d-flex justify-content-between py-1 border-bottom">
                      <span className="text-muted">Số tài khoản:</span>
                      <span className="fw-bold text-danger">0311223344</span>
                    </div>
                    <div className="d-flex justify-content-between py-1 border-bottom">
                      <span className="text-muted">Chủ tài khoản:</span>
                      <span className="fw-bold text-dark">CODE VN</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center py-1">
                      <span className="text-muted">Nội dung CK:</span>
                      <div className="d-flex align-items-center gap-1">
                        <span className="badge bg-warning text-dark fs-6">{noiDungCk}</span>
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm py-0 px-1"
                          onClick={handleCopy}
                        >
                          <i className={daCopy ? 'bi bi-check-lg text-success' : 'bi bi-clipboard'}></i>
                          <span className="ms-1 small">{daCopy ? 'Đã chép' : 'Chép'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="alert alert-warning py-2 px-3 small mb-0">
                  <i className="bi bi-info-circle-fill me-1 text-warning"></i>
                  Vui lòng chuyển khoản đúng nội dung <b>{noiDungCk}</b> để hệ thống tự động cộng tiền.
                </div>
              </div>
            )}
          </div>

          {!daNapXong && (
            <div className="modal-footer py-2 bg-light">
              <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
                Hủy bỏ
              </button>
              <button
                type="button"
                className="btn btn-success btn-sm fw-bold px-3"
                onClick={handleXacNhanNap}
              >
                <i className="bi bi-check2-circle me-1"></i>Xác nhận đã chuyển khoản
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DepositQrModal;
