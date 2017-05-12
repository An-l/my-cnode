import {
  REQUEST_ARTICLE, RECEIVE_ARTICLE
} from '../actions'

const article = (state={currentTopicId:''}, action) => {
    let stateItem = state[action.topicId] || {};
    switch (action.type) {
        case REQUEST_ARTICLE:
            stateItem = {
                ...stateItem,
                isFetching: true
            }
            return {
                ...state,
                [action.topicId]: stateItem,
                currentTopicId: action.topicId
            }
        case RECEIVE_ARTICLE:
            stateItem = {
                ...stateItem,
                isFetching: false,
                article: action.article
            }
            return {
                ...state,
                [action.topicId]: stateItem
            }
        default:
            return state;
    }
}

export default article;