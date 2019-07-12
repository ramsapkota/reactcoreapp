import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Todo from './components/Todo';
import SignIn from './components/Auth/SignIn';
import FetchData from './components/FetchData';
import { connect } from 'react-redux';
import { actionCreators } from './store/AuthStore/Auth';
import { bindActionCreators } from 'redux';
import AuthRoute from './components/BackEnd/AuthRoute';


class App extends React.Component {
    render() {
        console.log(this.props.auth.getState())
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route exact path='/todos' component={Todo} />
                <Route exact path='/fetchApi:1' component={FetchData} />
                <AuthRoute exat path='/SignIn' component={SignIn} authenticated={true}/>
            </Layout>
        )
    }
}

export default App;
//connect(
//    state => state.auth,
//    dispatch => bindActionCreators(actionCreators, dispatch)
//)(App);
