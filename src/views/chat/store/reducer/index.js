const initialState = {
  chats: [],
  contacts: [],
  userProfile: {},
  selectedUser: {}
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    // case 'GET_USER_PROFILE':
    //   return { ...state, userProfile: action.userProfile }
    // case 'GET_CHAT_CONTACTS':
    //   return { ...state, chats: action.data.chatsContacts, contacts: action.data.contacts }
    // case 'SELECT_CHAT':
    //   return { ...state, selectedUser: action.data }
    // case 'SEND_MSG':
    //   // ** Add new msg to chat
    //   const newMsg = action.data.response.chat
    //   return { ...state, selectedUser: { ...state.selectedUser, chat: newMsg } }
    case 'SELECTED_USER' :
      return {...state, selectedUser: action.data }
    case 'SELECT_NEW_CONTACT' :
      return {...state, selectedNewContact: action.data }
    case 'GET_CONTACTS' :
      return {...state, contacts: action.data}
    default:
      return state
  }
}

export default chatReducer
