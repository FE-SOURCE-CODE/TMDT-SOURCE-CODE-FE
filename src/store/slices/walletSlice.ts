import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// state ban dau cua vi tien va user
const initialState = {
  thanhVien: {
    hoTen: 'NHÂN TRƯƠNG',
    maThanhVien: 'tco185101',
    email: 'nhannhd1004@gmail.com',
    sdt: '',
  },
  soDu: {
    taiKhoan: 500000,
    tamGiu: 150000,
    khaDung: 350000,
  },
  thongKe: {
    codeUpload: 4,
    codeDaBan: 2,
    danhGia: '4.5/5',
  },
  badges: {
    thongBao: 2,
    binhLuan: 1,
  },
  daCapNhatSdt: false,
  lichSuNapTien: [
    {
      id: 'GD1001',
      ngay: '2026-10-24 09:15:30',
      hinhThuc: 'VietQR Ngân hàng',
      soTien: 300000,
      maGiaoDich: 'CODE_tco185101_NAP300K',
      trangThai: 'Thành công',
    },
    {
      id: 'GD1002',
      ngay: '2026-10-27 14:20:10',
      hinhThuc: 'VietQR Ngân hàng',
      soTien: 200000,
      maGiaoDich: 'CODE_tco185101_NAP200K',
      trangThai: 'Thành công',
    },
  ],
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    // nap tien vao vi kha dung
    napTien: (state, action: PayloadAction<number>) => {
      state.soDu.khaDung += action.payload;
      state.soDu.taiKhoan += action.payload;

      // them giao dich moi vao dau danh sach lich su
      const d = new Date();
      const ngayTao = d.toLocaleDateString('vi-VN') + ' ' + d.toLocaleTimeString('vi-VN');
      const maGD = 'CODE_tco185101_NAP' + (action.payload / 1000) + 'K';

      state.lichSuNapTien.unshift({
        id: 'GD' + (state.lichSuNapTien.length + 1001),
        ngay: ngayTao,
        hinhThuc: 'VietQR Ngân hàng',
        soTien: action.payload,
        maGiaoDich: maGD,
        trangThai: 'Thành công',
      });
    },
    // cap nhat so dien thoai
    capNhatSdt: (state, action: PayloadAction<string>) => {
      state.thanhVien.sdt = action.payload;
      state.daCapNhatSdt = true;
    },
  },
});

export const { napTien, capNhatSdt } = walletSlice.actions;
export default walletSlice.reducer;
