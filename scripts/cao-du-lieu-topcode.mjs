// cào tên, ảnh, giá và mô tả các source code ở trang chủ và trang top code của topcode.vn
// rồi lưu vào public/data/products.json
// chạy ở thư mục gốc project: node scripts/cao-du-lieu-topcode.mjs
import { writeFileSync } from 'fs';

const TRANG_GOC = 'https://topcode.vn';
const SO_CODE_TOI_DA = 24;

const layHtml = async (url) => {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (do an mon Lap trinh Front-End)' } });
  if (!res.ok) {
    console.log('Bỏ qua, không mở được trang', url, res.status);
    return '';
  }
  return await res.text();
};

// nghỉ 1 giây giữa các lần tải để không làm nặng máy chủ của trang
const nghi = () => new Promise((xong) => setTimeout(xong, 1000));

// bỏ thẻ html và đổi các ký tự mã hóa như &#225; &nbsp; về chữ bình thường
const layChu = (html) => {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#(\d+);/g, (kyTu, so) => String.fromCharCode(Number(so)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
};

// lấy giá trị đầu tiên khớp mẫu trong một đoạn html, không có thì trả về chuỗi rỗng
const timGiaTri = (html, mau) => {
  const ketQua = html.match(mau);
  return ketQua ? layChu(ketQua[1]) : '';
};

const chay = async () => {
  const trangChu = await layHtml(TRANG_GOC + '/');
  await nghi();
  const trangTopCode = await layHtml(TRANG_GOC + '/top-codes.htm');

  // mỗi sản phẩm trong danh sách là một thẻ li có itemtype là schema.org/Product
  const cacTheSanPham = (trangChu + trangTopCode).split('itemtype="http://schema.org/Product"').slice(1);

  const danhSachCode = [];
  for (const the of cacTheSanPham) {
    const maCode = timGiaTri(the, /itemprop="productID" content="(\d+)"/);
    const daCo = danhSachCode.some((code) => code.maCode === maCode);
    if (maCode === '' || daCo || danhSachCode.length >= SO_CODE_TOI_DA) {
      continue;
    }

    const link = TRANG_GOC + timGiaTri(the, /href='(\/source-code\/[^']+\.htm)'/);
    const anh = timGiaTri(the, /itemprop="image" src="([^"]+)"/);

    danhSachCode.push({
      id: 'CODE' + maCode,
      maCode: maCode,
      tenCode: timGiaTri(the, /<h2 itemprop="name"[^>]*>([\s\S]*?)<\/h2>/),
      anh: anh.startsWith('http') ? anh : TRANG_GOC + anh,
      moTa: '',
      ngonNgu: timGiaTri(the, /itemprop="category" content="([^"]+)"/),
      danhMuc: timGiaTri(the, /itemprop="material" content="([^"]+)"/),
      // giá trên trang tính bằng nghìn đồng, 450 nghĩa là 450.000đ
      phiTai: Number(timGiaTri(the, /itemprop="price" content="(\d+)"/)) * 1000,
      soSao: Number(timGiaTri(the, /itemprop="ratingValue" content="([\d.]+)"/)) || 0,
      soDanhGia: Number(timGiaTri(the, /itemprop="reviewCount" content="(\d+)"/)) || 0,
      luotXem: Number(timGiaTri(the, /class="view-count">(\d+)</)) || 0,
      nguoiBan: timGiaTri(the, /class="avt-sm"[^>]*\/>([\s\S]*?)<\/div>/),
      ngayDang: timGiaTri(the, /itemprop="productionDate" content="([\d-]+)T/),
      linkGoc: link,
    });
  }
  console.log('Lấy được', danhSachCode.length, 'code, đang lấy mô tả từng code');
  await nghi();

  // mô tả ngắn không có ở trang chủ, phải mở trang của từng code để lấy
  for (const code of danhSachCode) {
    const html = await layHtml(code.linkGoc);
    code.moTa = timGiaTri(html, /itemprop="description">([\s\S]*?)<\/h4>/);
    console.log('Đã lấy', code.maCode, '-', code.tenCode);
    await nghi();
  }

  const duLieu = {
    danhSachCode: danhSachCode,
  };
  writeFileSync('public/data/products.json', JSON.stringify(duLieu, null, 2) + '\n');
  console.log('Đã lưu', danhSachCode.length, 'code vào public/data/products.json');
};

chay();
