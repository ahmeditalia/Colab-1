import React, {Component} from 'react';
import {Accordion, Button, Card, Col, Row, Spinner} from "react-bootstrap";
import {MDBIcon} from "mdbreact";
import requireAuth from "../authentication/requireAuth";
import {connect} from "react-redux";
import {
    MY_SESSIONS,
    SESSION_DESCRIPTION,
    SESSION_PRIVACY,
    SESSION_ID,
    SESSION_NAME, SESSION_OWNER, SESSION_USER_ROLE
} from "../../store/dataMapping/session";
import {getMySessions} from "../../store/actions/sessionActions/getMySessionsAction";
import {JOIN_SESSION} from "../../store/dataMapping/serverURLs";


class MySessions extends Component {

    state={
        loaded: false
    };

    componentDidMount() {
        this.props.getMySessions(()=>{
            this.setState({loaded: true});
        });
    }

    componentWillUnmount() {
        this.setState({loaded:false})
    }

    toUpperFirstLetter = (data)=>{
        return data.charAt(0).toUpperCase() + data.slice(1)
    };

    render() {
        if (!this.state.loaded) {
            return <div className={"loading"}>
                <Spinner animation={"border"}/>
            </div>;
        }else if(!this.props[MY_SESSIONS]) {
            return <div className={"loading"}>
                <h2>No Sessions</h2>
            </div>;
        }else return (
            <Accordion style={{marginTop: 30,color:"black"}}>
                {this.props[MY_SESSIONS].map((session)=>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={session[SESSION_ID]}>
                            <Row>
                                <Col md={{span:2}}>{session[SESSION_NAME]}</Col>
                                <Col md={{span:2,offset:8}}><MDBIcon icon="info-circle" />{"  More Information"}</Col>
                            </Row>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={session[SESSION_ID]} style={{paddingRight:"1%"}}>
                            <Row style={{marginTop:"1%", marginBottom:"1%"}}>
                                <Col md={{ span: 3}} style={{paddingLeft:"30px"}}>
                                    <h6> Description </h6>
                                    {session[SESSION_DESCRIPTION]}
                                </Col>
                                <Col md={{span: 1,offset:1}}>
                                    <h6> Owner </h6>
                                    {session[SESSION_OWNER]}
                                </Col>
                                <Col md={{span: 1,offset:1}}>
                                    <h6> Privacy </h6>
                                    {this.toUpperFirstLetter(session[SESSION_PRIVACY])}
                                </Col>
                                <Col md={{span: 1,offset:1}}>
                                    <h6> Role </h6>
                                    {this.toUpperFirstLetter(session[SESSION_USER_ROLE])}
                                </Col>
                                <Col md={{span: 1,offset:1}}>
                                    <Button href={JOIN_SESSION + session[SESSION_ID]} style={{fontSize: 18, background:"none",color:"black",border:"none"}}>
                                        <MDBIcon icon="sign-in-alt"/>{"  Join "}
                                    </Button>
                                </Col>
                            </Row>
                        </Accordion.Collapse>
                    </Card>
                )}
            </Accordion>
        );
    }
}

const mapStateTpProps=(combinedReducer)=>{
    return{
        [MY_SESSIONS]: combinedReducer.sessionStorage[MY_SESSIONS]
    };
};
const mapDispatchTpProps=(dispatch)=>{
    return{
        getMySessions: (callback)=> dispatch(getMySessions(callback))
    };

};

export default connect(mapStateTpProps,mapDispatchTpProps)(requireAuth(MySessions));