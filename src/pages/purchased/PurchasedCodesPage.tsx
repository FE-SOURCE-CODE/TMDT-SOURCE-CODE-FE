import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PurchasedCodesPage() {
  const wallet = useSelector((state: any) => state?.wallet);
  const codeDaMua = wallet?.codeDaMua || [];

  // tinh tong tien mua code
  let tongChiPhi = 0;
  for (let i = 0; i < codeDaMua.length; i++) {
    tongChiPhi += Number(codeDaMua[i].phiTai);
  }

  // bam nut danh gia
  const handleDanhGia = (tenCode: string) => {
    alert('Đánh giá cho code: ' + tenCode);
  };

  return (
    <div className="purchased-codes">
      {/* duong dan trang */}
      <nav className="mb-3 small">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none text-muted">
              <i className="bi bi-house-door-fill me-1"></i>Trang chủ
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/dashboard" className="text-decoration-none text-muted">
              Tổng quan
            </Link>
          </li>
          <li className="breadcrumb-item active">Code đã mua</li>
        </ol>
      </nav>

      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
        <h5 className="fw-bold text-danger text-uppercase mb-0">
          Danh Sách Code Đã Mua
        </h5>
        <span className="badge bg-danger">
          Tổng cộng: {codeDaMua.length} code
        </span>
      </div>

      {/* 2 the thong ke */}
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-3">
            <div className="small text-muted">Số lượng code đã mua</div>
            <div className="fs-5 fw-bold text-danger">
              {codeDaMua.length} source code
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-3">
            <div className="small text-muted">Tổng chi phí thanh toán</div>
            <div className="fs-5 fw-bold text-success">
              {Number(tongChiPhi).toLocaleString()}đ
            </div>
          </div>
        </div>
      </div>

      {/* bang danh sach code da mua */}
      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 small">
            <thead className="table-light">
              <tr>
                <th className="text-center">STT</th>
                <th>Tên mã nguồn</th>
                <th className="text-center">Mã code</th>
                <th>Ngày mua</th>
                <th className="text-end">Phí tải</th>
                <th>Người bán / Hỗ trợ</th>
                <th className="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {codeDaMua.map((item: any, index: number) => (
                <tr key={item.id}>
                  <td className="text-center text-muted">{index + 1}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={item.anh}
                        alt={item.tenCode}
                        className="anh-code-nho"
                      />
                      <div>
                        <Link
                          to={'/detail/' + item.maCode}
                          className="fw-bold text-dark text-decoration-none d-block"
                        >
                          {item.tenCode}
                        </Link>
                        <span className="text-muted">Đã thanh toán</span>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-secondary">{item.maCode}</span>
                  </td>
                  <td className="text-muted">{item.ngayMua}</td>
                  <td className="text-end fw-bold text-danger">
                    {Number(item.phiTai).toLocaleString()}đ
                  </td>
                  <td>
                    <div className="fw-bold">{item.nguoiBan}</div>
                    <div className="text-muted">SĐT: {item.sdtNguoiBan}</div>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-1">
                      <a
                        href={item.linkDownload}
                        target="_blank"
                        className="btn btn-success btn-sm"
                      >
                        <i className="bi bi-download me-1"></i>Tải về
                      </a>
                      <button
                        type="button"
                        className="btn btn-warning btn-sm"
                        onClick={() => handleDanhGia(item.tenCode)}
                      >
                        <i className="bi bi-star-fill me-1"></i>Đánh giá
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {codeDaMua.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">
                    Chưa có mã nguồn nào được mua
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PurchasedCodesPage;
