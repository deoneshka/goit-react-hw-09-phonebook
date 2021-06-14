import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../redux/auth/auth-selectors';

/**
 * - Если маршрут ограниченный, и пользователь залогинен, рендерит редирект на /todos
 * - В противном случае рендерит компонент
 */
export default function PublicRoute({ redirectTo, children, ...routeProps }) {
    const isAuthenticated = useSelector(getIsAuthenticated);

    return (
        <Route {...routeProps}>
            {isAuthenticated && routeProps.restricted ? (
                <Redirect to={redirectTo} />
            ) : (
                children
            )}
        </Route>
    );
}
