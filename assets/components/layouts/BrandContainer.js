import React from 'react'
import Logo from '../../assets/Logo.png';
import {Link} from "react-router-dom";
import SVG from 'react-inlinesvg';

export default function BrandContainer({scrolled}) {
    return (
        <div className="ml-auto">
            <Link to='/' className={scrolled ? "logo-small navbar-brand" : "navbar-brand"}>
                <img src={Logo} color="red"/>
            </Link>
        </div>
    )
}
