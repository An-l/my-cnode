
export function tabBar(selectedTabBar = 'home', action) {
    switch (action.type) {
        case 'CHANGE_TABBAR':
            return action.payload.selectedTabBar;
        default:
            return 'home';
    }
}