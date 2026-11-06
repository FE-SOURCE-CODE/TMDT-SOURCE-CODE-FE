import { Routes, Route, Link, Navigate } from 'react-router-dom';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProductDetailPage from './pages/product/ProductDetailPage';

function App() {
  return (
    <div className="app-container bg-light min-vh-100">
      {/* thanh header topcode */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-white border-bottom shadow-sm py-2 sticky-top">
        <div className="container-fluid px-3 px-md-4">
          {/* logo code */}
          <Link to="/dashboard" className="navbar-brand d-flex align-items-center me-4">
            <img src="/favicon.png" alt="Logo" width="32" height="32" className="me-2 rounded" />
            <span className="fw-bold fs-4 text-danger">CODE</span>
          </Link>

          {/* 2 nut nap tien va upload */}
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-success btn-sm fw-bold px-3">
              <i className="bi bi-wallet2 me-1"></i> NẠP TIỀN
            </button>
            <button className="btn btn-danger btn-sm fw-bold px-3">
              <i className="bi bi-cloud-arrow-up-fill me-1"></i> UPLOAD
            </button>
          </div>

          <div className="d-flex align-items-center ms-auto gap-3">
            <Link to="/dashboard" className="text-decoration-none text-muted small d-none d-md-flex align-items-center">
              <i className="bi bi-bell-fill text-secondary me-1"></i> Thông báo
              <span className="badge bg-danger rounded-pill ms-1">0</span>
            </Link>

            <Link to="/dashboard" className="text-decoration-none text-muted small d-none d-md-flex align-items-center">
              <i className="bi bi-chat-dots-fill text-secondary me-1"></i> Bình luận
              <span className="badge bg-success rounded-pill ms-1">0</span>
            </Link>

            <div className="d-flex align-items-center gap-2 border-start ps-3">
              <span className="fw-bold text-dark small">Nhân Trương</span>
              <div 
                className="rounded-circle bg-secondary bg-opacity-25 d-flex align-items-center justify-content-center"
                style={{ width: '32px', height: '32px' }}
              >
                <i className="bi bi-person text-secondary"></i>
              </div>
              <span className="text-danger small ms-1" role="button">[Thoát]</span>
            </div>
          </div>
        </div>
      </nav>

      {/* chia 2 cot: sidebar trai va noi dung phai */}
      <div className="container-fluid px-3 px-md-4 py-3">
        <div className="row g-3">
          <div className="col-lg-3 col-xl-2">
            <DashboardSidebar />
          </div>

          <div className="col-lg-9 col-xl-10">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/code/:maCode" element={<ProductDetailPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
