import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { logout, reset } from '../../actions/user/login';
import { connect } from "react-redux";
import {Redirect} from "react-router-dom";

class Logout extends Component {
    componentDidMount() {
        console.log(this.props.logoutUser());
    }

    componentWillReceiveProps(nextProps) {
        console.log("WILL RECIEVE PROPS ",nextProps.logged);
        if(this.props.logged !== nextProps.logged){
            this.setState({
                logged: nextProps.logged,
                loading: nextProps.loading,
                error: nextProps.error,
            })
        }
    }

    render() {
        if (!this.props.logged){
            return (
                <Redirect to='/'
                />
            );
        }
        return (
            <div>
            {this.props.loading && (
                <div className="alert alert-info" role="status">
                    Sesión cerrada satisfactoriamente...
                </div>
                )}
            </div>
        );
    }
}

Logout.propTypes = {};

const mapStateToProps = state => {
    const{
        logged,
        loading,
        error,
    } = state.user.login;
    return {logged, loading, error};
}

const mapDispatchToProps = dispatch =>({
    logoutUser: () => dispatch(logout()),
    reset: () => dispatch(reset())
});

export default connect(mapStateToProps,mapDispatchToProps)(Logout);