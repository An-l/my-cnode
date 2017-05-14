import fetch from 'isomorphic-fetch'

export const REQUEST_TOPICS = 'REQUEST_TOPICS'
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS'
export const PUBLISH_TOPIC = 'PUBLISH_TOPIC'

export const SELECT_TAB = 'SELECT_TAB'

export const REQUEST_ARTICLE = 'REQUEST_ARTICLE'
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT = 'LOGOUT'

export const REQUEST_PROFILE = 'REQUEST_PROFILE'
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE'

export const GET_COLLECTED_TOPICS = 'GET_COLLECTED_TOPICS'

export const FETCH_MESSAGE = 'FETCH_MESSAGE'

// export const SELECT_PAGE= 'SELECT_PAGE'


// export const selectPage = page => ({
//   type:SELECT_PAGE,
//   page
// })

// HomePage
export const selectTab = tab => ({
    type: SELECT_TAB,
    tab
})

const requestTopics = tab => ({
    type: REQUEST_TOPICS,
    tab
})

const receiveTopics = (tab, topics, page, limit) => ({
    type: RECEIVE_TOPICS,
    tab,
    topics,
    page,
    limit
})

export const fetchTopics = (tab, page = 1, limit = 20) => {
    return dispatch => {
        dispatch(requestTopics(tab))
        fetch(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=${limit}`)
            .then(res => res.json())
            .then(json => dispatch(receiveTopics(tab, json.data, page, limit)))
    }
}

// ArticlePage
const requestArticle = topicId => ({
    type: REQUEST_ARTICLE,
    topicId
})

const receiveArticle = (topicId, article) => ({
    type: RECEIVE_ARTICLE,
    topicId,
    article
})

export const fetchArticle = (topicId) => {
    return dispatch => {
        dispatch(requestArticle(topicId))
        fetch(`https://cnodejs.org/api/v1/topic/${topicId}`)
            .then(res => res.json())
            .then(json => dispatch(receiveArticle(topicId, json.data)))
    }
}

// profile
const requestProfile = userName => ({
    type: REQUEST_PROFILE,
    userName
})
const receiveProfile = (userName, profile) => ({
    type: RECEIVE_PROFILE,
    userName,
    profile
})
// 获取用户收藏的主题
const getCollectedTopics = (userName) => {
    return dispatch => {
        fetch(`https://cnodejs.org/api/v1/topic_collect/${userName}`)
            .then(res => res.json())
            .then(json => dispatch({
                type: GET_COLLECTED_TOPICS,
                success: json.success,
                collectedTopics: json.data
            }))
    }
}
export const fetchProfile = (userName) => {
    return dispatch => {
        dispatch(requestProfile(userName));
        dispatch(getCollectedTopics(userName));
        fetch(`https://cnodejs.org/api/v1/user/${userName}`)
            .then(res => res.json())
            .then(json => dispatch(receiveProfile(userName, json.data)))
    }
}


// Login
const loginSucceed = (loginName, loginId, accessToken) => ({
    type: LOGIN_SUCCESS,
    loginName,
    loginId,
    accessToken
})
const loginFailed = (failedMessage) => ({
    type: LOGIN_FAILED,
    failedMessage
})
export const logout = () => ({
    type: LOGOUT
})

export const fetchAccess = accessToken => {
    return dispatch => {
        fetch('https://cnodejs.org/api/v1/accesstoken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `accesstoken=${accessToken}`
        })
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                dispatch(loginSucceed(json.loginname, json.id, accessToken))
            } else {
                dispatch(loginFailed(json.error_msg));
            }
        })
    }
}

// message
export const fetchMessage = (accesstoken) => {
    return dispatch => {
        fetch(`https://cnodejs.org/api/v1/messages?accesstoken=${accesstoken}`)
            .then(res => res.json())
            .then(json => dispatch({
                type: FETCH_MESSAGE,
                hasReadMessage: json.data.has_read_messages,
                hasNotReadMessage: json.data.hasnot_read_messages
            }))
    }
}