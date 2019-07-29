import React,{Component} from 'react';
import {Image, Modal, Row, Toast} from "react-bootstrap";
import {MDBIcon} from "mdbreact";
import requireAuth from "../authentication/requireAuth";
import {connect} from "react-redux";
import {SESSION_DESCRIPTION, SESSION_ID, SESSION_NAME, SESSION_OWNER} from "../../store/dataMapping/session";
import {GET_PROFILE_PIC, JOIN_SESSION} from "../../store/dataMapping/serverURLs";
import {DEFAULT_SOCKET} from "../../store/dataMapping/socket";
import {CLOSE_FORM, INVITATION_FORM} from "../../store/dataMapping/form";
import {DELETE_INVITATIONS, INVITATIONS} from "../../store/dataMapping/invitations";
import {rejectInvitation} from "../../store/actions/sessionActions/rejectInvitation";

class Invitations extends Component {

    rejectInvitation = (e)=>{
        this.props.rejectInvitation(e.target.name);
        console.log(this.props[INVITATIONS]);
    };

    acceptInvitation = (e)=>{
        this.props.acceptInvitation(e.target.name);
        console.log(this.props[INVITATIONS]);
    };

    render()
    {
        console.log(this.props[INVITATIONS]);

        return(
            <Modal style={{marginLeft:"80%",width:"270px",marginTop:"3.4%",maxHeight:"550px"}} show={this.props[INVITATION_FORM]} onHide={this.props.closeInvitations}>
                {
                    this.props[INVITATIONS] && this.props[INVITATIONS].map((inv)=>
                    <Toast className={"inv"} style={{color:"black"}} >
                        <Toast.Header style={{height:50}}>
                            <Row style={{width:"100%", marginLeft:-2}}>
                                <div style={{width:"60%", height:"40px"}}>
                                    <Image className={"invitationImage"} src={GET_PROFILE_PIC + inv[SESSION_OWNER]} style={{width:"50px", height:"50px",marginRight:-5}}/>
                                    <strong className={"invitationUser"} style={{color:"black"}}>{inv[SESSION_NAME]}</strong>
                                    <div style={{fontSize:12}}><MDBIcon icon="user" />{"  "+inv[SESSION_OWNER]}</div>
                                </div>
                                <div style={{paddingTop: "10px"}}>
                                    <a name={inv[SESSION_ID]} id={"accept"} onClick={this.acceptInvitation} href={JOIN_SESSION + inv[SESSION_ID]} style={{color:"green",fontSize:11,marginRight:4}}><MDBIcon icon="check" /> Accept</a>
                                    <a name={inv[SESSION_ID]} id={"reject"} onClick={this.rejectInvitation} style={{color:"red",fontSize:11,marginLeft:4}}><MDBIcon icon="times" /> Reject</a>
                                </div>
                            </Row>
                        </Toast.Header>
                        <Toast.Body show={null} style={{width:"100%"}}>
                            {inv[SESSION_DESCRIPTION]}
                        </Toast.Body>
                    </Toast>
                )};
            </Modal>
        );

    }
}

const mapStateTpProps=(combinedReducer)=>{
    return{
        socket: combinedReducer.sockets[DEFAULT_SOCKET],
        [INVITATIONS]: combinedReducer.invitations[INVITATIONS],
        [INVITATION_FORM]: combinedReducer.forms[INVITATION_FORM]
    };
};
const mapDispatchTpProps=(dispatch)=>{
    return{
        closeInvitations: ()=> dispatch({type:INVITATION_FORM, payload: CLOSE_FORM}),
        rejectInvitation: (sessionId)=> dispatch(rejectInvitation(sessionId)),
        acceptInvitation: (sessionId)=> dispatch({type: DELETE_INVITATIONS, payload: sessionId})
    };

};
export default connect(mapStateTpProps,mapDispatchTpProps)(requireAuth(Invitations));