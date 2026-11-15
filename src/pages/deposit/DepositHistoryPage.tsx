import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function DepositHistoryPage() {
  const wallet = useSelector((state: any) => state?.wallet);
  const lichSuNapTien = wallet?.lichSuNapTien || [];
  const soDu = wallet?.soDu || { khaDung: 0 };

  const [trangThaiLoc, setTrangThaiLoc] = useState('all');
  const [tuKhoa, setTuKhoa] = useState('');

  // tinh tong tien da nap thanh cong
  let tongTienNap = 0;
  let soThanhCong = 0;
  let soDangCho = 0;

  for (let i = 0; i < lichSuNapTien.length; i++) {
    if (lichSuNapTien[i].trangThai === 'Thành công') {
      tongTienNap += Number(lichSuNapTien[i].soTien);
      soThanhCong++;
    } else {
      soDangCho++;
    }
  }

  // loc danh sach giao dich theo nut bam va o tim kiem
  const danhSachHienThi = lichSuNapTien.filter((item: any) => {
    let khopTrangThai = true;
    if (trangThaiLoc === 'thanhCong') {
      khopTrangThai = item.trangThai === 'Thành công';
    } else if (trangThaiLoc === 'dangCho') {
      khopTrangThai = item.trangThai !== 'Thành công';
    }

    const khopTuKhoa = item.maGiaoDich.toLowerCase().includes(tuKhoa.toLowerCase());
    return khopTrangThai && khopTuKhoa;
  });

  return (
    <div className="deposit-history">
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
          <li className="breadcrumb-item active">Lịch sử nạp tiền</li>
        </ol>
      </nav>

      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
        <h5 className="fw-bold text-danger text-uppercase mb-0">
          Lịch Sử Nạp Tiền
        </h5>
        <span className="badge bg-success">
          Khả dụng: {Number(soDu.khaDung).toLocaleString()}đ
        </span>
      </div>

      {/* 2 the thong ke tren dau */}
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-3">
            <div className="small text-muted">Tổng tiền đã nạp</div>
            <div className="fs-5 fw-bold text-success">
              {Number(tongTienNap).toLocaleString()}đ
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-3">
            <div className="small text-muted">Tổng số giao dịch</div>
            <div className="fs-5 fw-bold text-danger">
              {lichSuNapTien.length} lần nạp
            </div>
          </div>
        </div>
      </div>

      {/* bo loc trang thai va tim kiem */}
      <div className="card shadow-sm border-0 p-3 mb-3">
        <div className="row g-2 align-items-center">
          <div className="col-md-7">
            <div className="d-flex gap-2">
              <button
                type="button"
                className={trangThaiLoc === 'all' ? 'btn btn-danger btn-sm' : 'btn btn-outline-secondary btn-sm'}
                onClick={() => setTrangThaiLoc('all')}
              >
                Tất cả ({lichSuNapTien.length})
              </button>
              <button
                type="button"
                className={trangThaiLoc === 'thanhCong' ? 'btn btn-success btn-sm' : 'btn btn-outline-secondary btn-sm'}
                onClick={() => setTrangThaiLoc('thanhCong')}
              >
                Thành công ({soThanhCong})
              </button>
              <button
                type="button"
                className={trangThaiLoc === 'dangCho' ? 'btn btn-warning btn-sm' : 'btn btn-outline-secondary btn-sm'}
                onClick={() => setTrangThaiLoc('dangCho')}
              >
                Đang chờ ({soDangCho})
              </button>
            </div>
          </div>

          <div className="col-md-5">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Tìm mã giao dịch..."
              value={tuKhoa}
              onChange={(e) => setTuKhoa(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* bang lich su giao dich */}
      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 small">
            <thead className="table-light">
              <tr>
                <th className="text-center">STT</th>
                <th>Mã giao dịch</th>
                <th>Ngày nạp</th>
                <th>Hình thức</th>
                <th className="text-end">Số tiền</th>
                <th className="text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {danhSachHienThi.map((item: any, index: number) => (
                <tr key={item.id}>
                  <td className="text-center text-muted">{index + 1}</td>
                  <td className="fw-bold">{item.maGiaoDich}</td>
                  <td className="text-muted">{item.ngay}</td>
                  <td>{item.hinhThuc}</td>
                  <td className="text-end fw-bold text-success">
                    +{Number(item.soTien).toLocaleString()}đ
                  </td>
                  <td className="text-center">
                    <span className={item.trangThai === 'Thành công' ? 'badge bg-success' : 'badge bg-warning text-dark'}>
                      {item.trangThai}
                    </span>
                  </td>
                </tr>
              ))}

              {danhSachHienThi.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-muted">
                    Không có giao dịch nạp tiền nào
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

export default DepositHistoryPage;
