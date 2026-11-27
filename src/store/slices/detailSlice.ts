import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import duLieuTopcode from '../../../public/data/products.json';

// state ban dau lay tu file products.json, file nay cao tu topcode.vn bang scripts/cao-du-lieu-topcode.mjs
const initialState = {
  danhSachCode: duLieuTopcode.danhSachCode,
  danhSachYeuThich: [],
};

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    // bam tim de luu hoac bo luu code yeu thich
    doiYeuThich: (state, action: PayloadAction<string>) => {
      if (state.danhSachYeuThich.includes(action.payload)) {
        state.danhSachYeuThich = state.danhSachYeuThich.filter((maCode) => maCode !== action.payload);
      } else {
        state.danhSachYeuThich.push(action.payload);
      }
    },
  },
});

export const { doiYeuThich } = detailSlice.actions;
export default detailSlice.reducer;
