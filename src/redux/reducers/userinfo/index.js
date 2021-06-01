// **  Initial State
const initialstate = {
	currentUser: {},
	userInfo: {}
}


const userinfoReducer = (state = initialstate, action) => {
	switch (action.type) {
		case "SET_CURRENT_USER":
			localStorage.setItem("cUser", JSON.stringify(action.data))
			return {
				...state,
				currentUser: action.data,
			}
		case "SET_USERINFO":
			localStorage.setItem("sUser", JSON.stringify(action.data))
			return { ...state,
				userInfo: action.data 
			}
		default:
			return state
	}
}

export default userinfoReducer
