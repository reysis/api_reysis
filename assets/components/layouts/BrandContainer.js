import React from 'react'
import Logo from '../../assets/Logo.png';
import {Link, NavLink} from "react-router-dom";
import SVG from 'react-inlinesvg';
import {Image} from "react-bootstrap";
import LogoLetras from "../../assets/logo-letras.png";

export default function BrandContainer({scrolled}) {
    return (
        <div className="brand-container">
            <NavLink to="/"><Image src={LogoLetras} className="logo-letras"/></NavLink>
        </div>
    )
}
