import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import BrandContainer from './BrandContainer';
import {connect} from 'react-redux';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            scrolled: false,
            loading: true,
            logged: {},
            error: null
        };
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.logged !== nextProps.logged){
            this.setState({
                logged: nextProps.logged,
                loading: nextProps.loading,
                error: nextProps.error,
            })
        }
    }

    componentDidMount(){
        window.addEventListener('scroll', () =>{
            const isTop = window.scrollY < 300;
            isTop !== true ? this.setState({scrolled: true}) : this.setState({scrolled: false});
        })
    }

    componentWillUnmount(){
        window.removeEventListener('scroll',() =>{
            const isTop = window.scrollY < 300;
            isTop !== true ? this.setState({scrolled: true}) : this.setState({scrolled: false});
        });
    }
    render() {
        return (
            <div className={this.state.scrolled ? "fixed-top header" : "header"}>
                <div className="n-container">
                    <BrandContainer scrolled={this.state.scrolled}/>
                    <NavigationBar loggedUser={this.state.logged}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    const{
        error,
        logged,
        loading
    } = state.user.login;
    return {error, logged, loading};
}

export default connect(mapStateToProps, null)(Header);