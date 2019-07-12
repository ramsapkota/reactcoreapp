import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/AuthStore/Auth'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';


class SignIn extends React.Component {
    state = {
        username: '',
        password: ''
    }

    componentDidMount() {
        this.redirectToDashboard(this.props);
    }

    redirectToDashboard = (props) => {
        //if (props.auth.authenticated) {
        //    props.history.push('/');
        //}
    }
    componentDidUpdate() {
        this.redirectToDashboard(this.props);
    }

    handleSumbit = (e) => {
        e.preventDefault();
        if (this.state.username && this.state.password) {

            this.props.login(this.state)
        }
        else {
            alert('Fields cannot be balnk')
        }
    }
    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value })
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.handleSumbit}>
                    <FormGroup row>
                        <Label for="username" sm={2}>UserName</Label>
                        <Col sm={10}>
                            <Input type="text" autoFocus onChange={this.handleChange} name="username" id="username" placeholder="Username" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password" sm={2}>Password</Label>
                        <Col sm={10}>
                            <Input type="password" onChange={this.handleChange} name="password" id="password" placeholder="Password" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Button className="btn btn-primary btn-block">SigIn</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}



export default connect(
    state => state.auth,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(SignIn);
