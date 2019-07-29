import axios from "axios";
import { REJECT_SESSION_URL} from "../../dataMapping/serverURLs";
import {DELETE_INVITATIONS} from "../../dataMapping/invitations";

export const rejectInvitation = (sessionId)=>{
    return (dispatch)=>{
        axios.get(REJECT_SESSION_URL + sessionId, {headers: {'Authorization': "bearer " + localStorage.getItem('user')}})
            .then(()=> dispatch({type: DELETE_INVITATIONS, payload: sessionId}))
            .catch(()=> console.log("reject invitation error"))
    };

};