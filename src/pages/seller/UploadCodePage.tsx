import { useState } from 'react';
import { Link } from 'react-router-dom';

function UploadCodePage() {
  const [anhDaiDien, setAnhDaiDien] = useState('');
  const [anhDemo, setAnhDemo] = useState([]);
  const [ngonNgu, setNgonNgu] = useState('');
  const [danhMuc, setDanhMuc] = useState('');
  const [tieuDe, setTieuDe] = useState('');
  const [moTaNgan, setMoTaNgan] = useState('');
  const [loaiFile, setLoaiFile] = useState('Full code');
  const [dungLuong, setDungLuong] = useState('');
  const [coSoDuLieu, setCoSoDuLieu] = useState('');
  const [linkDownload, setLinkDownload] = useState('');
  const [linkDuPhong, setLinkDuPhong] = useState('');
  const [linkDemo, setLinkDemo] = useState('');
  const [phiTai, setPhiTai] = useState('');
  const [camKet, setCamKet] = useState('');
  const [moTa, setMoTa] = useState('');
  const [huongDanCaiDat, setHuongDanCaiDat] = useState('');

  const danhSachNgonNgu = [
    'Android', 'iOS', 'Cocos2D', 'Visual C#', 'Visual C++', 'Asp.Net', 'Visual Basic', 'WordPress',
    'Joomla', 'Java/JSP', 'PHP & MySQL', 'Unity', 'Javascript', 'Html & Template', 'Khác',
  ];

  const chonAnhDaiDien = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    // tạo đường dẫn tạm để xem trước ảnh ngay trên trình duyệt, chưa tải lên đâu cả
    setAnhDaiDien(URL.createObjectURL(file));
  };

  const chonAnhDemo = (e) => {
    const danhSachAnh = [];
    for (let i = 0; i < e.target.files.length; i++) {
      danhSachAnh.push(URL.createObjectURL(e.target.files[i]));
    }
    setAnhDemo(danhSachAnh);
  };

  return (
    <div className="upload-code">
      <nav className="mb-3 small">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none text-muted">
              <i className="bi bi-house-door-fill me-1"></i>Trang chủ
            </Link>
          </li>
          <li className="breadcrumb-item active">Đăng bán code</li>
        </ol>
      </nav>

      <h5 className="fw-bold text-danger mb-3 pb-2 border-bottom">Đăng Bán Source Code Mới</h5>

      <div className="row g-3">
        <div className="col-lg-8">
          {/* chưa gửi đi đâu, chặn submit để bấm nút không bị tải lại trang */}
          <form className="card shadow-sm border-0 p-3 small" onSubmit={(e) => e.preventDefault()}>
            <div className="tieu-de-nhom">Hình ảnh</div>
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">Ảnh đại diện</label>
                <input type="file" accept="image/*" className="form-control form-control-sm" onChange={chonAnhDaiDien} />
                <div className="khung-anh mt-2">
                  {anhDaiDien && <img src={anhDaiDien} alt="Ảnh đại diện" />}
                  {!anhDaiDien && <span className="text-muted">Chưa chọn ảnh</span>}
                </div>
              </div>
              <div className="col-md-8">
                <label className="form-label fw-bold">Ảnh demo (chọn được nhiều ảnh)</label>
                <input type="file" accept="image/*" multiple className="form-control form-control-sm" onChange={chonAnhDemo} />
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {anhDemo.map((anh, index) => (
                    <img key={index} src={anh} alt={'Ảnh demo ' + (index + 1)} className="anh-demo-nho" />
                  ))}
                  {anhDemo.length === 0 && <span className="text-muted">Chưa chọn ảnh demo nào</span>}
                </div>
              </div>
            </div>

            <div className="tieu-de-nhom">Thông tin code</div>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Ngôn ngữ</label>
                <select className="form-select form-select-sm" value={ngonNgu} onChange={(e) => setNgonNgu(e.target.value)}>
                  <option value="">-- Chọn ngôn ngữ --</option>
                  {danhSachNgonNgu.map((ten) => (
                    <option key={ten} value={ten}>{ten}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Thể loại</label>
                <select className="form-select form-select-sm" value={danhMuc} onChange={(e) => setDanhMuc(e.target.value)}>
                  <option value="">-- Chọn thể loại --</option>
                  <option value="Website">Website</option>
                  <option value="Phần mềm">Phần mềm</option>
                  <option value="Ứng dụng">Ứng dụng</option>
                  <option value="Game">Game</option>
                </select>
              </div>
              <div className="col-12">
                <label className="form-label fw-bold">Tiêu đề</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Ví dụ: Source code website bán quần áo React + NodeJS"
                  value={tieuDe}
                  onChange={(e) => setTieuDe(e.target.value)}
                />
              </div>
              <div className="col-12">
                <label className="form-label fw-bold">Mô tả ngắn</label>
                <textarea
                  rows={2}
                  className="form-control form-control-sm"
                  value={moTaNgan}
                  onChange={(e) => setMoTaNgan(e.target.value)}
                ></textarea>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Loại file</label>
                <select className="form-select form-select-sm" value={loaiFile} onChange={(e) => setLoaiFile(e.target.value)}>
                  <option value="Full code">Full code</option>
                  <option value="Full code + Báo cáo">Full code + Báo cáo</option>
                  <option value="Full code + Video hướng dẫn">Full code + Video hướng dẫn</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Dung lượng</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Ví dụ: 56 MB"
                  value={dungLuong}
                  onChange={(e) => setDungLuong(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Cơ sở dữ liệu</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Ví dụ: MySQL"
                  value={coSoDuLieu}
                  onChange={(e) => setCoSoDuLieu(e.target.value)}
                />
              </div>
            </div>

            <div className="tieu-de-nhom">Link và giá bán</div>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Link tải (Google Drive, Mediafire)</label>
                <input
                  type="url"
                  className="form-control form-control-sm"
                  placeholder="https://drive.google.com/..."
                  value={linkDownload}
                  onChange={(e) => setLinkDownload(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Link dự phòng</label>
                <input
                  type="url"
                  className="form-control form-control-sm"
                  placeholder="Không bắt buộc"
                  value={linkDuPhong}
                  onChange={(e) => setLinkDuPhong(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Link demo</label>
                <input
                  type="url"
                  className="form-control form-control-sm"
                  placeholder="Không bắt buộc"
                  value={linkDemo}
                  onChange={(e) => setLinkDemo(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Phí download</label>
                <div className="input-group input-group-sm">
                  <input
                    type="number"
                    min={0}
                    step={1000}
                    className="form-control"
                    placeholder="Nhập 0 nếu miễn phí"
                    value={phiTai}
                    onChange={(e) => setPhiTai(e.target.value)}
                  />
                  <span className="input-group-text">đ</span>
                </div>
              </div>
            </div>

            <div className="tieu-de-nhom">Nội dung chi tiết</div>
            <div className="mb-3">
              <label className="form-label fw-bold">Cam kết hỗ trợ (mỗi dòng một cam kết)</label>
              <textarea
                rows={3}
                className="form-control form-control-sm"
                placeholder={'Hỗ trợ cài đặt chạy thử\nCode đúng như mô tả'}
                value={camKet}
                onChange={(e) => setCamKet(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Mô tả chi tiết</label>
              <textarea
                rows={6}
                className="form-control form-control-sm"
                value={moTa}
                onChange={(e) => setMoTa(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Hướng dẫn cài đặt (mỗi dòng một bước)</label>
              <textarea
                rows={4}
                className="form-control form-control-sm"
                value={huongDanCaiDat}
                onChange={(e) => setHuongDanCaiDat(e.target.value)}
              ></textarea>
            </div>

            <div className="text-end">
              <button type="submit" className="btn btn-danger fw-bold px-4">
                <i className="bi bi-cloud-arrow-up-fill me-1"></i> ĐĂNG BÁN CODE
              </button>
            </div>
          </form>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-2 fw-bold small text-uppercase">Lưu ý khi đăng bán</div>
            <div className="card-body small">
              <ul className="ps-3 mb-0">
                <li>Code mới đăng sẽ ở trạng thái <b>Đang chờ duyệt</b>, được duyệt xong mới hiển thị bán</li>
                <li>Mỗi lượt bán bạn nhận <b className="text-success">70%</b> phí download, sàn giữ 30%</li>
                <li>Tiền bán code được <b className="text-warning">tạm giữ 3 - 4 ngày</b> rồi mới chuyển sang khả dụng</li>
                <li>Link tải phải còn hoạt động, code phải chạy được như mô tả</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadCodePage;
