// **  Initial State
const initialState = {
	username: {},
	activeTab: "",
}

const customReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_USERNAME":
			return {
				...state,
				username: action.data,
			}
		default:
			return state
	}
}

const setActiveTabReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_ACTIVE_TAB":
			return {
				...state,
				activeTab: action.data,
			}
	}
}
export default customReducer
