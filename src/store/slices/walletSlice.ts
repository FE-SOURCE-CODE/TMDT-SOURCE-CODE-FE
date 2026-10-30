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
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    // nap tien vao vi kha dung
    napTien: (state, action: PayloadAction<number>) => {
      state.soDu.khaDung += action.payload;
      state.soDu.taiKhoan += action.payload;
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
