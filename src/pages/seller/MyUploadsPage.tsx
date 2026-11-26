import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function MyUploadsPage() {
  const danhSachUpload = useSelector((state: RootState) => state.seller.danhSachUpload);

  const [tabDangChon, setTabDangChon] = useState('Tất cả');
  const [tuKhoa, setTuKhoa] = useState('');
  const [sapXep, setSapXep] = useState('moiNhat');
  const [trangHienTai, setTrangHienTai] = useState(1);
  const soDongMoiTrang = 5;

  const cacTab = ['Tất cả', 'Đang đăng bán', 'Đang chờ duyệt', 'Bị từ chối', 'Bị hủy'];

  // đếm số code của từng tab để hiện lên nút tab
  const demTheoTab = (tab) => {
    if (tab === 'Tất cả') {
      return danhSachUpload.length;
    }
    return danhSachUpload.filter((code) => code.trangThai === tab).length;
  };

  // lọc theo tab trước rồi mới lọc theo từ khóa
  const tuKhoaTim = tuKhoa.trim().toLowerCase();
  const danhSachLoc = danhSachUpload.filter((code) => {
    if (tabDangChon !== 'Tất cả' && code.trangThai !== tabDangChon) {
      return false;
    }
    const khopTen = code.tenCode.toLowerCase().includes(tuKhoaTim);
    const khopMa = code.maCode.toLowerCase().includes(tuKhoaTim);
    return khopTen || khopMa;
  });

  // sort làm thay đổi mảng nên chép ra mảng mới trước
  const danhSachSapXep = [...danhSachLoc].sort((a, b) => {
    if (sapXep === 'cuNhat') {
      return a.ngayDang.localeCompare(b.ngayDang);
    }
    if (sapXep === 'phiCao') {
      return b.phiTai - a.phiTai;
    }
    if (sapXep === 'phiThap') {
      return a.phiTai - b.phiTai;
    }
    return b.ngayDang.localeCompare(a.ngayDang);
  });

  let tongSoTrang = Math.ceil(danhSachSapXep.length / soDongMoiTrang);
  if (tongSoTrang < 1) {
    tongSoTrang = 1;
  }
  // khi lọc làm số trang ít đi thì quay về trang 1
  const trang = trangHienTai > tongSoTrang ? 1 : trangHienTai;
  const viTriDau = (trang - 1) * soDongMoiTrang;
  const danhSachTrang = danhSachSapXep.slice(viTriDau, viTriDau + soDongMoiTrang);

  const cacSoTrang = [];
  for (let i = 1; i <= tongSoTrang; i++) {
    cacSoTrang.push(i);
  }

  const mauTrangThai = (trangThai) => {
    if (trangThai === 'Đang đăng bán') {
      return 'badge bg-success';
    }
    if (trangThai === 'Đang chờ duyệt') {
      return 'badge bg-warning text-dark';
    }
    return 'badge bg-danger';
  };

  return (
    <div className="my-uploads">
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
          <li className="breadcrumb-item active">Code upload</li>
        </ol>
      </nav>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-white d-flex justify-content-between align-items-center py-2">
          <div>
            <span className="fw-bold small text-uppercase">Code upload</span>
            <span className="text-muted small ms-2">Danh sách code đăng bán của tôi</span>
          </div>
          <input
            type="text"
            className="form-control form-control-sm o-tim-kiem"
            placeholder="Tìm tên hoặc mã code"
            value={tuKhoa}
            onChange={(e) => {
              setTuKhoa(e.target.value);
              setTrangHienTai(1);
            }}
          />
        </div>

        <div className="card-body">
          <ul className="nav nav-tabs small mb-3">
            {cacTab.map((tab) => (
              <li className="nav-item" key={tab}>
                <button
                  type="button"
                  className={tabDangChon === tab ? 'nav-link active' : 'nav-link'}
                  onClick={() => {
                    setTabDangChon(tab);
                    setTrangHienTai(1);
                  }}
                >
                  {tab} <span className="badge bg-danger rounded-pill">{demTheoTab(tab)}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="table-responsive">
            <table className="table table-bordered table-hover small align-middle mb-0">
              <thead className="table-light text-uppercase">
                <tr>
                  <th>Ngày upload</th>
                  <th>Mã code</th>
                  <th>Ảnh</th>
                  <th>Source code</th>
                  <th>Thông báo</th>
                  <th>Trạng thái</th>
                  <th className="text-end">Phí download</th>
                  <th className="text-center">Download</th>
                  <th className="text-center">Lượt xem</th>
                </tr>
              </thead>
              <tbody>
                {danhSachTrang.map((code) => (
                  <tr key={code.maCode}>
                    <td className="text-muted">{code.ngayDang}</td>
                    <td>{code.maCode}</td>
                    <td>
                      <img src={code.anh || '/favicon.png'} alt={code.tenCode} className="anh-nho" />
                    </td>
                    <td className="fw-bold">{code.tenCode}</td>
                    <td className="text-danger">{code.lyDoTuChoi}</td>
                    <td>
                      <span className={mauTrangThai(code.trangThai)}>{code.trangThai}</span>
                    </td>
                    <td className="text-end fw-bold text-danger">
                      {code.phiTai === 0 ? 'Miễn phí' : code.phiTai.toLocaleString('vi-VN') + 'đ'}
                    </td>
                    <td className="text-center">{code.luotTai || 0}</td>
                    <td className="text-center">{code.luotXem || 0}</td>
                  </tr>
                ))}

                {danhSachTrang.length === 0 && (
                  <tr>
                    <td colSpan={9} className="text-center text-muted py-4 small">
                      Chưa có code nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-2 small">
            <div className="text-muted">
              {danhSachSapXep.length === 0 ? 0 : viTriDau + 1} - {viTriDau + danhSachTrang.length} / Tổng số{' '}
              {danhSachSapXep.length} CODE
            </div>

            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select form-select-sm o-sap-xep"
                value={sapXep}
                onChange={(e) => setSapXep(e.target.value)}
              >
                <option value="moiNhat">Mới nhất</option>
                <option value="cuNhat">Cũ nhất</option>
                <option value="phiCao">Phí cao đến thấp</option>
                <option value="phiThap">Phí thấp đến cao</option>
              </select>

              <ul className="pagination pagination-sm mb-0">
                {cacSoTrang.map((so) => (
                  <li key={so} className={so === trang ? 'page-item active' : 'page-item'}>
                    <button type="button" className="page-link" onClick={() => setTrangHienTai(so)}>
                      {so}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyUploadsPage;
