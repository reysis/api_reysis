import React from 'react';
import {useSelector} from "react-redux";
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    const authenticated = useSelector(state=> state.auth.authenticated);
    return (
        <Route
            {...rest}
            render={(props) => authenticated === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
            }
        />
    )
};

export default PrivateRoute;
