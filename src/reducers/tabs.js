
export function tabs(selectedTabs = 'all', action) {
    switch (action.type) {
        case 'CHANGE_TABS':
            return action.payload.selectedTabs;
        default:
            return 'all';
    }
}