import React, { Fragment } from 'react';
import Users from '../user/Users';
import Search from '../user/Search';

const Home = () => {
    return (
        <Fragment>
            <Search />
            <Users />
        </Fragment>
    )
}

export default Home;
