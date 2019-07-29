import React, {Component} from 'react';
import {Badge, Dropdown, Image, Modal} from "react-bootstrap";
import SessionCreationForm from "../session/SessionCreationForm";
import {connect} from "react-redux";
import {signOut} from "../../store/actions/authenticationActions/signOutAction";
import {withRouter} from "react-router-dom";
import {USERNAME} from "../../store/dataMapping/user";
import {MY_SESSIONS_URL, USER_PROFILE_URL} from "../../store/dataMapping/URL";
import {GET_PROFILE_PIC} from "../../store/dataMapping/serverURLs";
import {INVITATION_FORM, OPEN_FORM, SESSION_CREATION_FORM} from "../../store/dataMapping/form";
import {MDBIcon} from "mdbreact";
import {DEFAULT_SOCKET} from "../../store/dataMapping/socket";
import {ADD_INVITATION, INIT_INVITATIONS, INVITATIONS} from "../../store/dataMapping/invitations";
import Invitations from "./Invitations";

class UserPanel extends Component {

    componentDidMount() {
        const {socket} = this.props;
        if(socket)
        {
            socket.on("invited",(data)=>{
                this.props.addInvitation(data);
            });

            socket.on("init-invites",(data)=>{
                this.props.initInvitations(data);
                console.log(data);
            });
        }
    }

    mySessions = ()=>{
        this.props.history.push(MY_SESSIONS_URL);
    };

    logOut = ()=>{
        this.props.signOut(this.props.history);
    };

    profile = ()=>{
        this.props.history.push(USER_PROFILE_URL);
    };

    render() {
        return (
            <div>
            <Dropdown size="sm" className={"mr-5"}>
                <Image style={{border: "1px solid", padding: "3px", objectFit: "cover"}} roundedCircle src={GET_PROFILE_PIC+localStorage.getItem(USERNAME)+"?hash="+this.props.img} width={32}
                       height={32}/>
                <Dropdown.Toggle style={{color:"white"}} variant={"link"} className={"shadow-none"}>
                    <p style={{display: "inline"}}>{localStorage.getItem(USERNAME)}</p>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={this.mySessions}><MDBIcon icon="th-list" /> {" My Sessions"}</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.props.openInvitations} disabled={this.props[INVITATIONS].length === 0}>
                        <MDBIcon icon="user-plus" /> {" Invitations" }
                        <Badge variant="danger" style={{borderRadius:6,marginLeft:15}}>{this.props[INVITATIONS].length>0 ? this.props[INVITATIONS].length:""}</Badge>
                    </Dropdown.Item>
                    <Invitations/>
                    <Dropdown.Item as="button" onClick={this.props.openSessionCreator}><MDBIcon icon="plus" /> {" New Session"}</Dropdown.Item>
                    <SessionCreationForm/>
                    <Dropdown.Divider />
                    <Dropdown.Header>Account Settings</Dropdown.Header>
                    <Dropdown.Item as="button" onClick={this.profile}><MDBIcon icon="user-alt" />{" Profile"}</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.logOut}><MDBIcon icon="sign-out-alt" /> {" Sign Out"}  </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </div>
        );
    }
}
const mapStateToProps = (combinedReducer)=>{
    return {
        socket: combinedReducer.sockets[DEFAULT_SOCKET],
        img: combinedReducer.profile.img,
        [INVITATIONS]: combinedReducer.invitations[INVITATIONS],
    };
};

const mapDispatchToProps = (dispatch)=>{
    return {
        signOut: (history)=> dispatch(signOut(history)),
        openSessionCreator:  ()=> dispatch({type:SESSION_CREATION_FORM, payload: OPEN_FORM}),
        openInvitations:  ()=> dispatch({type:INVITATION_FORM, payload: OPEN_FORM}),
        addInvitation: (data)=> dispatch ({type:ADD_INVITATION, payload: data }),
        initInvitations: (data) => dispatch ({type:INIT_INVITATIONS, payload: data })
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UserPanel));