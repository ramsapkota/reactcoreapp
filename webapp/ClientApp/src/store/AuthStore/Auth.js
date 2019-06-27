import axios from 'axios';
import setAuthorizationToken from './setAuthorizationToken';
import jwt from 'jsonwebtoken';
const setCurrentUser = 'SET_CURRENT_USER';
const jwtToken = 'jwtToken';

const initialState = {
    auth: {
        isAuthenticated: false,
        user: {

        }
    }
}

export const actionCreators = {

    login: data => async (dispatch) => {
        const url = '/api/Authenticate/request/';
        const response = await axios.post(url, data);
        const result = await response;
        localStorage.setItem(jwtToken, result.data)
        setAuthorizationToken(result)
        dispatch({ type: setCurrentUser, payload: jwt.decode(result.data) });
    },
    setCurrentUser: (jwtToken) => (dispatch) => {
        dispatch({ type: setCurrentUser, payload: jwtToken })
    }

};

export const reducer = (state = initialState, action) => {
    state = state || initialState;

    if (action.type === setCurrentUser) {
        const unique_name = JSON.parse(action.payload.unique_name);
        return {
            ...state,
            auth: {
                user: unique_name
            ,isAuthenticated: true
            }
        }
    }
    return state;
};
