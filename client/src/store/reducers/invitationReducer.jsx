import {
    ACCEPT_INVITATIONS,
    ADD_INVITATION, DELETE_INVITATIONS,
    INIT_INVITATIONS,
    INVITATION_COUNTER,
    INVITATIONS, REJECT_INVITATIONS
} from "../dataMapping/invitations";
import {SESSION_ID} from "../dataMapping/session";

const initState = {
    profile: null,
    [INVITATIONS]: [],
    [INVITATION_COUNTER]: 0
};

const invitationReducer = (state = initState ,action)=>{
    switch (action.type) {
        case INIT_INVITATIONS:
            return {
                ...state,
                [INVITATIONS]: action.payload,
            };
        case ADD_INVITATION:
            return {
                ...state,
                [INVITATIONS]: [...state[INVITATIONS], action.payload],
            };
        case DELETE_INVITATIONS:
            let arr = state[INVITATIONS].filter((inv)=>{ return inv[SESSION_ID] !== action.payload;});
            return {
                ...state,
                [INVITATIONS]: arr
            };
        default:
            return state;
    }
};

export default invitationReducer;