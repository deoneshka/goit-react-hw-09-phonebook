import React, { Suspense, lazy, useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import routes from './routes';
import AppBar from './Components/AppBar';
import authOperations from './redux/auth/auth-operations';
import PrivateRoute from './Components/PrivateRoute';
import PublicRoute from './Components/PublicRoute';
import './App.css';

const HomeView = lazy(() => import('./views/HomeView'));
const RegisterView = lazy(() => import('./views/RegisterView'));
const LoginView = lazy(() => import('./views/LoginView'));
const ContactsView = lazy(() => import('./views/ContactsView'));

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authOperations.getCurrentUser());
    }, [dispatch]);

    const { home, register, contacts, login } = routes;

    return (
        <>
            <AppBar />
            <Suspense fallback={<h3 className="loader">Loading...</h3>}>
                <Switch>
                    <PublicRoute exact path={home}>
                        <HomeView />
                    </PublicRoute>
                    <PublicRoute
                        path={register}
                        restricted
                        redirectTo={contacts}
                    >
                        <RegisterView />
                    </PublicRoute>
                    <PublicRoute path={login} restricted redirectTo={contacts}>
                        <LoginView />
                    </PublicRoute>
                    <PrivateRoute path={contacts} redirectTo={login}>
                        <ContactsView />
                    </PrivateRoute>
                    <Redirect to={home} />
                </Switch>
            </Suspense>
        </>
    );
}
