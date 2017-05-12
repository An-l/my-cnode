import {
  SELECT_TAB, RECORD_SCROLLT,
  REQUEST_TOPICS, RECEIVE_TOPICS
} from '../actions'

let initState = {
    selectedTab: 'all',
    tabData: {}
}


const selectedTab = (tab, action) => {
    switch (action.type) {
        case SELECT_TAB:
            return action.tab
        default:
            return tab
    }
}

// 当组件第一次发出REQUEST_TOPICS后，需要对其返回的state进行初始化，否则没有topics等属性会报错
function tabDataItem (state = {isFetching:false,page:0,topics:[]}, action) {
  switch (action.type) {
    case REQUEST_TOPICS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_TOPICS:
      if(state.page < action.page){
        let topics = state.topics
        action.topics = topics.concat(action.topics)
      }
      return {
        ...state,
        isFetching: false,
        page:action.page,
        topics:action.topics,
        limit:action.limit
      }
    default:
      return state
  }
}

const tabData = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_TOPICS:
    case REQUEST_TOPICS:
    case RECORD_SCROLLT:
      return {
        ...state,
        [action.tab]: tabDataItem(state[action.tab], action)
      }
    default:
      return state
  }
}

const homePage = (state=initState, action) => {
    if(state) {
        const sTab = selectedTab(state.selectedTab, action);
        const tData = tabData(state.tabData, action);
        
        return {
            ...state,
            selectedTab: sTab,
            tabData: tData
        }
    }
    return state;
}

export default homePage;