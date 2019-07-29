import axios from "axios";
import {GET_INVITATIONS} from "../../dataMapping/serverURLs";
import {MY_INVITATIONS_RETRIEVED} from "../../dataMapping/session";

export const getInvitations = (callback)=>{
    return (dispatch)=>{
        axios.get(GET_INVITATIONS , {headers: {'Authorization': "bearer " + localStorage.getItem('user')}})
            .then((res)=> dispatch({type:MY_INVITATIONS_RETRIEVED, payload: res.data.sessions}))
            .then(()=> callback())
            .catch(()=> console.log("invitation error"))
    };

};