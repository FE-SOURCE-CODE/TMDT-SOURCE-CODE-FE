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


