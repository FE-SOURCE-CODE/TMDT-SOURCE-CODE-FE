import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    dsCode: [
        { id: 'CODE201', maCode: 'TC10294', tenCode: 'Source code Website TMĐT Bán Quần Áo Full Stack React + NodeJS', danhMuc: 'Website', theLoai: 'Bán hàng', ngonNgu: 'Javascript', anh: '/favicon.png', ngayDang: '2026-10-20', luotTai: 15, luotXem: 320, phiTai: 250000, diemSao: 0, soDanhGia: 0, linkDemo: 'https://demo.topcode.vn/quan-ao', nguoiBan: 'NHÂN TRƯƠNG' },
        { id: 'CODE202', maCode: 'TC36495', tenCode: 'Đồ án Quản Lý Thư Viện C# WinForm + SQL Server', danhMuc: 'Phần mềm', theLoai: 'Quản lý thư viện', ngonNgu: 'Visual C#', anh: '/favicon.png', ngayDang: '2026-10-22', luotTai: 42, luotXem: 810, phiTai: 150000, diemSao: 5, soDanhGia: 1, linkDemo: '', nguoiBan: 'TÙNG DƯƠNG' },
        { id: 'CODE203', maCode: 'TC40012', tenCode: 'Game Flappy Bird Unity 2D có hướng dẫn', danhMuc: 'Game', theLoai: 'Arcade', ngonNgu: 'Unity', anh: '/favicon.png', ngayDang: '2026-10-28', luotTai: 7, luotXem: 95, phiTai: 0, diemSao: 0, soDanhGia: 0, linkDemo: '', nguoiBan: 'NHÂN TRƯƠNG' },
        { id: 'CODE204', maCode: 'TC41520', tenCode: 'Website Bán Điện Thoại PHP & MySQL có trang quản trị', danhMuc: 'Website', theLoai: 'Bán hàng', ngonNgu: 'PHP & MySQL', anh: '/favicon.png', ngayDang: '2026-10-15', luotTai: 58, luotXem: 1240, phiTai: 180000, diemSao: 4.5, soDanhGia: 6, linkDemo: 'https://demo.topcode.vn/dien-thoai', nguoiBan: 'MINH KHOA' },
        { id: 'CODE205', maCode: 'TC41877', tenCode: 'App Học Tiếng Anh Android Java', danhMuc: 'App', theLoai: 'Học tập', ngonNgu: 'Android', anh: '/favicon.png', ngayDang: '2026-10-25', luotTai: 33, luotXem: 690, phiTai: 120000, diemSao: 4, soDanhGia: 3, linkDemo: '', nguoiBan: 'LAN ANH' },
        { id: 'CODE206', maCode: 'TC42203', tenCode: 'Phần mềm Quản Lý Nhân Sự Java Swing + MySQL', danhMuc: 'Phần mềm', theLoai: 'Quản lý nhân sự', ngonNgu: 'Khác', anh: '/favicon.png', ngayDang: '2026-10-17', luotTai: 19, luotXem: 430, phiTai: 130000, diemSao: 4, soDanhGia: 2, linkDemo: '', nguoiBan: 'TÙNG DƯƠNG' },
        { id: 'CODE207', maCode: 'TC42650', tenCode: 'Web Đặt Phòng Khách Sạn Asp.Net MVC', danhMuc: 'Website', theLoai: 'Đặt phòng', ngonNgu: 'Asp.Net', anh: '/favicon.png', ngayDang: '2026-11-01', luotTai: 27, luotXem: 560, phiTai: 300000, diemSao: 4.8, soDanhGia: 5, linkDemo: 'https://demo.topcode.vn/khach-san', nguoiBan: 'NHÂN TRƯƠNG' },
        { id: 'CODE208', maCode: 'TC43018', tenCode: 'Giao Diện Landing Page Bootstrap 5 Responsive', danhMuc: 'Website', theLoai: 'Landing page', ngonNgu: 'Html & Template', anh: '/favicon.png', ngayDang: '2026-10-10', luotTai: 120, luotXem: 2400, phiTai: 0, diemSao: 4.2, soDanhGia: 12, linkDemo: 'https://getbootstrap.com/docs/5.3/examples/heroes/', nguoiBan: 'MINH KHOA' },
        { id: 'CODE209', maCode: 'TC43377', tenCode: 'Theme WordPress Tin Tức Responsive', danhMuc: 'Website', theLoai: 'Tin tức', ngonNgu: 'WordPress', anh: '/favicon.png', ngayDang: '2026-11-03', luotTai: 19, luotXem: 410, phiTai: 90000, diemSao: 4, soDanhGia: 2, linkDemo: 'https://demo.topcode.vn/wp-tin-tuc', nguoiBan: 'LAN ANH' },
        { id: 'CODE210', maCode: 'TC43590', tenCode: 'Game Đua Xe 3D Unity', danhMuc: 'Game', theLoai: 'Đua xe', ngonNgu: 'Unity', anh: '/favicon.png', ngayDang: '2026-10-18', luotTai: 24, luotXem: 880, phiTai: 200000, diemSao: 4.6, soDanhGia: 4, linkDemo: '', nguoiBan: 'TÙNG DƯƠNG' },
        { id: 'CODE211', maCode: 'TC43944', tenCode: 'App Ghi Chú iOS Swift lưu iCloud', danhMuc: 'App', theLoai: 'Ghi chú', ngonNgu: 'iOS', anh: '/favicon.png', ngayDang: '2026-11-05', luotTai: 11, luotXem: 230, phiTai: 100000, diemSao: 0, soDanhGia: 0, linkDemo: '', nguoiBan: 'NHÂN TRƯƠNG' },
        { id: 'CODE212', maCode: 'TC44102', tenCode: 'Game Cờ Caro Cocos2D chơi với máy', danhMuc: 'Game', theLoai: 'Cờ bài', ngonNgu: 'Cocos2D', anh: '/favicon.png', ngayDang: '2026-10-30', luotTai: 14, luotXem: 300, phiTai: 70000, diemSao: 3.5, soDanhGia: 2, linkDemo: '', nguoiBan: 'MINH KHOA' },
        { id: 'CODE213', maCode: 'TC44388', tenCode: 'Quản Lý Kho Hàng VB.NET + SQL Server', danhMuc: 'Phần mềm', theLoai: 'Quản lý kho', ngonNgu: 'Visual Basic', anh: '/favicon.png', ngayDang: '2026-10-12', luotTai: 22, luotXem: 470, phiTai: 110000, diemSao: 4, soDanhGia: 3, linkDemo: '', nguoiBan: 'LAN ANH' },
        { id: 'CODE214', maCode: 'TC44721', tenCode: 'Web Quản Lý Trường Học Joomla', danhMuc: 'Website', theLoai: 'Giáo dục', ngonNgu: 'Joomla', anh: '/favicon.png', ngayDang: '2026-11-07', luotTai: 9, luotXem: 280, phiTai: 160000, diemSao: 4, soDanhGia: 1, linkDemo: 'https://demo.topcode.vn/joomla-truong', nguoiBan: 'TÙNG DƯƠNG' },
        { id: 'CODE215', maCode: 'TC45066', tenCode: 'Phần mềm Quản Lý Phòng Khám C++ Qt', danhMuc: 'Phần mềm', theLoai: 'Quản lý phòng khám', ngonNgu: 'Visual C++', anh: '/favicon.png', ngayDang: '2026-11-08', luotTai: 6, luotXem: 150, phiTai: 220000, diemSao: 5, soDanhGia: 1, linkDemo: '', nguoiBan: 'MINH KHOA' },
        { id: 'CODE216', maCode: 'TC45310', tenCode: 'Website Portfolio Cá Nhân ReactJS', danhMuc: 'Website', theLoai: 'Portfolio', ngonNgu: 'Javascript', anh: '/favicon.png', ngayDang: '2026-11-09', luotTai: 85, luotXem: 1500, phiTai: 0, diemSao: 4.7, soDanhGia: 9, linkDemo: 'https://demo.topcode.vn/portfolio', nguoiBan: 'NHÂN TRƯƠNG' },
        { id: 'CODE217', maCode: 'TC45672', tenCode: 'Web Bán Hàng Python Django + PostgreSQL', danhMuc: 'Website', theLoai: 'Bán hàng', ngonNgu: 'Python', anh: '/favicon.png', ngayDang: '2026-11-10', luotTai: 17, luotXem: 390, phiTai: 260000, diemSao: 4.4, soDanhGia: 3, linkDemo: 'https://demo.topcode.vn/django-shop', nguoiBan: 'LAN ANH' },
        { id: 'CODE218', maCode: 'TC45999', tenCode: 'App Chat Realtime Android Firebase', danhMuc: 'App', theLoai: 'Chat', ngonNgu: 'Android', anh: '/favicon.png', ngayDang: '2026-11-06', luotTai: 21, luotXem: 520, phiTai: 190000, diemSao: 4.3, soDanhGia: 4, linkDemo: '', nguoiBan: 'MINH KHOA' },
        { id: 'CODE219', maCode: 'TC46120', tenCode: 'Game Giải Đố Sudoku Unity', danhMuc: 'Game', theLoai: 'Giải đố', ngonNgu: 'Unity', anh: '/favicon.png', ngayDang: '2026-10-14', luotTai: 31, luotXem: 610, phiTai: 50000, diemSao: 3.9, soDanhGia: 5, linkDemo: '', nguoiBan: 'TÙNG DƯƠNG' },
        { id: 'CODE220', maCode: 'TC46488', tenCode: 'Blog Cá Nhân Python Flask', danhMuc: 'Website', theLoai: 'Blog', ngonNgu: 'Python', anh: '/favicon.png', ngayDang: '2026-11-11', luotTai: 13, luotXem: 350, phiTai: 80000, diemSao: 4.1, soDanhGia: 2, linkDemo: 'https://demo.topcode.vn/flask-blog', nguoiBan: 'NHÂN TRƯƠNG' },
    ],
    tuKhoa: '',
    cheDoTim: 'tu-khoa',
    dsHoatDong: [
        { id: 1, loai: 'dangKy', nd: 'Lê Hoàng vừa đăng ký thành viên' },
        { id: 2, loai: 'taiCode', nd: 'Minh Khoa vừa tải code TC36495' },
        { id: 3, loai: 'congTien', nd: 'Nhân Trương vừa được cộng 175.000đ' },
        { id: 4, loai: 'taiCode', nd: 'Thu Hà vừa tải code TC43018' },
        { id: 5, loai: 'dangKy', nd: 'Quốc Bảo vừa đăng ký thành viên' },
        { id: 6, loai: 'congTien', nd: 'Lan Anh vừa được cộng 84.000đ' },
        { id: 7, loai: 'taiCode', nd: 'Tùng Dương vừa tải code TC45310' },
        { id: 8, loai: 'taiCode', nd: 'Gia Huy vừa tải code TC41520' },
        { id: 9, loai: 'dangKy', nd: 'Ngọc Mai vừa đăng ký thành viên' },
        { id: 10, loai: 'congTien', nd: 'Minh Khoa vừa được cộng 210.000đ' },
    ],
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setTuKhoa: (state, action: PayloadAction<string>) => {
            state.tuKhoa = action.payload;
        },
        setCheDoTim: (state, action: PayloadAction<string>) => {
            state.cheDoTim = action.payload;
        },
    },
});

export const { setTuKhoa, setCheDoTim } = productSlice.actions;
export default productSlice.reducer;
