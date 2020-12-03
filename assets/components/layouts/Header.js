import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { NavLink } from "react-router-dom";
import { Image } from "react-bootstrap";

import NavigationBar from "./NavigationBar";

import LogoLetras from "../../assets/logo-letras.png";
// import { useLocation, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import NavUser from "../NavUser";

const Header = () => {
	const loading = useSelector(state => state.auth.loading);
	const authenticated = useSelector(state => state.auth.authenticated);
	const user = useSelector(state => state.auth.user);

	const location = useSelector(state => state.router.location);
	const pathname = useSelector(state => state.router.location.pathname);
	const hash = useSelector(state => state.router.location.hash);

	// const location = useLocation()

	const [scrolled, setScrolled] = useState(false);
	const [className, setClassName] = useState("header-container");

	const backTopRef = useRef(null)

	let [timeoutId, setTimeoutId] = useState(null)

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

	useEffect(() => {
		if (backTopRef) {
			if (scrolled) {
				timeoutId && clearTimeout(timeoutId)
				setTimeoutId(() => setTimeout(() => {
					backTopRef.current.classList.remove('back-to-top__fade-in', 'd-none')
					backTopRef.current.classList.add('d-block')
				}, 1000))
			}
			else {
				timeoutId && clearTimeout(timeoutId)
				setTimeoutId(() => setTimeout(() => {
					backTopRef.current.classList.remove('back-to-top__fade-out', 'd-block')
					backTopRef.current.classList.add('d-none')
				}, 1000))
			}
		}
		return () => {
			timeoutId && clearTimeout(timeoutId)
		}
	}, [scrolled, backTopRef])

	useLayoutEffect(() => {
		setClassName(() => {
			const response = ["header-container", "header-minimized"];
			if (scrolled) response.push("header-shadow");
			if (scrolled || pathname != "/") response.push("fixed-top");
			return response.join(" ");
		});
	}, [scrolled, pathname]);

	useEffect(() => {
		pathname && window.scroll(0, 0)
	}, [pathname])

	useEffect(() => {
		const id = hash.substr(1)
		id && document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
	}, [location])

	const upClick = () => {
		document.getElementById('root').scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<div className={className}>
			<NavLink to={{ pathname: '/', hash: '#landing' }}>
				<Image src={LogoLetras} className="logo-letras" />
			</NavLink>
			<NavUser />
			<NavigationBar
				pathname={pathname}
				username={user}
				authenticated={authenticated}
			/>
			<div
				ref={backTopRef}
				className={`back-to-top ${scrolled ? 'back-to-top__fade-in' : 'back-to-top__fade-out'}`}
				onClick={upClick}
			>
				<a><FontAwesomeIcon icon={faArrowUp} /></a>
			</div>
		</div>
	);
};

export default Header;
