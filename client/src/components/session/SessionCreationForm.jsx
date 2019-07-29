import React, { Component } from 'react';
import {Button, Form, FormControl, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {createSession} from "../../store/actions/sessionActions/createSessionAction";
import {SESSION_DESCRIPTION, SESSION_PRIVACY, SESSION_NAME, SESSION_ID, SESSION} from "../../store/dataMapping/session";
import {CLOSE_FORM, SESSION_CREATION_FORM} from "../../store/dataMapping/form";
import {JOIN_SESSION} from "../../store/dataMapping/serverURLs";
import {SESSION_IMAGE, USER_IMAGE} from "../../store/dataMapping/user";

class SessionCreationForm extends Component {

    state={
        [SESSION_NAME]: "",
        [SESSION_DESCRIPTION]: "",
        [SESSION_PRIVACY]: null,
        [SESSION_IMAGE]: null
    };

    changeState = (e)=>{
        this.setState({[e.target.id]: e.target.value});
    };

    createSession = (e)=>{
        if(e.currentTarget.checkValidity()) {
            e.preventDefault();
            this.props.createSession(this.state,()=>{
                this.props.closeSessionCreator();
                this.props.history.push(JOIN_SESSION + this.props.session[SESSION_ID]);
            });
        }
    };

    changeImage = (e)=>{
        this.setState({[SESSION_IMAGE]: e.target.files[0]})
    };

    render() {
        return (
            <Modal {...this.props} style={{color:"black"}} show={this.props.display} onHide={this.props.closeSessionCreator} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                         Create Session
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id={"create_session_form"} validated={true} onSubmit={this.createSession}>
                        <Form.Group controlId={SESSION_NAME}>
                            <Form.Label>Session Name</Form.Label>
                            <Form.Control required cols="16" maxlength="16" type="text" placeholder="Session Name" onChange={this.changeState}/>
                        </Form.Group>
                        <Form.Group controlId={SESSION_DESCRIPTION}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control required as={"textarea"} style={{resize:"none"}} rows="4" cols="128" maxlength="128"  type="text" placeholder="Description" onChange={this.changeState}/>
                        </Form.Group>
                        <Form.Group inline>
                            <Form.Check inline required  custom={true} value={"private"}
                                        id ={"private"} type="radio" label="Private" name={SESSION_PRIVACY}
                                        onClick={()=> this.setState({[SESSION_PRIVACY]: "private"})}/>
                            <Form.Check inline required  custom={true} value={"public"}
                                        id ={"public"} type="radio" label="Public" name={SESSION_PRIVACY}
                                        onClick={()=> this.setState({[SESSION_PRIVACY]: "public"})}/>
                            <Form.Check inline required  custom={true} value={"hidden"}
                                        id ={"hidden"} type="radio" label="Hidden" name={SESSION_PRIVACY}
                                        onClick={()=> this.setState({[SESSION_PRIVACY]: "hidden"})}/>
                        </Form.Group>
                        <Form.Group>
                            <FormControl variant={"dark"} id={SESSION_IMAGE} type={"file"} onChange={this.changeImage}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button form={"create_session_form"} type={"submit"} variant={"success"}>Create</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
const mapStateToProps = (combinedReducer)=>{
    return{
        session: combinedReducer.sessionData[SESSION],
        display: combinedReducer.forms[SESSION_CREATION_FORM]
    }
};
const mapDispatchTpProps = (dispatch)=>{
    return {
        createSession: (sessionInfo,callback)=> dispatch(createSession(sessionInfo,callback)),
        closeSessionCreator: ()=> dispatch({type:SESSION_CREATION_FORM, payload: CLOSE_FORM})

    }
};

export default connect(mapStateToProps,mapDispatchTpProps)(withRouter(SessionCreationForm));