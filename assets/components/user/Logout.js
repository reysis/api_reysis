import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { logout, reset } from '../../actions/user/authentication';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Logout extends Component {
    constructor(props){
        super(props);
        this.state = {
            scrolled: false,
            loading: true,
            logged: this.props.logged,
            error: null
        };
    }
    componentDidMount() {
        this.props.logoutUser();
    }

    /*componentWillReceiveProps(nextProps) {
        console.log("WILL RECIEVE PROPS ",nextProps.logged);
        if(this.props.logged !== nextProps.logged){
            this.setState({
                logged: nextProps.logged,
                loading: nextProps.loading,
                error: nextProps.error,
            })
        }
    }*/

    render() {
        if (!this.props.logged){
            return (
                <Redirect to='/'
                />
            );
        }
        return (
            <div>
            {!this.props.error && (
                <div className="alert alert-info" role="status">
                    Sesión cerrada satisfactoriamente...
                </div>
                )}
            </div>
        );
    }
}

Logout.propTypes = {};

const mapStateToProps = (state, ownProps) => {
    return {
        logged: ownProps.logged = state.user.auth.logged,
        error: ownProps.error = state.user.auth.error,
        loading: ownProps.loading = state.user.auth.loading,
    };
}

const mapDispatchToProps = (dispatch, ownProps) =>({
    logoutUser: () => dispatch(logout()),
    reset: () => dispatch(reset())
});

export default connect(mapStateToProps,mapDispatchToProps)(Logout);