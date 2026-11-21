import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { themCodeUpload } from '../../store/slices/sellerSlice';

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

  const dispatch = useDispatch();
  // chỉ báo một lỗi mỗi lần: loiTruong là tên ô đang sai để tô đỏ đúng ô đó
  const [loiTruong, setLoiTruong] = useState('');
  const [thongBaoLoi, setThongBaoLoi] = useState('');
  const [thongBaoThanhCong, setThongBaoThanhCong] = useState('');

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

  const baoLoi = (truong, noiDung) => {
    setLoiTruong(truong);
    setThongBaoLoi(noiDung);
    setThongBaoThanhCong('');
  };

  const linkHopLe = (link) => link.startsWith('http://') || link.startsWith('https://');

  // gợi ý từ khóa theo ngôn ngữ và thể loại đang chọn, bấm vào thì nối vào cuối tiêu đề
  const tuKhoaGoiY = ['Source code', 'Đồ án', 'Full code', 'Có báo cáo', 'Code chạy ổn định'];
  if (ngonNgu !== '' && ngonNgu !== 'Khác') {
    tuKhoaGoiY.unshift(ngonNgu);
  }
  if (danhMuc !== '') {
    tuKhoaGoiY.unshift(danhMuc);
  }

  const themTuKhoa = (tuKhoa) => {
    if (tieuDe.toLowerCase().includes(tuKhoa.toLowerCase())) {
      return;
    }
    setTieuDe(tieuDe === '' ? tuKhoa : tieuDe + ' ' + tuKhoa);
  };

  const xuLyDangBan = (e) => {
    e.preventDefault();

    if (anhDaiDien === '') {
      baoLoi('anhDaiDien', 'Bạn chưa chọn ảnh đại diện');
      return;
    }
    if (ngonNgu === '') {
      baoLoi('ngonNgu', 'Bạn chưa chọn ngôn ngữ');
      return;
    }
    if (danhMuc === '') {
      baoLoi('danhMuc', 'Bạn chưa chọn thể loại');
      return;
    }
    if (tieuDe.trim().length < 20) {
      baoLoi('tieuDe', 'Tiêu đề cần ít nhất 20 ký tự để dễ tìm trên Google');
      return;
    }
    if (moTaNgan.trim() === '') {
      baoLoi('moTaNgan', 'Bạn chưa nhập mô tả ngắn');
      return;
    }
    if (linkDownload.trim() === '') {
      baoLoi('linkDownload', 'Bạn chưa nhập link tải');
      return;
    }
    if (!linkHopLe(linkDownload.trim())) {
      baoLoi('linkDownload', 'Link tải phải bắt đầu bằng http:// hoặc https://');
      return;
    }
    // hai link này không bắt buộc, chỉ kiểm tra khi có nhập
    if (linkDuPhong.trim() !== '' && !linkHopLe(linkDuPhong.trim())) {
      baoLoi('linkDuPhong', 'Link dự phòng phải bắt đầu bằng http:// hoặc https://');
      return;
    }
    if (linkDemo.trim() !== '' && !linkHopLe(linkDemo.trim())) {
      baoLoi('linkDemo', 'Link demo phải bắt đầu bằng http:// hoặc https://');
      return;
    }
    if (phiTai === '') {
      baoLoi('phiTai', 'Bạn chưa nhập phí download, nhập 0 nếu muốn miễn phí');
      return;
    }
    if (Number(phiTai) < 0 || Number(phiTai) % 1000 !== 0) {
      baoLoi('phiTai', 'Phí download phải từ 0đ trở lên và chẵn nghìn');
      return;
    }
    if (moTa.trim() === '') {
      baoLoi('moTa', 'Bạn chưa nhập mô tả chi tiết');
      return;
    }
    if (huongDanCaiDat.trim() === '') {
      baoLoi('huongDanCaiDat', 'Bạn chưa nhập hướng dẫn cài đặt');
      return;
    }

    // mã code lấy 5 số cuối của thời gian hiện tại cho khỏi trùng với code cũ
    const soCuoi = String(Date.now()).slice(-5);
    const maCode = 'TC' + soCuoi;

    dispatch(
      themCodeUpload({
        id: 'UP' + soCuoi,
        maCode: maCode,
        tenCode: tieuDe.trim(),
        ngonNgu: ngonNgu,
        danhMuc: danhMuc,
        anh: anhDaiDien,
        anhDemo: anhDemo,
        moTaNgan: moTaNgan.trim(),
        loaiFile: loaiFile,
        dungLuong: dungLuong.trim(),
        coSoDuLieu: coSoDuLieu.trim(),
        phiTai: Number(phiTai),
        linkDownload: linkDownload.trim(),
        linkDuPhong: linkDuPhong.trim(),
        linkDemo: linkDemo.trim(),
        // mỗi dòng là một cam kết hoặc một bước, bỏ các dòng trống
        camKet: camKet.split('\n').filter((dong) => dong.trim() !== ''),
        moTa: moTa.trim(),
        huongDanCaiDat: huongDanCaiDat.split('\n').filter((dong) => dong.trim() !== ''),
        ngayDang: new Date().toLocaleString('sv-SE'),
        luotTai: 0,
      })
    );

    // gửi xong thì xóa trắng form, reset() để xóa luôn tên file trong 2 ô chọn ảnh
    e.target.reset();
    setAnhDaiDien('');
    setAnhDemo([]);
    setNgonNgu('');
    setDanhMuc('');
    setTieuDe('');
    setMoTaNgan('');
    setLoaiFile('Full code');
    setDungLuong('');
    setCoSoDuLieu('');
    setLinkDownload('');
    setLinkDuPhong('');
    setLinkDemo('');
    setPhiTai('');
    setCamKet('');
    setMoTa('');
    setHuongDanCaiDat('');

    setLoiTruong('');
    setThongBaoLoi('');
    setThongBaoThanhCong('Đã gửi code ' + maCode + ', code đang chờ duyệt');
    window.scrollTo(0, 0);
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
          {thongBaoThanhCong && (
            <div className="alert alert-success py-2 small">
              <i className="bi bi-check-circle-fill me-1"></i>
              {thongBaoThanhCong}
            </div>
          )}

          {/* noValidate để trình duyệt không tự chặn ô url, ô số mà để code báo lỗi tiếng Việt */}
          <form className="card shadow-sm border-0 p-3 small" noValidate onSubmit={xuLyDangBan}>
            <div className="tieu-de-nhom">Hình ảnh</div>
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">Ảnh đại diện</label>
                <input
                  type="file"
                  accept="image/*"
                  className={loiTruong === 'anhDaiDien' ? 'form-control form-control-sm is-invalid' : 'form-control form-control-sm'}
                  onChange={chonAnhDaiDien}
                />
                {loiTruong === 'anhDaiDien' && <div className="invalid-feedback">{thongBaoLoi}</div>}
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
                <select
                  className={loiTruong === 'ngonNgu' ? 'form-select form-select-sm is-invalid' : 'form-select form-select-sm'}
                  value={ngonNgu} onChange={(e) => setNgonNgu(e.target.value)}>
                  <option value="">-- Chọn ngôn ngữ --</option>
                  {danhSachNgonNgu.map((ten) => (
                    <option key={ten} value={ten}>{ten}</option>
                  ))}
                </select>
                {loiTruong === 'ngonNgu' && <div className="invalid-feedback">{thongBaoLoi}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Thể loại</label>
                <select
                  className={loiTruong === 'danhMuc' ? 'form-select form-select-sm is-invalid' : 'form-select form-select-sm'}
                  value={danhMuc} onChange={(e) => setDanhMuc(e.target.value)}>
                  <option value="">-- Chọn thể loại --</option>
                  <option value="Website">Website</option>
                  <option value="Phần mềm">Phần mềm</option>
                  <option value="Ứng dụng">Ứng dụng</option>
                  <option value="Game">Game</option>
                </select>
                {loiTruong === 'danhMuc' && <div className="invalid-feedback">{thongBaoLoi}</div>}
              </div>
              <div className="col-12">
                <label className="form-label fw-bold">Tiêu đề</label>
                <input
                  type="text"
                  className={loiTruong === 'tieuDe' ? 'form-control form-control-sm is-invalid' : 'form-control form-control-sm'}
                  maxLength={100}
                  placeholder="Ví dụ: Source code website bán quần áo React + NodeJS"
                  value={tieuDe}
                  onChange={(e) => setTieuDe(e.target.value)}
                />
                {loiTruong === 'tieuDe' && <div className="invalid-feedback">{thongBaoLoi}</div>}
                <div className="text-muted mt-1">{tieuDe.length}/100 ký tự, nên dài từ 20 ký tự</div>

                <div className="goi-y-seo mt-2">
                  <div className="fw-bold mb-1">
                    <i className="bi bi-google me-1"></i>Gợi ý từ khóa SEO (bấm để thêm vào tiêu đề)
                  </div>
                  {tuKhoaGoiY.map((tuKhoa) => (
                    <button key={tuKhoa} type="button" className="btn btn-outline-secondary btn-sm me-1 mb-1" onClick={() => themTuKhoa(tuKhoa)}>
                      + {tuKhoa}
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-12">
                <label className="form-label fw-bold">Mô tả ngắn</label>
                <textarea
                  rows={2}
                  className={loiTruong === 'moTaNgan' ? 'form-control form-control-sm is-invalid' : 'form-control form-control-sm'}
                  value={moTaNgan}
                  onChange={(e) => setMoTaNgan(e.target.value)}
                ></textarea>
                {loiTruong === 'moTaNgan' && <div className="invalid-feedback">{thongBaoLoi}</div>}
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
                  className={loiTruong === 'linkDownload' ? 'form-control form-control-sm is-invalid' : 'form-control form-control-sm'}
                  placeholder="https://drive.google.com/..."
                  value={linkDownload}
                  onChange={(e) => setLinkDownload(e.target.value)}
                />
                {loiTruong === 'linkDownload' && <div className="invalid-feedback">{thongBaoLoi}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Link dự phòng</label>
                <input
                  type="url"
                  className={loiTruong === 'linkDuPhong' ? 'form-control form-control-sm is-invalid' : 'form-control form-control-sm'}
                  placeholder="Không bắt buộc"
                  value={linkDuPhong}
                  onChange={(e) => setLinkDuPhong(e.target.value)}
                />
                {loiTruong === 'linkDuPhong' && <div className="invalid-feedback">{thongBaoLoi}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Link demo</label>
                <input
                  type="url"
                  className={loiTruong === 'linkDemo' ? 'form-control form-control-sm is-invalid' : 'form-control form-control-sm'}
                  placeholder="Không bắt buộc"
                  value={linkDemo}
                  onChange={(e) => setLinkDemo(e.target.value)}
                />
                {loiTruong === 'linkDemo' && <div className="invalid-feedback">{thongBaoLoi}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Phí download</label>
                <div className="input-group input-group-sm has-validation">
                  <input
                    type="number"
                    min={0}
                    step={1000}
                    className={loiTruong === 'phiTai' ? 'form-control is-invalid' : 'form-control'}
                    placeholder="Nhập 0 nếu miễn phí"
                    value={phiTai}
                    onChange={(e) => setPhiTai(e.target.value)}
                  />
                  <span className="input-group-text">đ</span>
                  {loiTruong === 'phiTai' && <div className="invalid-feedback">{thongBaoLoi}</div>}
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
                className={loiTruong === 'moTa' ? 'form-control form-control-sm is-invalid' : 'form-control form-control-sm'}
                value={moTa}
                onChange={(e) => setMoTa(e.target.value)}
              ></textarea>
                {loiTruong === 'moTa' && <div className="invalid-feedback">{thongBaoLoi}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Hướng dẫn cài đặt (mỗi dòng một bước)</label>
              <textarea
                rows={4}
                className={loiTruong === 'huongDanCaiDat' ? 'form-control form-control-sm is-invalid' : 'form-control form-control-sm'}
                value={huongDanCaiDat}
                onChange={(e) => setHuongDanCaiDat(e.target.value)}
              ></textarea>
                {loiTruong === 'huongDanCaiDat' && <div className="invalid-feedback">{thongBaoLoi}</div>}
            </div>

            {thongBaoLoi && (
              <div className="alert alert-danger py-2">
                <i className="bi bi-exclamation-triangle-fill me-1"></i>
                {thongBaoLoi}
              </div>
            )}

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
