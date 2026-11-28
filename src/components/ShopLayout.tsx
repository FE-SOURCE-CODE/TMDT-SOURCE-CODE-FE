import { Outlet } from 'react-router-dom';
import ShopNav from './ShopNav';

function ShopLayout() {
    return (
        <div className="shop-root">
            <ShopNav />
            <Outlet />
        </div>
    );
}

export default ShopLayout;
