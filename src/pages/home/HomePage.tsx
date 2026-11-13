import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CodeCard from '../../components/CodeCard';

const banners = [
    { tt: 'CODEMARKET - SÀN MÃ NGUỒN SỐ 1', nd: 'Hàng trăm source code, đồ án chất lượng cho sinh viên và lập trình viên', bg: 'bn1' },
    { tt: 'ĐĂNG CODE - NHẬN 70% DOANH THU', nd: 'Mỗi lượt tải bạn nhận 70%, tiền về ví sau 3 - 4 ngày', bg: 'bn2' },
    { tt: 'NẠP TIỀN NHANH QUA VIETQR', nd: 'Chuyển khoản là cộng tiền, tải code ngay không cần chờ', bg: 'bn3' },
];

const camKet = [
    { icon: 'bi-patch-check-fill', tt: 'Code chất lượng', nd: 'Kiểm duyệt trước khi bán' },
    { icon: 'bi-headset', tt: 'Hỗ trợ 24/7', nd: 'Giải đáp mọi lúc' },
    { icon: 'bi-lightning-charge-fill', tt: 'Nạp tiền nhanh', nd: 'Qua VietQR tự động' },
    { icon: 'bi-cash-coin', tt: 'Rút tiền nhanh', nd: 'Về thẳng ngân hàng' },
];

function HomePage() {
    const product = useSelector((state: any) => state?.product);
    const category = useSelector((state: any) => state?.category);
    const dsCode = product?.dsCode || [];
    const dsHD = product?.dsHoatDong || [];
    const dsNN = category?.dsNgonNgu || [];

    const [bn, setBn] = useState(0);
    const [hd, setHd] = useState(0);

    useEffect(() => {
        const t = setInterval(() => {
            setBn((v) => (v + 1) % banners.length);
        }, 4000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        const t = setInterval(() => {
            setHd((v) => (v + 1) % dsHD.length);
        }, 2500);
        return () => clearInterval(t);
    }, [dsHD.length]);

    const moi = [...dsCode].sort((a, b) => (a.ngayDang < b.ngayDang ? 1 : -1)).slice(0, 4);
    const noiBat = [...dsCode].sort((a, b) => b.luotXem - a.luotXem).slice(0, 4);

    const hdHienThi = [];
    for (let i = 0; i < 5; i++) {
        hdHienThi.push(dsHD[(hd + i) % dsHD.length]);
    }

    const iconHD = (loai: string) => {
        if (loai === 'dangKy') return 'bi bi-person-plus-fill text-primary';
        if (loai === 'taiCode') return 'bi bi-download text-success';
        return 'bi bi-cash-coin text-warning';
    };

}
export default HomePage;
