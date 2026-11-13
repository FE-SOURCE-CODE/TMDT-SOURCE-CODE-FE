import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { doiYeuThich } from '../../store/slices/detailSlice';
import DownloadModal from '../../components/DownloadModal';

function ProductDetailPage() {
  const { maCode } = useParams();
  const dispatch = useDispatch();
  const [tab, setTab] = useState('moTa');
  const [anhDangXem, setAnhDangXem] = useState(0);
  const [moPopup, setMoPopup] = useState(false);

  const detail = useSelector((state: any) => state?.detail);
  const danhSachCode = detail?.danhSachCode || [];
  const danhSachYeuThich = detail?.danhSachYeuThich || [];

  // tim code theo ma tren duong dan
  const code = danhSachCode.find((item) => item.maCode === maCode);
  const daYeuThich = danhSachYeuThich.includes(maCode);

  // khong tim thay code
  if (!code) {
    return (
      <div className="card shadow-sm border-0 text-center text-muted py-5 small">
        Không tìm thấy source code có mã {maCode}
        <div className="mt-2">
          <Link to="/" className="btn btn-outline-danger btn-sm rounded-pill">Về trang chủ</Link>
        </div>
      </div>
    );
  }

  const anhDemo = code.anhDemo || [];
  const danhGia = code.danhGia || [];

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
            <Link to="/" className="text-decoration-none text-muted">{code.danhMuc}</Link>
          </li>
          <li className="breadcrumb-item active">{code.maCode}</li>
        </ol>
      </nav>

      <h5 className="fw-bold text-danger mb-3 pb-2 border-bottom">
        {code.tenCode}
      </h5>

      <div className="row g-3">
        {/* anh demo va nut xem live demo */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 p-2">
            <img src={anhDemo[anhDangXem] || code.anh} alt={code.tenCode} className="anh-chinh" />

            <div className="d-flex gap-2 mt-2">
              {anhDemo.map((anh, index) => (
                <img
                  key={index}
                  src={anh}
                  alt={'Ảnh ' + (index + 1)}
                  className={index === anhDangXem ? 'anh-nho active' : 'anh-nho'}
                  onClick={() => setAnhDangXem(index)}
                />
              ))}
            </div>

            {code.linkDemo && (
              <div className="text-center mt-2">
                <a href={code.linkDemo} target="_blank" className="btn btn-danger btn-sm fw-bold px-4">
                  <i className="bi bi-display me-1"></i> Xem LIVE DEMO
                </a>
              </div>
            )}
          </div>
        </div>

        {/* thong so ky thuat va gia ban */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 p-3 h-100">
            <table className="table table-bordered small mb-3">
              <tbody>
                <tr>
                  <th className="table-light">Mã code</th>
                  <td className="fw-bold text-success">{code.maCode}</td>
                </tr>
                <tr>
                  <th className="table-light">Ngày đăng</th>
                  <td>{code.ngayDang}</td>
                </tr>
                <tr>
                  <th className="table-light">Loại file</th>
                  <td>{code.loaiFile}</td>
                </tr>
                <tr>
                  <th className="table-light">Dung lượng</th>
                  <td>{code.dungLuong}</td>
                </tr>
                <tr>
                  <th className="table-light">Cơ sở dữ liệu</th>
                  <td>{code.coSoDuLieu}</td>
                </tr>
                <tr>
                  <th className="table-light">Lượt tải</th>
                  <td>{code.luotTai}</td>
                </tr>
              </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted small">Phí download:</span>
              <span className="gia-tien">
                {code.phiTai > 0 ? Number(code.phiTai).toLocaleString() + 'đ' : 'Miễn phí'}
              </span>
            </div>

            <div className="d-grid gap-2">
              <button className="btn btn-success fw-bold" onClick={() => setMoPopup(true)}>
                <i className="bi bi-download me-1"></i> DOWNLOAD NGAY
              </button>
              <Link to="/" className="btn btn-danger fw-bold">
                <i className="bi bi-cloud-arrow-up-fill me-1"></i> ĐĂNG BÁN NGAY
              </Link>
              <button
                className={daYeuThich ? 'btn btn-danger btn-sm' : 'btn btn-outline-danger btn-sm'}
                onClick={() => dispatch(doiYeuThich(code.maCode))}
              >
                <i className={daYeuThich ? 'bi bi-heart-fill me-1' : 'bi bi-heart me-1'}></i>
                {daYeuThich ? 'ĐÃ LƯU YÊU THÍCH' : 'LƯU VÀO YÊU THÍCH'}
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
                    Đánh giá & Bình luận ({danhGia.length})
                  </button>
                </li>
              </ul>
            </div>

            <div className="card-body small">
              {/* tab mo ta */}
              {tab === 'moTa' && (
                <div>
                  <p>{code.moTa}</p>
                  <ul>
                    {code.chucNang.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* tab huong dan cai dat */}
              {tab === 'caiDat' && (
                <ol>
                  {code.huongDanCaiDat.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              )}

              {/* tab danh gia */}
              {tab === 'danhGia' && danhGia.length === 0 && (
                <div className="text-center text-muted py-4">
                  Chưa có đánh giá nào
                </div>
              )}

              {tab === 'danhGia' && danhGia.map((item) => (
                <div key={item.id} className="border-bottom pb-2 mb-2">
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">{item.nguoiDanhGia}</span>
                    <span className="text-muted">{item.ngay}</span>
                  </div>
                  <div className="text-warning">{'★'.repeat(item.soSao)}</div>
                  <div>{item.noiDung}</div>
                </div>
              ))}
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
              {code.camKet.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="card shadow-sm border-0 p-3 mt-3 small">
            <div className="text-muted">Người bán</div>
            <div className="fw-bold text-danger">{code.nguoiBan}</div>
            <div className="text-muted">Đã bán: {code.soCodeDaBan} code</div>
          </div>
        </div>
      </div>

      {moPopup && <DownloadModal code={code} onClose={() => setMoPopup(false)} />}
    </div>
  );
}

export default ProductDetailPage;
