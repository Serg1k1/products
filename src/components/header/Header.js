import { findProduct } from './headerSearchSlice';
import { useDispatch } from 'react-redux';

import './header.css';

const Header = () => {
    const dispatch = useDispatch();

    return (
        <header className="header">
            <div className="header__container">
                <label className="header__label" htmlFor="search">Search the product</label>
                <input onChange={e => dispatch(findProduct(e.target.value))} type="text" className="header__input" id="search" />
            </div>
        </header>
    );
}

export default Header;