// **  Initial State
const initialState = {
    username: {}
}
  
  const customReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USERNAME':
        return {
          ...state,
          username: action.data,
        }
      default:
      return state
    }
  }
  
  export default customReducer
  