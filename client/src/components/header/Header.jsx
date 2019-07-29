import React,{Component} from 'react';
import {Button, ButtonToolbar, Nav, Navbar} from "react-bootstrap";
import SignUp from "../authentication/SignUp";
import SignIn from "../authentication/SignIn";
import SearchBar from "./SearchBar";
import UserPanel from "./UserPanel";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {DASHBOARD_URL, HOME_URL} from "../../store/dataMapping/URL";
import {OPEN_FORM, SIGN_IN_FORM, SIGN_UP_FORM} from "../../store/dataMapping/form";

class Header extends Component {


    loggedInUserView = ()=>{
        return (
            <Nav>
                <SearchBar/>
                <UserPanel/>
            </Nav>
        );
    };

    loggedOutUserView = ()=>{
        return (
            <ButtonToolbar>
                <Button style={{color:"white"}} variant={"link mr-2"} onClick={this.props.openSignUp}>Sign Up</Button>
                <Button style={{color:"white"}} variant={"link mr-2"} onClick={this.props.openSignIn}>Sign In</Button>
                <SignUp/>
                <SignIn/>
            </ButtonToolbar>
        );
    };

    render()
    {
        return(
            <Navbar style={{borderBottom: "1px solid white"}} sticky="top">
                <Navbar.Brand href="/Home">
                    <img
                        alt=""
                        src={process.env.PUBLIC_URL + "/images/logo2.png"}
                        width="170"
                        height="45"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <NavLink style={{color:"white"}} className={"nav-link"} to={HOME_URL}>Home</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink style={{color:"white"}} className={"nav-link"} to={DASHBOARD_URL}>Dashboard</NavLink>
                        </Nav.Item>
                    </Nav>
                    {this.props.authenticated ? this.loggedInUserView(): this.loggedOutUserView()}
                </Navbar.Collapse>
            </Navbar>

        );

    }
}

const mapStateToProps = (state)=>{
    return{
        authenticated: state.auth.authenticated,
    }
};

const mapDispatchToProps = (dispatch)=>{
    return{
        openSignIn: ()=> dispatch({type:SIGN_IN_FORM, payload: OPEN_FORM}),
        openSignUp: ()=> dispatch({type:SIGN_UP_FORM, payload: OPEN_FORM}),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Header);