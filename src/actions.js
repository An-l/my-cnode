import fetch from 'isomorphic-fetch'

export const REQUEST_TOPICS = 'REQUEST_TOPICS'
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS'
export const PUBLISH_TOPIC = 'PUBLISH_TOPIC'

export const SELECT_TAB= 'SELECT_TAB'

export const REQUEST_ARTICLE = 'REQUEST_ARTICLE'
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE'

// export const SELECT_PAGE= 'SELECT_PAGE'


// export const selectPage = page => ({
//   type:SELECT_PAGE,
//   page
// })

// HomePage
export const selectTab = tab => ({
  type:SELECT_TAB,
  tab
})

const requestTopics = tab => ({
  type:REQUEST_TOPICS,
  tab
})

const receiveTopics = (tab, topics, page, limit) => ({
  type:RECEIVE_TOPICS,
  tab,
  topics,
  page,
  limit
})

export const fetchTopics = (tab,page=1,limit=20) => {
  return dispatch => {
    dispatch(requestTopics(tab))
    fetch(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=${limit}`)
    .then(res => res.json())
    .then(json => dispatch(receiveTopics(tab, json.data, page, limit)))
  }
}

// ArticlePage
const requestArticle = topicId => ({
  type:REQUEST_ARTICLE,
  topicId
})

const receiveArticle = (topicId, article) => ({
  type:RECEIVE_ARTICLE,
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
