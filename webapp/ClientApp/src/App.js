import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Todo from './components/Todo';
import SignIn from './components/Auth/SignIn';
import FetchData from './components/FetchData';

export default () => (
  <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/todos' component={Todo} />
        <Route exact path='/SignIn' component={SignIn} />
        <Route exact path='/fetchApi:1' component={FetchData} />
  </Layout>
);
