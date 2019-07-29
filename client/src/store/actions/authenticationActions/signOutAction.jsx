import {HOME_URL} from "../../dataMapping/URL";
import {DISCONNECT_FROM_DEFAULT_SOCKET} from "../../dataMapping/socket";

export const UNAUTHENTICATED = 'unauthenticated_user';

export const signOut = (history)=>{
    return (dispatch)=>{
        history.push(HOME_URL);
        dispatch({type: UNAUTHENTICATED});
        dispatch({type: DISCONNECT_FROM_DEFAULT_SOCKET});
        localStorage.clear();
    };
};