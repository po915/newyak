export const setCurrentUser = data => {
    return dispatch => {
        dispatch({
            type:'SET_CURRENT_USER',
            data
        })
    }
}

export const setUserInfo = data => {
    return dispatch => {
        dispatch({
            type:'SET_USERINFO',
            data
        })
    }
}