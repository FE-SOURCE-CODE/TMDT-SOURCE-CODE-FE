import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function DashboardSidebar() {
  const wallet = useSelector((state: any) => state?.wallet);
  const thanhVien = wallet?.thanhVien || { hoTen: 'NHÂN TRƯƠNG' };
  const soDu = wallet?.soDu || { taiKhoan: 0, tamGiu: 0, khaDung: 0 };

  return (
    <div className="dashboard-sidebar border p-2 mb-3">
      {/* avatar va ten user */}
      <div className="text-center p-3 border-bottom">
        <div className="avatar-box">
          <i className="bi bi-person-fill"></i>
        </div>
        <h6 className="fw-bold mb-1 text-danger">{thanhVien.hoTen}</h6>
        <div className="small text-start mt-2 px-2">
          <div className="d-flex justify-content-between">
            <span className="text-muted">Tài khoản:</span>
            <span className="text-danger fw-bold">{Number(soDu.taiKhoan || 0).toLocaleString()}đ</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="text-muted">Tạm giữ:</span>
            <span className="text-warning fw-bold">{Number(soDu.tamGiu || 0).toLocaleString()}đ</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="text-muted">Khả dụng:</span>
            <span className="text-success fw-bold">{Number(soDu.khaDung || 0).toLocaleString()}đ</span>
          </div>
        </div>
      </div>

      {/* thong bao */}
      <div className="mt-3">
        <div className="text-muted small fw-bold px-2 mb-2 text-uppercase">
          Thông báo
        </div>
        <div className="list-group list-group-flush small">
          <Link to="/dashboard" className="list-group-item list-group-item-action d-flex align-items-center justify-content-between border-0 px-2 py-2">
            <div className="d-flex align-items-center">
              <i className="bi bi-bell-fill text-danger me-2 fs-5"></i>
              <div>
                <div className="fw-semibold">Thông báo - Tin nhắn</div>
                <div className="sub-text">Tin từ hệ thống và BQT</div>
              </div>
            </div>
            <span className="badge bg-danger rounded-pill">0</span>
          </Link>

          <Link to="/dashboard" className="list-group-item list-group-item-action d-flex align-items-center justify-content-between border-0 px-2 py-2">
            <div className="d-flex align-items-center">
              <i className="bi bi-chat-dots-fill text-success me-2 fs-5"></i>
              <div>
                <div className="fw-semibold">Bình luận - Đánh giá</div>
                <div className="sub-text">Bình luận & đánh giá cho code</div>
              </div>
            </div>
            <span className="badge bg-success rounded-pill">0</span>
          </Link>
        </div>
      </div>

      {/* quan ly cac muc */}
      <div className="mt-3">
        <div className="text-muted small fw-bold px-2 mb-2 text-uppercase">
          Quản lý
        </div>
        <div className="list-group list-group-flush small">
          <Link to="/dashboard" className="list-group-item list-group-item-action d-flex align-items-center border-0 px-2 py-2">
            <i className="bi bi-cloud-arrow-up-fill text-info me-2 fs-5"></i>
            <div>
              <div className="fw-semibold">Code upload</div>
              <div className="sub-text">Danh sách code đăng bán</div>
            </div>
          </Link>

          <Link to="/dashboard/code-da-mua" className="list-group-item list-group-item-action d-flex align-items-center border-0 px-2 py-2">
            <i className="bi bi-download text-warning me-2 fs-5"></i>
            <div>
              <div className="fw-semibold">Code đã mua</div>
              <div className="sub-text">Code có phí đã download</div>
            </div>
          </Link>

          <Link to="/dashboard/yeu-thich" className="list-group-item list-group-item-action d-flex align-items-center border-0 px-2 py-2">
            <i className="bi bi-heart-fill text-success me-2 fs-5"></i>
            <div>
              <div className="fw-semibold">Code yêu thích</div>
              <div className="sub-text">Code yêu thích đã lưu lại</div>
            </div>
          </Link>

          <Link to="/dashboard" className="list-group-item list-group-item-action d-flex align-items-center border-0 px-2 py-2">
            <i className="bi bi-graph-up-arrow text-danger me-2 fs-5"></i>
            <div>
              <div className="fw-semibold">Doanh thu bán code</div>
              <div className="sub-text">Lịch sử và thống kê bán code</div>
            </div>
          </Link>

          <Link to="/dashboard/lich-su-nap" className="list-group-item list-group-item-action d-flex align-items-center border-0 px-2 py-2">
            <i className="bi bi-credit-card-2-front-fill text-primary me-2 fs-5"></i>
            <div>
              <div className="fw-semibold">Lịch sử nạp tiền</div>
              <div className="sub-text">Lịch sử giao dịch nạp tiền</div>
            </div>
          </Link>

          <Link to="/dashboard/rut-tien" className="list-group-item list-group-item-action d-flex align-items-center border-0 px-2 py-2">
            <i className="bi bi-cash-stack text-warning me-2 fs-5"></i>
            <div>
              <div className="fw-semibold">Rút tiền</div>
              <div className="sub-text">Về tài khoản ngân hàng</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
