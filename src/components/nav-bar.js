import React from 'react';
import {Link, useLocation} from 'react-router-dom';

function NavBar() {
    const currentRoute = useLocation();

    const getLinkClass = (route) => {
        if(route === currentRoute.pathname) {
            return "nav-link active"
        }
        return "nav-link"
    }

    return (
        <div className={'card-header'}>
            <ul className="nav nav-pills card-header-pills">
                <li className="nav-item">
                    <Link className={getLinkClass('/')} to={'/'}>{'Home'}</Link>
                </li>
                <li className="nav-item">
                    <Link className={getLinkClass('/account')} to={'/account'}>{'Account'}</Link>
                </li>
                <li className="nav-item">
                    <Link className={getLinkClass('/deposit')} to={'/deposit'}>{'Deposit'}</Link>
                </li>
                <li className="nav-item">
                    <Link className={getLinkClass('/withdraw')} to={'/withdraw'}>{'Withdraw'}</Link>
                </li>
                <li className="nav-item">
                    <Link className={getLinkClass('/data')} to={'/data'}>{'Data'}</Link>
                </li>
            </ul>
        </div>
    );
}

export default NavBar;
