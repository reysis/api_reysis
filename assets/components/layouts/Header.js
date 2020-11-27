import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { NavLink } from "react-router-dom";
import { Image } from "react-bootstrap";

import NavigationBar from "./NavigationBar";

import LogoLetras from "../../assets/logo-letras.png";

const Header = () => {
	const loading = useSelector(state => state.auth.loading);
	const authenticated = useSelector(state => state.auth.authenticated);
	const user = useSelector(state => state.auth.user);
	const pathname = useSelector(state => state.router.location.pathname);

	const [scrolled, setScrolled] = useState(false);
	const [className, setClassName] = useState("header-container");

	useEffect(() => {
		window.addEventListener("scroll", () => {
			setScrolled(window.scrollY >= 50);
		});
		return () => {
			window.removeEventListener("scroll", () => {
				setScrolled(window.scrollY >= 50);
			});
		};
	}, []);

	useLayoutEffect(() => {
		setClassName(() => {
			const response = ["header-container", "header-minimized"];
			if (scrolled) response.push("header-shadow");
			if (scrolled || pathname != "/") response.push("fixed-top");
			return response.join(" ");
		});
	}, [scrolled, pathname]);

	return (
		<div className={className}>
			<NavLink to="/">
				<Image src={LogoLetras} className="logo-letras" />
			</NavLink>
			<NavigationBar
				pathname={pathname}
				username={user}
				authenticated={authenticated}
			/>
		</div>
	);
};

export default Header;
