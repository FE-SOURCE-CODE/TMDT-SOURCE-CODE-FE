import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CodeCard from '../../components/CodeCard';
import { setTuKhoa, setCheDoTim } from '../../store/slices/productSlice';
import { boDau } from '../../utils/text';

function SearchPage() {
    const dispatch = useDispatch();
    const [sp, setSp] = useSearchParams();
    const product = useSelector((state: any) => state?.product);
    const dsCode = product?.dsCode || [];
    const tuKhoa = product?.tuKhoa || '';
    const che = product?.cheDoTim || 'tu-khoa';
    const [o, setO] = useState(sp.get('q') || '');

    useEffect(() => {
        const q = sp.get('q') || '';
        const c = sp.get('che') || 'tu-khoa';
        dispatch(setTuKhoa(q));
        dispatch(setCheDoTim(c));
        setO(q);
    }, [sp, dispatch]);

    const timKiem = (e: any) => {
        e.preventDefault();
        setSp({ q: o.trim(), che: che });
    };

    let kq = [];
    const kw = tuKhoa.trim();
    if (kw) {
        if (che === 'ma') {
            let ma = kw.toUpperCase().replace(/[^A-Z0-9]/g, '');
            if (/^[0-9]+$/.test(ma)) {
                ma = 'TC' + ma;
            }
            kq = dsCode.filter((c) => c.maCode === ma);
        } else {
            const k = boDau(kw);
            kq = dsCode.filter((c) => {
                const s = boDau(c.tenCode + ' ' + c.ngonNgu + ' ' + c.danhMuc + ' ' + c.theLoai);
                return s.includes(k);
            });
        }
    }


}

export default SearchPage;
