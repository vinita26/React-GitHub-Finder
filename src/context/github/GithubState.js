import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    GET_USER,
    GET_REPOS,
    SET_LOADING,
    CLEAR_USERS
} from '../types';

let gitHubClientId;
let gitHubClientSecret;

if (process.env.NODE_ENV !== "production") {
    gitHubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    gitHubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
} else {
    gitHubClientId = process.env.GITHUB_CLIENT_ID;
    gitHubClientSecret = process.env.GITHUB_CLIENT_SECRET
}
const GithubState = props => {
    const initialState = {
        users: [],
        user: [],
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    //search users
    const searchUsers = async text => {
        setLoading();

        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${gitHubClientId}&client_secret=${gitHubClientSecret}`);

        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
    }

    //Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    //Clear Users
    const clearUsers = () => { dispatch({ type: CLEAR_USERS, payload: [] }) }

    //Get single user
    const getUser = async (username) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${gitHubClientId}&client_secret=${gitHubClientSecret}`);
        dispatch({
            type: GET_USER,
            payload: res.data
        })

    }

    //Get Repo Details
    const getUserRepos = async (username) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created;asc&cliclient_id=${gitHubClientId}&client_secret=${gitHubClientSecret}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    }



    return (<GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            loading: state.loading,
            repos: state.repos,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}
    >

        {props.children}
    </GithubContext.Provider >
    )
}

export default GithubState;
