import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// dữ liệu chép từ public/data/seller_codes.json
const initialState = {
  danhSachUpload: [
    {
      id: 'UP001',
      maCode: 'TC50001',
      tenCode: 'Website Bán Sách Online PHP & MySQL Có Trang Quản Trị',
      ngonNgu: 'PHP & MySQL',
      danhMuc: 'Website',
      anh: '/favicon.png',
      anhDemo: ['/favicon.png', '/favicon.png'],
      moTaNgan: 'Website bán sách có giỏ hàng, thanh toán và trang quản trị',
      loaiFile: 'Full code + Báo cáo',
      dungLuong: '85 MB',
      coSoDuLieu: 'MySQL',
      phiTai: 200000,
      linkDownload: 'https://drive.google.com/file/d/demo-upload-1',
      linkDuPhong: '',
      linkDemo: '',
      camKet: ['Hỗ trợ cài đặt chạy thử', 'Code đúng như mô tả'],
      moTa: 'Website bán sách viết bằng PHP thuần, giao diện Bootstrap, phù hợp làm đồ án môn Lập trình Web.',
      huongDanCaiDat: [
        'Import file sach.sql vào phpMyAdmin',
        'Sửa thông tin kết nối trong config.php',
        'Chạy bằng XAMPP',
      ],
      ngayDang: '2026-11-02 14:20:00',
      luotTai: 3,
      trangThai: 'Đang hiển thị bán',
      lyDoTuChoi: '',
    },
    {
      id: 'UP002',
      maCode: 'TC50002',
      tenCode: 'App Ghi Chú Android Java Lưu Bằng SQLite',
      ngonNgu: 'Android',
      danhMuc: 'Ứng dụng',
      anh: '/favicon.png',
      anhDemo: ['/favicon.png'],
      moTaNgan: 'Ứng dụng ghi chú đơn giản, thêm sửa xóa ghi chú',
      loaiFile: 'Full code',
      dungLuong: '24 MB',
      coSoDuLieu: 'SQLite',
      phiTai: 100000,
      linkDownload: 'https://drive.google.com/file/d/demo-upload-2',
      linkDuPhong: 'https://www.mediafire.com/file/demo-upload-2',
      linkDemo: '',
      camKet: ['Hỗ trợ qua Zalo trong 3 ngày'],
      moTa: 'App ghi chú viết bằng Java trên Android Studio, dữ liệu lưu bằng SQLite.',
      huongDanCaiDat: [
        'Mở project bằng Android Studio',
        'Chạy trên máy ảo Android 10 trở lên',
      ],
      ngayDang: '2026-11-16 09:05:00',
      luotTai: 0,
      trangThai: 'Đang chờ duyệt',
      lyDoTuChoi: '',
    },
    {
      id: 'UP003',
      maCode: 'TC50003',
      tenCode: 'Game Rắn Săn Mồi Javascript',
      ngonNgu: 'Javascript',
      danhMuc: 'Game',
      anh: '/favicon.png',
      anhDemo: [],
      moTaNgan: 'Game rắn săn mồi chạy trên trình duyệt',
      loaiFile: 'Full code',
      dungLuong: '2 MB',
      coSoDuLieu: 'Không có',
      phiTai: 50000,
      linkDownload: 'https://drive.google.com/file/d/demo-upload-3',
      linkDuPhong: '',
      linkDemo: '',
      camKet: [],
      moTa: 'Game rắn săn mồi viết bằng HTML, CSS và Javascript.',
      huongDanCaiDat: ['Mở file index.html bằng trình duyệt'],
      ngayDang: '2026-11-10 20:30:00',
      luotTai: 0,
      trangThai: 'Bị từ chối',
      lyDoTuChoi: 'Thiếu ảnh demo và cam kết hỗ trợ',
    },
  ],
  lichSuBan: [],
};

const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    // code mới luôn phải chờ duyệt, thêm lên đầu để bảng quản lý thấy ngay
    themCodeUpload: (state, action: PayloadAction<any>) => {
      state.danhSachUpload.unshift({ ...action.payload, trangThai: 'Đang chờ duyệt', lyDoTuChoi: '' });
    },
  },
});

export const { themCodeUpload } = sellerSlice.actions;
export default sellerSlice.reducer;
