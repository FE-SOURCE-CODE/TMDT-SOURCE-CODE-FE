import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { danhGiaCode } from '../../store/slices/walletSlice';

function PurchasedCodesPage() {
  const dispatch = useDispatch();
  const wallet = useSelector((state: any) => state?.wallet);
  const codeDaMua = wallet?.codeDaMua || [];

  const [tuKhoa, setTuKhoa] = useState('');
  const [sapXep, setSapXep] = useState('moiNhat');
  const [soDong, setSoDong] = useState(5);
  const [trangHienTai, setTrangHienTai] = useState(1);

  // state cho popup danh gia sao
  const [codeDangChon, setCodeDangChon] = useState<any>(null);
  const [soSaoChon, setSoSaoChon] = useState(5);
  const [noiDungDanhGia, setNoiDungDanhGia] = useState('');

  // tinh tong tien mua code va dem so code da danh gia
  let tongChiPhi = 0;
  let soDaDanhGia = 0;
  for (let i = 0; i < codeDaMua.length; i++) {
    tongChiPhi += Number(codeDaMua[i].phiTai);
    if (codeDaMua[i].soSao && codeDaMua[i].soSao > 0) {
      soDaDanhGia++;
    }
  }

  // loc theo tu khoa tim kiem
  const danhSachLoc: any[] = [];
  const key = tuKhoa.toLowerCase().trim();
  for (let i = 0; i < codeDaMua.length; i++) {
    const item = codeDaMua[i];
    const tenNguoiBan = item.nguoiBan || 'CODE VN';
    const khopTen = item.tenCode.toLowerCase().includes(key);
    const khopMa = item.maCode.toLowerCase().includes(key);
    const khopNguoiBan = tenNguoiBan.toLowerCase().includes(key);

    if (khopTen || khopMa || khopNguoiBan) {
      danhSachLoc.push(item);
    }
  }

  // sap xep danh sach theo lua chon
  danhSachLoc.sort((a: any, b: any) => {
    if (sapXep === 'giaCao') {
      return Number(b.phiTai) - Number(a.phiTai);
    }
    if (sapXep === 'giaThap') {
      return Number(a.phiTai) - Number(b.phiTai);
    }
    if (sapXep === 'cuNhat') {
      return a.ngayMua.localeCompare(b.ngayMua);
    }
    return b.ngayMua.localeCompare(a.ngayMua);
  });

  // tinh toan phan trang
  let tongSoTrang = Math.ceil(danhSachLoc.length / soDong);
  if (tongSoTrang < 1) {
    tongSoTrang = 1;
  }

  const trangHopLe = trangHienTai > tongSoTrang ? 1 : trangHienTai;
  const viTriBatDau = (trangHopLe - 1) * soDong;
  const viTriKetThuc = viTriBatDau + soDong;
  const danhSachHienThi = danhSachLoc.slice(viTriBatDau, viTriKetThuc);

  // tao mang so trang de render nut bam
  const cacTrang: number[] = [];
  for (let p = 1; p <= tongSoTrang; p++) {
    cacTrang.push(p);
  }

  // mo popup danh gia
  const handleMoDanhGia = (item: any) => {
    setCodeDangChon(item);
    setSoSaoChon(item.soSao && item.soSao > 0 ? item.soSao : 5);
    setNoiDungDanhGia(item.nhanXet || '');
  };

  // luu danh gia vao redux
  const handleLuuDanhGia = () => {
    if (!codeDangChon) return;
    if (!noiDungDanhGia.trim()) {
      alert('Vui lòng nhập nội dung nhận xét cho source code!');
      return;
    }

    dispatch(
      danhGiaCode({
        id: codeDangChon.id,
        soSao: soSaoChon,
        nhanXet: noiDungDanhGia,
      })
    );
    setCodeDangChon(null);
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

      {/* 3 the thong ke nhanh */}
      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-3">
            <div className="small text-muted">Số lượng code đã mua</div>
            <div className="fs-5 fw-bold text-danger">
              {codeDaMua.length} source code
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-3">
            <div className="small text-muted">Tổng chi phí thanh toán</div>
            <div className="fs-5 fw-bold text-success">
              {Number(tongChiPhi).toLocaleString()}đ
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-3">
            <div className="small text-muted">Đã gửi đánh giá</div>
            <div className="fs-5 fw-bold text-warning">
              {soDaDanhGia}/{codeDaMua.length} đơn hàng
            </div>
          </div>
        </div>
      </div>

      {/* thanh cong cu datatables: chon so dong, sap xep va tim kiem */}
      <div className="card shadow-sm border-0 p-3 mb-3">
        <div className="row g-2 align-items-center">
          <div className="col-md-3 col-6">
            <div className="d-flex align-items-center gap-2 small">
              <span className="text-muted">Hiển thị</span>
              <select
                className="form-select form-select-sm select-dong"
                value={soDong}
                onChange={(e) => {
                  setSoDong(Number(e.target.value));
                  setTrangHienTai(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
              <span className="text-muted">dòng</span>
            </div>
          </div>

          <div className="col-md-4 col-6">
            <div className="d-flex align-items-center gap-2 small">
              <span className="text-muted text-nowrap">Sắp xếp:</span>
              <select
                className="form-select form-select-sm"
                value={sapXep}
                onChange={(e) => {
                  setSapXep(e.target.value);
                  setTrangHienTai(1);
                }}
              >
                <option value="moiNhat">Ngày mua mới nhất</option>
                <option value="cuNhat">Ngày mua cũ nhất</option>
                <option value="giaCao">Phí tải cao đến thấp</option>
                <option value="giaThap">Phí tải thấp đến cao</option>
              </select>
            </div>
          </div>

          <div className="col-md-5 col-12">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Tìm tên code, mã code hoặc người bán..."
              value={tuKhoa}
              onChange={(e) => {
                setTuKhoa(e.target.value);
                setTrangHienTai(1);
              }}
            />
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
              {danhSachHienThi.map((item: any, index: number) => (
                <tr key={item.id}>
                  <td className="text-center text-muted">
                    {viTriBatDau + index + 1}
                  </td>
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
                        {item.soSao && item.soSao > 0 ? (
                          <span className="text-warning small">
                            <i className="bi bi-star-fill me-1"></i>
                            Đã đánh giá {item.soSao}/5 sao
                          </span>
                        ) : (
                          <span className="text-muted">Đã thanh toán</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-secondary">{item.maCode}</span>
                  </td>
                  <td className="text-muted">{item.ngayMua}</td>
                  <td className="text-end fw-bold text-danger">
                    {Number(item.phiTai) === 0
                      ? 'Miễn phí'
                      : Number(item.phiTai).toLocaleString() + 'đ'}
                  </td>
                  <td>
                    <div className="fw-bold">{item.nguoiBan || 'CODE VN'}</div>
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
                        className={
                          item.soSao && item.soSao > 0
                            ? 'btn btn-outline-warning btn-sm text-dark'
                            : 'btn btn-warning btn-sm'
                        }
                        onClick={() => handleMoDanhGia(item)}
                      >
                        <i className="bi bi-star-fill me-1"></i>
                        {item.soSao && item.soSao > 0 ? 'Sửa ĐG' : 'Đánh giá'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {danhSachHienThi.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">
                    Không tìm thấy mã nguồn nào phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* chan bang phan trang datatables */}
        <div className="card-footer bg-white d-flex flex-wrap justify-content-between align-items-center py-2 small">
          <div className="text-muted">
            Hiển thị {danhSachLoc.length === 0 ? 0 : viTriBatDau + 1} đến{' '}
            {viTriKetThuc > danhSachLoc.length
              ? danhSachLoc.length
              : viTriKetThuc}{' '}
            trong tổng số {danhSachLoc.length} code
          </div>

          <ul className="pagination pagination-sm mb-0">
            <li className={trangHopLe === 1 ? 'page-item disabled' : 'page-item'}>
              <button
                type="button"
                className="page-link"
                onClick={() => setTrangHienTai(trangHopLe - 1)}
              >
                Trước
              </button>
            </li>

            {cacTrang.map((soTrang) => (
              <li
                key={soTrang}
                className={
                  trangHopLe === soTrang ? 'page-item active' : 'page-item'
                }
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={() => setTrangHienTai(soTrang)}
                >
                  {soTrang}
                </button>
              </li>
            ))}

            <li
              className={
                trangHopLe === tongSoTrang ? 'page-item disabled' : 'page-item'
              }
            >
              <button
                type="button"
                className="page-link"
                onClick={() => setTrangHienTai(trangHopLe + 1)}
              >
                Sau
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* popup modal danh gia sao */}
      {codeDangChon && (
        <div className="modal show d-block modal-deposit-backdrop">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow border-0">
              <div className="modal-header bg-warning py-2">
                <h6 className="modal-title fw-bold text-dark">
                  <i className="bi bi-star-fill me-2"></i>ĐÁNH GIÁ MÃ NGUỒN
                </h6>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setCodeDangChon(null)}
                ></button>
              </div>

              <div className="modal-body p-3">
                <div className="mb-3 p-2 bg-light rounded small">
                  <div className="fw-bold text-dark">{codeDangChon.tenCode}</div>
                  <div className="text-muted">
                    Mã code: #{codeDangChon.maCode} | Người bán: {codeDangChon.nguoiBan}
                  </div>
                </div>

                <div className="mb-3 text-center">
                  <div className="small text-muted mb-2">
                    Chọn mức độ hài lòng của bạn:
                  </div>
                  <div className="d-flex justify-content-center gap-2">
                    {[1, 2, 3, 4, 5].map((sao) => (
                      <button
                        key={sao}
                        type="button"
                        className={
                          sao <= soSaoChon
                            ? 'btn btn-warning btn-sm fw-bold'
                            : 'btn btn-outline-secondary btn-sm'
                        }
                        onClick={() => setSoSaoChon(sao)}
                      >
                        <i className="bi bi-star-fill me-1"></i>
                        {sao} sao
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-2">
                  <label className="form-label small fw-bold text-muted mb-1">
                    Nhận xét chất lượng source code:
                  </label>
                  <textarea
                    rows={3}
                    className="form-control form-control-sm"
                    placeholder="Nhập đánh giá của bạn về code và sự hỗ trợ của người bán..."
                    value={noiDungDanhGia}
                    onChange={(e) => setNoiDungDanhGia(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer py-2 bg-light">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setCodeDangChon(null)}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  className="btn btn-warning btn-sm fw-bold"
                  onClick={handleLuuDanhGia}
                >
                  <i className="bi bi-check2-circle me-1"></i>Gửi đánh giá
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PurchasedCodesPage;
