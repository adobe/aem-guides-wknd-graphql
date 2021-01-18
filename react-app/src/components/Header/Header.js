import React from 'react';
import logo from '../../images/wknd-logo-dk.svg';

export default function Header(props) {
    return (
        <header>
            <img src={logo} className="logo" alt={props.alt}/>
            <hr />
        </header>
    );
}