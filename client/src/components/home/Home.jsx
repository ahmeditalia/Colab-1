import React, {Component} from 'react';
import {Col, Dropdown, Modal, Row} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Invitations from "../header/Invitations";
import YouTube from "react-youtube";
import {CLOSE_FORM, SIGN_IN_FORM} from "../../store/dataMapping/form";
import {AUTHENTICATION_ERROR, CLEAR_SIGN_IN_ERROR} from "../../store/dataMapping/auth";
import {signIn} from "../../store/actions/authenticationActions/signInAction";
import {connect} from "react-redux";


class Home extends Component {

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    componentWillMount() {
        this.props.changeBackGroundImage("backgroundImage","url('colab15.jpg')");
    }

    componentWillUnmount() {
        this.props.changeBackGroundImage("backgroundImage","");
    }

    render() {
        const opts = {
            height: '310',
            width: '520',
            playerVars: {
                autoplay: 1
            }
        };

        return (
            <div>
                <Container style={{marginTop:100}}>
                    <Row>
                        <Col sm={{span: 5}} style={{marginTop: 50}}>
                            <h1>About Us</h1>
                            <p style={{fontSize: 26}}>
                                Passionate students aiming to improve collaborative editing with an easy to use
                                and extendable tool
                            </p>
                        </Col >
                        <Col sm={{span:6}} style={{paddingLeft:117}}>
                            {/*<YouTube*/}
                            {/*    videoId="2g811Eo7K8U"*/}
                            {/*    opts={opts}*/}
                            {/*    onReady={this._onReady}*/}
                            {/*/>*/}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch)=>{
    return{
        changeBackGroundImage: (type, value)=> dispatch({type: type, payload:value})
    };
};

export default connect(null,mapDispatchToProps)(Home);