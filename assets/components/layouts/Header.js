import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import BrandContainer from './BrandContainer';
import Authentication from "./Authentication";
import { connect } from 'react-redux';
import { Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LogoLetras from "../../assets/logo-letras.png";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrolled: false,
            loading: true,
            logged: this.props.logged,
            error: null,
            pathname: this.props.pathname
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.logged !== nextProps.logged) {
            this.setState({
                ...this.state,
                logged: nextProps.logged,
                loading: nextProps.loading,
                error: nextProps.error,
            })
        }
        if ( this.props.pathname !== nextProps.pathname ) {
            this.setState({
                ...this.state, 
                pathname: nextProps.pathname
            })
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            let scrolled = 200;
            if (this.state.pathname != "/")
                scrolled = 50;
            const isTop = window.scrollY < scrolled;
            isTop !== true ? this.setState({ scrolled: true }) : this.setState({ scrolled: false });
        })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', () => {
            let scrolled = 200;
            if (this.state.pathname != "/")
                scrolled = 50;
            const isTop = window.scrollY < scrolled;
            isTop !== true ? this.setState({ scrolled: true }) : this.setState({ scrolled: false });
        });
    }
    
    render() {
        if(this.props.pathname != "/") {
            return (
                <div className={(this.state.scrolled) ? "header-minimized fixed-top header-container": "fixed-top header-container"}>
                    <NavLink to="/"><Image src={LogoLetras} className="logo-letras" /></NavLink>
                    <NavigationBar loggedUser={this.state.logged} />
                </div>
            )
        }
        return (
            <div className={(this.state.scrolled) ? "header-minimized fixed-top header-container" : "header-container"}>
                <NavLink to="/"><Image src={LogoLetras} className="logo-letras" /></NavLink>
                <NavigationBar loggedUser={this.state.logged} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {
        error,
        logged,
        loading
    } = state.user.auth;

    const pathname = state.router.location.pathname;

    return { error, logged, loading, pathname };
}

export default connect(mapStateToProps, null)(Header);