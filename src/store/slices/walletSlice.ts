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
  codeDaMua: [
    {
      id: 'CODE201',
      maCode: 'TC10294',
      tenCode: 'Source code Website TMĐT Bán Quần Áo Full Stack React + NodeJS',
      anh: '/favicon.png',
      ngayMua: '2026-10-25 11:30:00',
      phiTai: 150000,
      sdtNguoiBan: '0912345678',
      linkDownload: 'https://drive.google.com/file/d/demo-source-code-1',
    },
  ],
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
    // tru tien kha dung va them code vao danh sach da mua
    muaCode: (state, action: PayloadAction<any>) => {
      state.soDu.khaDung -= action.payload.phiTai;
      state.soDu.taiKhoan -= action.payload.phiTai;
      state.codeDaMua.unshift(action.payload);
    },
  },
});

export const { napTien, capNhatSdt, muaCode } = walletSlice.actions;
export default walletSlice.reducer;
