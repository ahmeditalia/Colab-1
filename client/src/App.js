import React, { Component } from 'react';
import {BrowserRouter , Route , Switch} from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Session from "./components/session/Session";
import Header from "./components/header/Header";
import UserProfile from "./components/profile/UserProfile";
import ErrorPage from "./components/Error/ErrorPage";
import MySessions from "./components/session/MySessions";
import {connect} from "react-redux";
import {SIGN_IN_FORM} from "./store/dataMapping/form";
import {AUTHENTICATION_ERROR} from "./store/dataMapping/auth";


class App extends Component {



    render() {
        return (
            <BrowserRouter>
                <div style={{backgroundImage: this.props.backgroundImage,backgroundSize: "cover", height: "100%"}}>
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/error" component={ErrorPage}/>
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route exact path="/profile" component={UserProfile}/>
                        <Route exact path="/mysessions" component={MySessions}/>
                        <Route exact path="/sessions/join/:sessionId" component={Session}/>
{/*
                        <Route exact path="/reports/:sessionId/grades-pdf"/>
*/}
                    </Switch>
                </div>
            </BrowserRouter>
    );
  }
}
const mapStateToProps = (combinedReducer)=>{
    return{
        backgroundImage: combinedReducer.sockets.backgroundImage
    }
};

export default connect(mapStateToProps)(App);
