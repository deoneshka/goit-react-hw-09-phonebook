import { combineReducers } from "redux";
import { createReducer } from '@reduxjs/toolkit';
import {
    registerSuccess,
    registerError,
    logInSuccess,
    logInError,
    logOutSuccess,
    logOutError,
    getCurrentUserSuccess,
    getCurrentUserError
} from './auth-actions';

const initialUserState = { name: null, email: null };

const setUser = (_, { payload }) => payload.user;
const setToken = (_, { payload }) => payload.token;
const setPayload = (_, { payload }) => payload;

const user = createReducer(initialUserState, {
    [registerSuccess]: setUser,
    [logInSuccess]: setUser,
    [logOutSuccess]: () => initialUserState,
    [getCurrentUserSuccess]: setPayload
});

const token = createReducer(null, {
    [registerSuccess]: setToken,
    [logInSuccess]: setToken,
    [logOutSuccess]: () => null
});

const error = createReducer(null, {
    [registerError]: setPayload,
    [logInError]: setPayload,
    [logOutError]: setPayload,
    [getCurrentUserError]: setPayload
});

const isAuthenticated = createReducer(false, {
    [registerSuccess]: () => true,
    [logInSuccess]: () => true,
    [getCurrentUserSuccess]: () => true,
    [registerError]: () => false,
    [logInError]: () => false,
    [getCurrentUserError]: () => false,
    [logOutSuccess]: () => false
});

export default combineReducers({
    user,
    isAuthenticated,
    token,
    error
});