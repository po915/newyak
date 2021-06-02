export const customAction = data => {
    return dispatch => {
        dispatch({
            type:'SET_USERNAME',
            data
        })
    }
}

export const setActiveTab = data => {
    return dispatch => {
        dispatch({
            type: 'SET_ACTIVE_TAB',
            data
        })
    }
}