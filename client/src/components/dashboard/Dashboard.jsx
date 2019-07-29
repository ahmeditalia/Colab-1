import React, { Component } from 'react';
import DashboardCard from "./DashboardCard";
import {CardColumns, Spinner} from "react-bootstrap";
import {connect} from "react-redux";
import {getPublicSessions} from "../../store/actions/sessionActions/getPublicSessionsAction";
import {PUBLIC_SESSIONS} from "../../store/dataMapping/session";


class Dashboard extends Component{


    componentDidMount() {
        this.props.getSessions();
    }

    render() {

        if (!this.props[PUBLIC_SESSIONS])
            return <div className={"loading"}>
                <Spinner animation={"border"}/>
            </div>;
        else return (
            <CardColumns>
                {this.props[PUBLIC_SESSIONS].map((session) => <DashboardCard session={session}/>)}
            </CardColumns>
        );
    }
}


const mapStateToProps = (combineReducers)=>{
    return {
        [PUBLIC_SESSIONS]: combineReducers.sessionStorage[PUBLIC_SESSIONS]
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        getSessions: ()=> dispatch(getPublicSessions(""))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);