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
        // dang nhap google / facebook: bam la vao luon
        dangNhapMXH: (state, action: PayloadAction<string>) => {
            const ten = action.payload;
            state.nguoiDung = { hoTen: 'Người dùng ' + ten, tenDangNhap: ten.toLowerCase() + '_user', email: '', loai: ten.toLowerCase() };
            ghiLS('nguoiDung', state.nguoiDung);
        },
        datLaiMatKhau: (state, action: PayloadAction<any>) => {
            const tk = state.dsTaiKhoan.find((t) => t.email.toLowerCase() === action.payload.email.toLowerCase());
            if (tk) {
                tk.matKhau = action.payload.matKhau;
                ghiLS('dsTaiKhoan', state.dsTaiKhoan);
            }
        },
        dangXuat: (state) => {
            state.nguoiDung = null;
            localStorage.removeItem('nguoiDung');
        },
    },
});

export const { dangKy, dangNhap, dangNhapMXH, datLaiMatKhau, dangXuat } = authSlice.actions;
export default authSlice.reducer;
