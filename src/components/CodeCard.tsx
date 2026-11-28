import { Link } from 'react-router-dom';
import { fmtGia, sao } from '../utils/text';

function CodeCard({ c, kieu }: any) {
    const ctLink = '/code/' + c.maCode;
    const demoLink = '/live-demo/' + c.maCode;
    const demoCls = c.linkDemo ? 'btn btn-outline-danger btn-sm' : 'btn btn-outline-secondary btn-sm disabled';

    if (kieu === 'ds') {
        return (
            <div className="card code-card shadow-sm border-0 mb-3">
                <div className="row g-0">
                    <div className="col-4 col-md-3">
                        <img src={c.anh} alt={c.tenCode} className="thumb h-100" />
                    </div>
                    <div className="col-8 col-md-9">
                        <div className="card-body p-3">
                            <div className="d-flex justify-content-between">
                                <span className="small text-success fw-bold">{c.maCode}</span>
                                <span className="small text-muted">{c.ngayDang}</span>
                            </div>
                            <Link to={ctLink} className="text-dark text-decoration-none fw-bold">
                                {c.tenCode}
                            </Link>
                            <div className="small text-muted mt-1">
                                {c.danhMuc} / {c.theLoai} / {c.ngonNgu}
                            </div>
                            <div className="text-warning small">
                                {sao(c.diemSao)} <span className="text-muted">({c.soDanhGia})</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                                <div>
                                    <span className="text-danger fw-bold fs-5 me-3">{fmtGia(c.phiTai)}</span>
                                    <span className="small text-muted">
                    <i className="bi bi-download me-1"></i>
                                        {c.luotTai}
                  </span>
                                </div>
                                <div className="d-flex gap-1">
                                    <Link to={demoLink} className={demoCls}>Xem thử</Link>
                                    <Link to={ctLink} className="btn btn-success btn-sm">Chi tiết</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card code-card h-100 shadow-sm border-0">
            <img src={c.anh} alt={c.tenCode} className="thumb" />
            <div className="card-body p-2">
                <div className="small text-success fw-bold">{c.maCode}</div>
                <Link to={ctLink} className="ten-code text-dark text-decoration-none fw-bold small">
                    {c.tenCode}
                </Link>
                <div className="text-warning small mt-1">
                    {sao(c.diemSao)} <span className="text-muted">({c.soDanhGia})</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                    <span className="text-danger fw-bold">{fmtGia(c.phiTai)}</span>
                    <span className="small text-muted">
            <i className="bi bi-download me-1"></i>
                        {c.luotTai}
          </span>
                </div>
            </div>
            <div className="card-footer bg-white border-0 pt-0 d-flex gap-1">
                <Link to={demoLink} className={demoCls + ' flex-fill'}>Xem thử</Link>
                <Link to={ctLink} className="btn btn-success btn-sm flex-fill">Chi tiết</Link>
            </div>
        </div>
    );
}

export default CodeCard;
