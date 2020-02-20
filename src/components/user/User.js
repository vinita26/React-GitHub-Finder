import React, { useEffect, useContext, Fragment } from 'react'
import Spinner from '../layouts/Spinner';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom'
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {

    const githubContext = useContext(GithubContext);
    const { user, loading, getUser, getUserRepos, repos } = githubContext;

    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        // eslint-disable-next-line
    }, []);

    const {
        name,
        login,
        avatar_url,
        html_url,
        followers,
        following,
        company,
        hireable,
        location,
        bio,
        blog,
        public_repos,
        public_gists
    } = user;

    if (loading) return <Spinner />

    return (
        <Fragment>
            <Link to='/' className="btn btn-dark">Back to Search</Link>
            Hireable: {' '}
            {hireable ? <i className="fas fa-check text-success">YES</i> : <i className="fas fa-times-circle text-danger">NO</i>}

            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} alt="" className="round-img" style={{ width: '150px' }} />
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio: </h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url} className="btn btn-dark my-1">Visit Github profile</a>

                    <ul>
                        <li>
                            {login && <Fragment>
                                <strong>Username : {login}</strong>
                            </Fragment>}
                        </li>
                        <li>
                            {company && <Fragment>
                                <strong>Company : {company}</strong>
                            </Fragment>}
                        </li>
                        <li>
                            {blog && <Fragment>
                                <strong>Website : {blog}</strong>
                            </Fragment>}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge badge-danger">Public Repos: {public_repos}</div>
                <div className="badge badge-dark">Public Gists: {public_gists}</div>
            </div>

            <Repos repos={repos} />
        </Fragment>);
}

export default User
