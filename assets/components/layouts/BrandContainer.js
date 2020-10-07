import React from 'react'
import Logo from '../../assets/logo.svg';
import {Link} from "react-router-dom";
import SVG from 'react-inlinesvg';

export default function BrandContainer({scrolled}) {
    return (
        <Link to='/' className={scrolled ? "logo-small navbar-brand" : "navbar-brand"}>
            <img src={Logo} />
        </Link>
    )
}
