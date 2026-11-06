import { useState } from 'react';
import { Link } from 'react-router-dom';

function ProductDetailPage() {
  const [tab, setTab] = useState('moTa');

  return (
    <div className="product-detail">
      {/* duong dan trang */}
      <nav className="mb-3 small">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none text-muted">
              <i className="bi bi-house-door-fill me-1"></i>Trang chủ
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none text-muted">Website</Link>
          </li>
          <li className="breadcrumb-item active">Chi tiết code</li>
        </ol>
      </nav>

      <h5 className="fw-bold text-danger mb-3 pb-2 border-bottom">
        Source code Website TMĐT Bán Quần Áo Full Stack React + NodeJS
      </h5>

      <div className="row g-3">
        {/* anh demo va nut xem live demo */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 p-2">
            <img src="/favicon.png" alt="Ảnh demo" className="anh-chinh" />

            <div className="d-flex gap-2 mt-2">
              <img src="/favicon.png" alt="Ảnh 1" className="anh-nho" />
              <img src="/favicon.png" alt="Ảnh 2" className="anh-nho" />
              <img src="/favicon.png" alt="Ảnh 3" className="anh-nho" />
            </div>

            <div className="text-center mt-2">
              <Link to="/" className="btn btn-danger btn-sm fw-bold px-4">
                <i className="bi bi-display me-1"></i> Xem LIVE DEMO
              </Link>
            </div>
          </div>
        </div>

        {/* thong so ky thuat va gia ban */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 p-3 h-100">
            <table className="table table-bordered small mb-3">
              <tbody>
                <tr>
                  <th className="table-light">Mã code</th>
                  <td className="fw-bold text-success">TC10294</td>
                </tr>
                <tr>
                  <th className="table-light">Ngày đăng</th>
                  <td>2026-10-20</td>
                </tr>
                <tr>
                  <th className="table-light">Loại file</th>
                  <td>Full code</td>
                </tr>
                <tr>
                  <th className="table-light">Dung lượng</th>
                  <td>1.23 GB</td>
                </tr>
                <tr>
                  <th className="table-light">Cơ sở dữ liệu</th>
                  <td>MySQL / SQL Server</td>
                </tr>
                <tr>
                  <th className="table-light">Lượt tải</th>
                  <td>15</td>
                </tr>
              </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted small">Phí download:</span>
              <span className="gia-tien">250.000đ</span>
            </div>

            <div className="d-grid gap-2">
              <button className="btn btn-success fw-bold">
                <i className="bi bi-download me-1"></i> DOWNLOAD NGAY
              </button>
              <Link to="/" className="btn btn-danger fw-bold">
                <i className="bi bi-cloud-arrow-up-fill me-1"></i> ĐĂNG BÁN NGAY
              </Link>
              <button className="btn btn-outline-danger btn-sm">
                <i className="bi bi-heart me-1"></i> LƯU VÀO YÊU THÍCH
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mt-1">
        {/* 3 tab noi dung */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white pb-0">
              <ul className="nav nav-tabs card-header-tabs small">
                <li className="nav-item">
                  <button className={tab === 'moTa' ? 'nav-link active fw-bold' : 'nav-link'} onClick={() => setTab('moTa')}>
                    Mô tả chi tiết
                  </button>
                </li>
                <li className="nav-item">
                  <button className={tab === 'caiDat' ? 'nav-link active fw-bold' : 'nav-link'} onClick={() => setTab('caiDat')}>
                    Hướng dẫn cài đặt
                  </button>
                </li>
                <li className="nav-item">
                  <button className={tab === 'danhGia' ? 'nav-link active fw-bold' : 'nav-link'} onClick={() => setTab('danhGia')}>
                    Đánh giá & Bình luận
                  </button>
                </li>
              </ul>
            </div>

            <div className="card-body small">
              {/* tab mo ta */}
              {tab === 'moTa' && (
                <div>
                  <p>Website bán quần áo viết bằng React và NodeJS, có đầy đủ trang chủ, danh mục, giỏ hàng, thanh toán và trang quản trị.</p>
                  <ul>
                    <li>Đăng ký, đăng nhập tài khoản</li>
                    <li>Tìm kiếm và lọc sản phẩm theo giá</li>
                    <li>Quản lý đơn hàng, sản phẩm, khách hàng</li>
                  </ul>
                </div>
              )}

              {/* tab huong dan cai dat */}
              {tab === 'caiDat' && (
                <ol>
                  <li>Giải nén file, mở bằng VS Code</li>
                  <li>Import file database.sql vào MySQL</li>
                  <li>Chạy lệnh npm install rồi npm start</li>
                </ol>
              )}

              {/* tab danh gia */}
              {tab === 'danhGia' && (
                <div className="text-center text-muted py-4">
                  Chưa có đánh giá nào
                </div>
              )}
            </div>
          </div>
        </div>

        {/* cam ket ho tro cua nguoi ban */}
        <div className="col-lg-4">
          <div className="hop-cam-ket">
            <div className="fw-bold text-danger small mb-2">
              <i className="bi bi-shield-check me-1"></i> CAM KẾT CỦA NGƯỜI BÁN
            </div>
            <ul className="small mb-0 ps-3">
              <li>Hỗ trợ cài đặt chạy thử</li>
              <li>Code đúng như mô tả</li>
              <li>Hỗ trợ qua Zalo trong 3 ngày</li>
            </ul>
          </div>

          <div className="card shadow-sm border-0 p-3 mt-3 small">
            <div className="text-muted">Người bán</div>
            <div className="fw-bold text-danger">NHÂN TRƯƠNG</div>
            <div className="text-muted">Đã bán: 2 code</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
