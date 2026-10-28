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
    taiKhoan: 0,
    tamGiu: 0,
    khaDung: 0,
  },
  thongKe: {
    codeUpload: 0,
    codeDaBan: 0,
    danhGia: '0/5',
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
