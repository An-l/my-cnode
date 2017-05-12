import {combineReducers} from 'redux';

// import { tabBar } from './tabBar';
// import { tabs } from './tabs';
import homePage from './homePage';
import article from './article';

const reducers = combineReducers({
    homePage,
    article,
    // selectedPage,//切换的TabBar
    // selectedTabs: tabs,//切换的TabBar
    // homeListObj: homeListReducer,//主页列表对象
    // articleContent: articleContentReducer, //文章内容
    // loginObj: loginReducer, //登录验证
    // favouriteList: favArticleReducer,//收藏列表
    // isFetching: fetchingReducer //全局异步fetching管理
});

// function selectedPage(page = 'home', action) {
//     switch (action.type) {
//         case 'SELECT_PAGE':
//             return action.page;
//         default:
//             return page;
//     }
// }



export default reducers;