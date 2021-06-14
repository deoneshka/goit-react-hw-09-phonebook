import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../redux/auth/auth-selectors';

/**
 * - Если маршрут приватный и пользователь залогинен, рендерит компонент
 * - В противном случае рендерит Redirect на /login
 */
export default function PrivateRoute({ redirectTo, children, ...routeProps }) {
    const isAuthenticated = useSelector(getIsAuthenticated);

    return (
        <Route {...routeProps}>
            {isAuthenticated ? children : <Redirect to={redirectTo} />}
        </Route>
    );
}
