import { FETCH_MESSAGE } from '../actions.js';

const message = (state={hasReadMessage:[], hasNotReadMessage:[]}, action) => {
    switch (action.type) {
        case FETCH_MESSAGE:
            return {
                ...state,
                hasReadMessage: action.hasReadMessage,
                hasNotReadMessage: action.hasNotReadMessage
            }
        default:
            return state;
    }
}

export default message