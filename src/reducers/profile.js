import { REQUEST_PROFILE, RECEIVE_PROFILE, GET_COLLECTED_TOPICS } from '../actions';

const profile = (state={isFetching: false}, action) => {
    switch (action.type) {
        case REQUEST_PROFILE:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_PROFILE:
            return {
                ...state,
                ...action.profile,
                isFetching: false
            }
        case GET_COLLECTED_TOPICS:
            return {
                ...state,
                collectedTopics: action.collectedTopics
            }
        default:
            return state;
    }
}

export default profile