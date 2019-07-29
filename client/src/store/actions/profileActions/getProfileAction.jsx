import axios from "axios";
import {USER_IMAGE, PROFILE_RETRIEVAL_ERROR, PROFILE_RETRIEVED, USERNAME} from "../../dataMapping/user";
import {GET_PROFILE_INFO, GET_PROFILE_PIC} from "../../dataMapping/serverURLs";


export const getProfile = (callback) => {
    return (dispatch)=>{
        axios.get(GET_PROFILE_INFO + localStorage.getItem(USERNAME))
            .then((res)=> {
                const user = {
                    ...res.data.user,
                    [USER_IMAGE]:{
                        URL: GET_PROFILE_PIC + localStorage.getItem(USERNAME)
                    }
                };
                dispatch({type: PROFILE_RETRIEVED, payload: user});
            })
            .then(() => callback())
            .catch((error) => dispatch({type: PROFILE_RETRIEVAL_ERROR, payload: error.response.data.auth}))
    }
};