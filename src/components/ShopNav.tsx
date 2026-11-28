import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { dangXuat } from '../store/slices/authSlice';

function ShopNav() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const nd = useSelector((state: any) => state?.auth?.nguoiDung);
    const [kw, setKw] = useState('');

    const timKiem = (e: any) => {
        e.preventDefault();
        const k = kw.trim();
        if (!k) return;
        const che = /^(tc)?[0-9]+$/i.test(k) ? 'ma' : 'tu-khoa';
        nav('/tim-kiem?q=' + encodeURIComponent(k) + '&che=' + che);
    };

    const thoat = () => {
        dispatch(dangXuat());
        nav('/dang-nhap');
    };

    const cls = ({ isActive }: any) => (isActive ? 'nav-link fw-bold text-danger' : 'nav-link text-dark');

    return (
        <div className="card shadow-sm border-0 mb-3">
            <div className="d-flex flex-wrap align-items-center gap-2 px-3 py-2">
                <ul className="nav small">
                    <li className="nav-item">
                        <NavLink to="/trang-chu" className={cls}>Trang chủ</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/kho-code" className={cls}>Kho code</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/top-code" className={cls}>Top code</NavLink>
                    </li>
                </ul>

                <form className="d-flex flex-grow-1 mx-lg-3" onSubmit={timKiem}>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Tìm tên hoặc mã code..."
                        value={kw}
                        onChange={(e) => setKw(e.target.value)}
                    />
                    <button className="btn btn-danger btn-sm ms-1" type="submit">
                        <i className="bi bi-search"></i>
                    </button>
                </form>

                <div className="d-flex align-items-center gap-2 ms-auto">
                    {nd ? (
                        <>
              <span className="fw-bold small">
                <i className="bi bi-person-circle me-1"></i>
                  {nd.hoTen}
              </span>
                            <span className="text-danger small" role="button" onClick={thoat}>[Thoát]</span>
                        </>
                    ) : (
                        <>
                            <Link to="/dang-nhap" className="btn btn-outline-danger btn-sm fw-bold">Đăng nhập</Link>
                            <Link to="/dang-ky" className="btn btn-danger btn-sm fw-bold">Đăng ký</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShopNav;
