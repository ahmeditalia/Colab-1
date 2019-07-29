import React, {Component} from "react";
import ProfileImage from "./ProfileImage";
import {getProfile} from "../../store/actions/profileActions/getProfileAction";
import ProfileInfo from "./ProfileInfo";
import {connect} from "react-redux";
import { Form, Spinner} from "react-bootstrap";
import {updateProfile} from "../../store/actions/profileActions/updateProfileAction";
import requireAuth from "../authentication/requireAuth";

class UserProfile extends Component {

    state ={
        validated: false,
        loaded: false
    };

    componentWillMount() {
        this.props.getProfile(()=>{
            this.setState({loaded:true})
        });
    }
    componentWillUnmount() {
        this.setState({loaded:false})
    }

    saveChanges = (e)=>{
        e.preventDefault();
        if(e.currentTarget.checkValidity()) {
            this.props.updateProfile(this.props.user, this.props.history);
        }
        this.setState({validated: true});
    };

    render() {
        if(!this.state.loaded && !this.props.user) {
            return <div className={"loading"}>
                <Spinner animation={"border"}/>
            </div>;
        }
        else{
            return (
                <Form id={"profile_form"} className={"profile"} onSubmit={this.saveChanges} noValidate validated={this.state.validated}>
                    <ProfileImage/>
                    <ProfileInfo/>
                </Form>
            )}
    }
}

const mapStateToProps = (combinedReducers)=>{
    return {
        user: combinedReducers.profile.profile
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        getProfile: (callback)=> dispatch(getProfile(callback)),
        updateProfile: (profile,history)=> dispatch(updateProfile(profile,history))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(requireAuth(UserProfile));