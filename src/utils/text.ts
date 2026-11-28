export function boDau(s: string) {
    return (s || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase();
}

export function fmtGia(n: number) {
    return n > 0 ? Number(n).toLocaleString() + 'đ' : 'Miễn phí';
}

export function sao(n: number) {
    const r = Math.round(n || 0);
    return '★'.repeat(r) + '☆'.repeat(5 - r);
}
