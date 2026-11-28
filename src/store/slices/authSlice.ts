import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const docLS = (k: string, md: any) => {
    try {
        const s = localStorage.getItem(k);
        return s ? JSON.parse(s) : md;
    } catch {
        return md;
    }
};

const ghiLS = (k: string, v: any) => {
    try {
        localStorage.setItem(k, JSON.stringify(v));
    } catch {
        console.log('khong ghi duoc localStorage');
    }
};

const initialState = {
    dsTaiKhoan: docLS('dsTaiKhoan', [
        { hoTen: 'Nhân Trương', tenDangNhap: 'nhantruong', email: 'nhannhd1004@gmail.com', matKhau: '123456' },
    ]),
    nguoiDung: docLS('nguoiDung', null),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        dangKy: (state, action: PayloadAction<any>) => {
            state.dsTaiKhoan.push(action.payload);
            ghiLS('dsTaiKhoan', state.dsTaiKhoan);
        },
        dangNhap: (state, action: PayloadAction<string>) => {
            const k = action.payload.toLowerCase();
            const tk = state.dsTaiKhoan.find((t) => t.tenDangNhap.toLowerCase() === k || t.email.toLowerCase() === k);
            if (tk) {
                state.nguoiDung = { hoTen: tk.hoTen, tenDangNhap: tk.tenDangNhap, email: tk.email, loai: 'tai-khoan' };
                ghiLS('nguoiDung', state.nguoiDung);
            }
        },

    },
});

export const { dangKy, dangNhap, dangNhapMXH, datLaiMatKhau, dangXuat } = authSlice.actions;
export default authSlice.reducer;
