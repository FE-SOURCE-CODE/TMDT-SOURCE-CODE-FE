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

    return (
        <div className="search-page">
            <nav className="mb-3 small">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <Link to="/" className="text-decoration-none text-muted">
                            <i className="bi bi-house-door-fill me-1"></i>Trang chủ
                        </Link>
                    </li>
                    <li className="breadcrumb-item active">Tìm kiếm</li>
                </ol>
            </nav>

            <h5 className="fw-bold text-danger text-uppercase mb-3 pb-2 border-bottom">Tìm Kiếm Source Code</h5>

            <div className="card shadow-sm border-0 p-3 mb-3">
                <form onSubmit={timKiem}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder={che === 'ma' ? 'Nhập mã code, ví dụ 36495 hoặc TC36495' : 'Nhập tên đồ án, ngôn ngữ...'}
                            value={o}
                            onChange={(e) => setO(e.target.value)}
                        />
                        <button className="btn btn-danger" type="submit">
                            <i className="bi bi-search me-1"></i> Tìm kiếm
                        </button>
                    </div>
                    <div className="mt-2 small">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="che" id="cheTen" checked={che === 'tu-khoa'} onChange={() => dispatch(setCheDoTim('tu-khoa'))} />
                            <label className="form-check-label" htmlFor="cheTen">Theo từ khóa</label>
                        </div>

                    </div>
                </form>
            </div>

            {!kw && (
                <div className="card shadow-sm border-0 text-center text-muted py-5 small">
                    Nhập từ khóa hoặc mã code để tìm kiếm
                </div>
            )}

            {kw && (
                <div className="small mb-2">
                    Tìm thấy <b className="text-danger">{kq.length}</b> kết quả cho "<b>{kw}</b>"
                </div>
            )}

            {kw && kq.length === 0 && (
                <div className="card shadow-sm border-0 text-center text-muted py-5 small">
                    Không tìm thấy source code nào
                </div>
            )}

            <div className="row g-3">
                {kq.map((c) => (
                    <div key={c.id} className="col-6 col-md-4 col-xl-3">
                        <CodeCard c={c} kieu="luoi" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;
