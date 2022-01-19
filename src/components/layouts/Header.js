import React from 'react';
import { NavLink } from 'react-router-dom';
import WalletMenuItem from './menu/WalletMenuItem';

const Header = () => {


    return (
        <>
            <div className="ui container header main-header">
                <div className="ui main menu">
                    <NavLink exact to="/" className="item" activeClassName="active">Home </NavLink>
                    <NavLink to="/create" className="item" activeClassName="active">Create New Collection</NavLink>
                    <NavLink to="/load" className="item" activeClassName="active">Load Existing Collection</NavLink>
                  
                    <div className="right menu">
                        <WalletMenuItem />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header