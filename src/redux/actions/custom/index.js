export const customAction = data => {
    return dispatch => {
        dispatch({
            type:'SET_USERNAME',
            data
        })
    }
}