import React, {Component} from 'react';
import {Alert, Button} from "react-bootstrap";
import {HOME_URL} from "../../store/dataMapping/URL";


class ErrorPage extends Component {

    goToHomePage = ()=>{
        this.props.history.push(HOME_URL);
    };

    render() {
        return (
            <div className={"errorDiv mt-5"}>
                <h1>401</h1>
                <Alert className={"errorDiv"}>
                    <Alert.Heading>{/*Unauthorized Access*/}UNAUTHORIZED ACCESS</Alert.Heading>
                    <p>
                        Please log in before proceeding
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={this.goToHomePage} variant="outline-success">
                            HomePage
                        </Button>
                    </div>
                </Alert>
            </div>
        );
    }
}


export default ErrorPage;