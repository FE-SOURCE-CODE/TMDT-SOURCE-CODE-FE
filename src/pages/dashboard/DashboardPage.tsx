import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function DashboardPage() {
  const wallet = useSelector((state: any) => state?.wallet);
  const thanhVien = wallet?.thanhVien || { hoTen: 'NHÂN TRƯƠNG', maThanhVien: 'tco185101', email: 'nhannhd1004@gmail.com', sdt: '' };
  const soDu = wallet?.soDu || { taiKhoan: 0, tamGiu: 0, khaDung: 0 };
  const thongKe = wallet?.thongKe || { codeUpload: 0, codeDaBan: 0, danhGia: '0/5' };
  const daCapNhatSdt = wallet?.daCapNhatSdt || false;

  return (
    <div className="dashboard-content">
      {/* duong dan trang */}
      <nav className="mb-3 small">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none text-muted">
              <i className="bi bi-house-door-fill me-1"></i>Trang chủ
            </Link>
          </li>
          <li className="breadcrumb-item active">Tổng quan</li>
        </ol>
      </nav>

      {/* thanh bao chua cap nhat sdt - an di neu da cap nhat */}
      {!daCapNhatSdt && (
        <div className="alert-custom mb-3 d-flex align-items-center justify-content-between">
          <div className="small">
            Thông tin cá nhân của bạn chưa cập nhật Số điện thoại, vui lòng cập nhật Số điện thoại{' '}
            <Link to="/dashboard/thong-tin" className="fw-bold text-success text-decoration-none">
              TẠI ĐÂY !
            </Link>
          </div>
        </div>
      )}

      <h5 className="fw-bold text-danger text-uppercase mb-3 pb-2 border-bottom">
        Trang Tổng Quan
      </h5>

      <div className="row g-3">
        {/* thong tin ca nhan */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 h-100 text-center p-3">
            <h6 className="fw-bold text-danger mb-2">{thanhVien.hoTen}</h6>
            <div className="avatar-large">
              <i className="bi bi-person-fill"></i>
            </div>
            
            <div className="mt-2 small">
              <div className="text-muted">MÃ THÀNH VIÊN</div>
              <div className="fw-bold text-success fs-5">{thanhVien.maThanhVien}</div>
            </div>

            <div className="small text-muted mt-2">
              <div>{thanhVien.email}</div>
              <div>SĐT: <span className="text-secondary">{thanhVien.sdt || '(Chưa cập nhật)'}</span></div>
            </div>

            <div className="mt-3 pt-2 border-top small">
              <Link to="/dashboard/thong-tin" className="link-ca-nhan">
                <i className="bi bi-link-45deg me-1"></i>Link trang cá nhân
              </Link>
            </div>
          </div>
        </div>

        {/* 3 the thong ke va 3 dong tien */}
        <div className="col-lg-8">
          <div className="row g-2 mb-3 text-center">
            <div className="col-md-4">
              <div className="stat-card card-red">
                <i className="bi bi-cloud-arrow-up-fill fs-1 opacity-75"></i>
                <div className="text-end">
                  <div className="stat-number">{thongKe.codeUpload}</div>
                  <div className="stat-label">Code upload</div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="stat-card card-green">
                <i className="bi bi-cart-check-fill fs-1 opacity-75"></i>
                <div className="text-end">
                  <div className="stat-number">{thongKe.codeDaBan}</div>
                  <div className="stat-label">Code đã bán</div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="stat-card card-orange">
                <i className="bi bi-star-fill fs-1 opacity-75"></i>
                <div className="text-end">
                  <div className="stat-number">{thongKe.danhGia}</div>
                  <div className="stat-label">Đánh giá (0)</div>
                </div>
              </div>
            </div>
          </div>

          {/* khung tien */}
          <div className="card shadow-sm border-0 p-3">
            <div className="row small">
              <div className="col-md-4 border-end">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Tài khoản:</span>
                  <span className="badge bg-danger">{Number(soDu.taiKhoan || 0).toLocaleString()}đ</span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Tạm giữ:</span>
                  <span className="badge bg-warning text-dark">{Number(soDu.tamGiu || 0).toLocaleString()}đ</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Khả dụng:</span>
                  <span className="badge bg-success">{Number(soDu.khaDung || 0).toLocaleString()}đ</span>
                </div>
              </div>

              <div className="col-md-8 ps-md-3">
                <div className="fw-bold text-dark mb-1">GIAO DỊCH ĐANG TẠM GIỮ ( 0 )</div>
                <div className="note-text">
                  <i>Chú ý: Code vừa bán mặc định tạm giữ 3 ngày, Bán code &gt;= 500.000đ tạm giữ 4 ngày</i>
                </div>
                <div className="note-text mt-2">
                  <i>Tạm giữ: Số tiền bị đóng băng cho giao dịch vừa bán code, chờ hỗ trợ hoàn tất giữa người bán và người mua.</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2 bang thong ke duoi */}
      <div className="row g-3 mt-2">
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white d-flex justify-content-between align-items-center py-2">
              <span className="fw-bold small text-uppercase">Bình luận mới nhất</span>
              <Link to="/dashboard" className="btn btn-outline-danger btn-sm py-0 px-2 rounded-pill btn-all">
                Xem tất cả »
              </Link>
            </div>
            <div className="card-body text-center text-muted py-4 small">
              Chưa có bình luận nào
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white d-flex justify-content-between align-items-center py-2">
              <span className="fw-bold small text-uppercase">Code đã bán gần nhất</span>
              <Link to="/dashboard" className="btn btn-outline-danger btn-sm py-0 px-2 rounded-pill btn-all">
                Xem tất cả »
              </Link>
            </div>
            <div className="card-body text-center text-muted py-4 small">
              Chưa có giao dịch bán code nào
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
