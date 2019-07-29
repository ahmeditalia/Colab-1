import axios from "axios";
import {
    EMAIL,
    FIRST_NAME,
    USER_IMAGE,
    LAST_NAME,
    NEW_PASSWORD,
    OLD_PASSWORD,
    PROFILE_UPDATE_ERROR,
    PROFILE_UPDATED
} from "../../dataMapping/user";
import {DASHBOARD_URL} from "../../dataMapping/URL";
import {UPDATE_PROFILE} from "../../dataMapping/serverURLs";


export const updateProfile = (profile,history)=>{
    return (dispatch)=>{
        const data = new FormData();
        data.append(FIRST_NAME, profile[FIRST_NAME]);
        data.append(LAST_NAME, profile[LAST_NAME]);
        data.append(OLD_PASSWORD, profile[OLD_PASSWORD]);
        data.append(NEW_PASSWORD, profile[NEW_PASSWORD]);
        data.append(EMAIL, profile[EMAIL]);
        data.append(USER_IMAGE, profile[USER_IMAGE].file);
        axios.post(UPDATE_PROFILE, data, {headers: {'Authorization': "bearer " + localStorage.getItem('user')}})
            .then(()=> {
                history.push(DASHBOARD_URL);
/*
                window.location.reload();
*/
                dispatch({type:PROFILE_UPDATED})
            })
            .catch(() => dispatch({type: PROFILE_UPDATE_ERROR}))

    }
};