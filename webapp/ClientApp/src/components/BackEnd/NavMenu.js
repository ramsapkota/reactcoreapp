import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/AuthStore/Auth'
import { bindActionCreators } from 'redux';
import { NavItem, NavLink, Navbar, Container, NavbarToggler, Collapse, NavbarBrand } from 'reactstrap'


class NavMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        const GuestLinks = (
            <React.Fragment>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/SignIn">Sign In</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/SingUp">Sign Up</NavLink>
                </NavItem>
            </React.Fragment >
        );
        const AuthLinks = (
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/FetchData">Log Out</NavLink>
            </NavItem>
        )
        const { auth } = this.props;
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light >
                    <Container>
                        <NavbarBrand tag={Link} to="/">React-App</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                {auth.isAuthenticated ? AuthLinks : GuestLinks}
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}

export default connect(
    state => state.auth,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(NavMenu);
