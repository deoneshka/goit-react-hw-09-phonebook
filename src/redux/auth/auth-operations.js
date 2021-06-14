import axios from 'axios';
import {
    registerRequest,
    registerSuccess,
    registerError,
    logInRequest,
    logInSuccess,
    logInError,
    logOutRequest,
    logOutSuccess,
    logOutError,
    getCurrentUserRequest,
    getCurrentUserSuccess,
    getCurrentUserError
} from './auth-actions';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
    set(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset() {
        axios.defaults.headers.common.Authorization = '';
    }
};

const register = credentials => async dispatch => {
    dispatch(registerRequest());

    try {
        const r = await axios.post('/users/signup', credentials);
        token.set(r.data.token);
        dispatch(registerSuccess(r.data));
    } catch (error) {
        dispatch(registerError(error.message));
    };
};

const logIn = credentials => async dispatch => {
    dispatch(logInRequest());

    try {
        const r = await axios.post('/users/login', credentials);
        token.set(r.data.token);
        dispatch(logInSuccess(r.data));
    } catch (error) {
        dispatch(logInError(error.message));
    };
};

const logOut = () => async dispatch => {
    dispatch(logOutRequest());

    try {
        await axios.post('/users/logout');
        token.unset();
        dispatch(logOutSuccess());
    } catch (error) {
        dispatch(logOutError(error.message));
    };
};

const getCurrentUser = () => async (dispatch, getState) => {
    const {
        auth: { token: persistedToken }
    } = getState();

    if (!persistedToken) {
        return;
    };

    token.set(persistedToken);

    dispatch(getCurrentUserRequest());

    try {
        const r = await axios.get('/users/current');
        dispatch(getCurrentUserSuccess(r.data));
    } catch (error) {
        dispatch(getCurrentUserError(error.message))
    };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { register, logIn, logOut, getCurrentUser };