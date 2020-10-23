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
            error: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.logged !== nextProps.logged) {
            this.setState({
                logged: nextProps.logged,
                loading: nextProps.loading,
                error: nextProps.error,
            })
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            const isTop = window.scrollY < 200;
            isTop !== true ? this.setState({ scrolled: true }) : this.setState({ scrolled: false });
        })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', () => {
            const isTop = window.scrollY < 200;
            isTop !== true ? this.setState({ scrolled: true }) : this.setState({ scrolled: false });
        });
    }
    render() {
        return (
            <div className={this.state.scrolled ? "fixed-top header-container" : "header-container"}>
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
    return { error, logged, loading };
}

export default connect(mapStateToProps, null)(Header);