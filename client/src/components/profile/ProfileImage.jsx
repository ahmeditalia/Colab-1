import React, {Component} from "react";
import {Button, Card, Image} from "react-bootstrap";
import ImageUpload from "./ImageUpload";
import {connect} from "react-redux";
import {USER_IMAGE, USERNAME} from "../../store/dataMapping/user";

class ProfileImage extends Component {


    state={
        uploadForm: false,
    };

    openUploadForm = ()=>{
        this.setState({uploadForm:true});
    };

    closeUploadForm = ()=>{
        this.setState({uploadForm:false});
    };

    render() {
        return(
            <Card className={"pictureCard"}>
                <Card.Header>User Picture</Card.Header>
                <Card.Body className={"Body"}>
                    <Button variant={"link"} onClick={this.openUploadForm}>
                        <Image
                            className={"myImage"}
                            roundedCircle
                            src={this.props.img.URL}
                        />
                    </Button>
                    <Card.Subtitle className="mt-2">{localStorage.getItem(USERNAME)}</Card.Subtitle>
                </Card.Body>
                <ImageUpload
                    show={this.state.uploadForm}
                    onHide={this.closeUploadForm}
                />
            </Card>
        );

    }
}

const mapStateToProps = (combinedReducers)=>{
    return {
        img: combinedReducers.profile.profile[USER_IMAGE]
    }
};


export default connect(mapStateToProps)(ProfileImage);