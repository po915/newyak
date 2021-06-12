// ** React Imports
import { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux"
import { sendMsg } from "./store/actions"

// ** Third Party Components
import classnames from "classnames"
import PerfectScrollbar from "react-perfect-scrollbar"
import {
  MessageSquare,
  Menu,
  Search,
  MoreVertical,
  Mic,
  Image,
  Send,
} from "react-feather"
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Label,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Button,
} from "reactstrap"
import { API, graphqlOperation } from "aws-amplify"
import * as mutations from "@src/graphql/mutations"
import * as queries from "@src/graphql/queries"
import * as subscriptions from "@src/graphql/subscriptions"

const ChatLog = (props) => {
  const { handleUser, handleUserSidebarRight, handleSidebar, userSidebarLeft } =
    props
  const currentUser = useSelector((state) => state.userinfo.userInfo)
  const selectedUser = useSelector((state) => state.chat.selectedUser)
  const [myContact, setMyContact] = useState({})
  const [yourContact, setYourContact] = useState({})
  const [updateMsg, setUpdateMsg] = useState({})
  // ** Refs & Dispatch
  const chatArea = useRef(null)

  // ** State
  const [chatLog, setChatLog] = useState([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    if (Object.keys(selectedUser).length) {
      var isOldContact = getContact()
      if(!isOldContact) {
        setChatLog([])
        setMyContact({})
        setYourContact({})
      }
    }
  }, [selectedUser])

  useEffect(() => {
    if(Object.keys(myContact).length)
    getChatLog()
  }, [myContact])

  // get myContact and yourcontact
  function getContact() {
    if (Object.keys(selectedUser).length) {
      var filter_1 = {
        ownerID: { eq: currentUser.id },
        friendID: { eq: selectedUser.id },
      }
      API.graphql(
        graphqlOperation(queries.listContacts, { filter: filter_1 })
      ).then((res) => {
        if(res.data.listContacts?.items[0]) setMyContact(res.data.listContacts?.items[0])
      })
      var filter = {
        ownerID: { eq: selectedUser.id },
        friendID: { eq: currentUser.id },
      }
      API.graphql(
        graphqlOperation(queries.listContacts, { filter: filter })
      ).then((res) => {
        if(res.data.listContacts?.items[0]) setYourContact(res.data.listContacts?.items[0])
      })
    } else {
      return false
    }
  }

  function getChatLog() {
    if (Object.keys(myContact).length) {
      API.graphql(
        graphqlOperation(queries.chatByContact, { contactID: myContact.id })
      ).then((res) => {
        console.log("setChatlog-2")
        setChatLog([...res.data.chatByContact.items])
      })
    }
  }

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    if (!chatArea.current) return false
    const chatContainer = ReactDOM.findDOMNode(chatArea.current)
    chatContainer.scrollTop = Number.MAX_SAFE_INTEGER
  }

  // ** If user chat is not empty scrollToBottom
  useEffect(() => {
    formattedChatData()
    scrollToBottom()
    renderChats()
  }, [chatLog])

  // ** Formats chat data based on sender
  const formattedChatData = () => {
    const formattedChatLog = []
    let chatMessagesenderID = chatLog[0] ? chatLog[0].senderID : undefined
    let msgGroup = {
      senderID: chatMessagesenderID,
      messages: [],
    }
    chatLog.forEach((msg, index) => {
      if (chatMessagesenderID === msg.senderID) {
        msgGroup.messages.push({
          msg: msg.message,
          time: msg.time,
        })
      } else {
        chatMessagesenderID = msg.senderID
        formattedChatLog.push(msgGroup)
        msgGroup = {
          senderID: msg.senderID,
          messages: [
            {
              msg: msg.message,
              time: msg.time,
            },
          ],
        }
      }
      if (index === chatLog.length - 1) formattedChatLog.push(msgGroup)
    })
    return formattedChatLog
  }

  // ** Renders user chat
  const renderChats = () => {
    return formattedChatData().map((item, index) => {
      return (
        <div
          key={index}
          className={classnames("chat", {
            "chat-left": item.senderID !== currentUser.id,
          })}>
          <div className="chat-avatar">
            {/* {currentUser.avatar ? (
              <Avatar
                className="box-shadow-1 cursor-pointer"
                img={
                  item.senderID === currentUser.id
                    ? currentUser.avatar
                    : selectedUser.avatar
                }
              />
            ) : (
              <Avatar
                className="box-shadow-1 cursor-pointer"
                img={
                  item.senderID === currentUser.id
                    ? currentUser.avatar
                    : selectedUser.avatar
                }
              />
            )}
            <Avatar
              className="box-shadow-1 cursor-pointer"
              img={
                item.senderID === currentUser.id
                  ? currentUser.avatar
                  : selectedUser.avatar
              }
            /> */}
          </div>

          <div className="chat-body">
            {item.messages.map((chat) => (
              <div key={chat.msg} className="chat-content">
                <p>{chat.msg}</p>
              </div>
            ))}
          </div>
        </div>
      )
    })
  }

  // ** Opens right sidebar & handles its data
  const handleAvatarClick = (obj) => {
    handleUserSidebarRight()
    handleUser(obj)
  }

  // ** On mobile screen open left sidebar on Start Conversation Click
  const handleStartConversation = () => {
    if (
      !Object.keys(selectedUser).length &&
      !userSidebarLeft &&
      window.innerWidth <= 1200
    ) {
      handleSidebar()
    }
  }

  function addNewContact() {
    const myNewContact = {
      ownerID: currentUser.id,
      friendID: selectedUser.id,
    }
    const yourNewConctact = {
      ownerID: selectedUser.id,
      friendID: currentUser.id,
    }
    // add new message to my contact
    API.graphql(
      graphqlOperation(mutations.createContact, { input: myNewContact })
    ).then((res) => {
      setMyContact(res.data.createContact)
      var now = new Date()
      var time = now.toISOString()
      const newMsg = {
        contactID: res.data.createContact.id,
        message: newMessage,
        time: time,
        senderID: currentUser.id,
      }
      API.graphql(
        graphqlOperation(mutations.createChat, { input: newMsg })
      ).then((res) => {
        setNewMessage("")
        document.getElementById("new_msg").value = ""
      })
    })
    // add new message to your contact
    API.graphql(
      graphqlOperation(mutations.createContact, { input: yourNewConctact })
    ).then((res) => {
      var now = new Date()
      var time = now.toISOString()
      const newMsg = {
        contactID: res.data.createContact.id,
        message: newMessage,
        time: time,
        senderID: currentUser.id,
      }
      setYourContact(res.data.createContact)
      API.graphql(graphqlOperation(mutations.createChat, { input: newMsg }))
    })
  }


  useEffect(() => {
    if (Object.keys(updateMsg).length && myContact) {
      if (updateMsg?.contactID == myContact?.id) {
        console.log("setChatlog-1")
        setChatLog([...chatLog, updateMsg])
      }
    }
  }, [updateMsg])
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateChat)
    ).subscribe({
      next: (event) => {
        setUpdateMsg(event.value.data.onCreateChat)
      },
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    if (newMessage) {
      if (chatLog.length > 0) {
        var now = new Date()
        var time = now.toISOString()
        const newMsg = {
          contactID: myContact.id,
          message: newMessage,
          time: time,
          senderID: currentUser.id,
        }
        document.getElementById("new_msg").value = ""
        API.graphql(
          graphqlOperation(mutations.createChat, { input: newMsg })
        ).then((res) => {
          setNewMessage("")
        })
        const newYourMsg = {
          contactID: yourContact?.id,
          message: newMessage,
          time: time,
          senderID: currentUser.id,
        }
        API.graphql(
          graphqlOperation(mutations.createChat, { input: newYourMsg })
        )
      } else {
        addNewContact()
      }
    }
  }

  // ** ChatWrapper tag based on chat's length
  const ChatWrapper = selectedUser && chatLog ? PerfectScrollbar : "div"

  return (
    <div className="chat-app-window">
      <div
        className={classnames("start-chat-area", {
          "d-none": Object.keys(selectedUser).length,
        })}>
        <div className="start-chat-icon mb-1">
          <MessageSquare />
        </div>
        <h4
          className="sidebar-toggle start-chat-text"
          onClick={handleStartConversation}>
          Start Conversation
        </h4>
      </div>
      {Object.keys(selectedUser).length ? (
        <div
          className={classnames("active-chat", {
            "d-none": selectedUser === null,
          })}>
          <div className="chat-navbar">
            <header className="chat-header">
              <div className="d-flex align-items-center">
                <div
                  className="sidebar-toggle d-block d-lg-none mr-1"
                  onClick={handleSidebar}>
                  <Menu size={21} />
                </div>
                {selectedUser.avatar ? (
                  <Avatar
                    imgHeight="36"
                    imgWidth="36"
                    img={selectedUser.avatar}
                    status={selectedUser.status}
                    className="avatar-border user-profile-toggle m-0 mr-1"
                    onClick={() => handleAvatarClick(selectedUser)}
                  />
                ) : (
                  <Avatar
                    imgHeight="36"
                    imgWidth="36"
                    content={selectedUser.name}
                    initials
                    color="light-primary"
                    status={selectedUser.status}
                    className="avatar-border user-profile-toggle m-0 mr-1"
                    onClick={() => handleAvatarClick(selectedUser)}
                  />
                )}
                <h6 className="mb-0">{selectedUser.name}</h6>
              </div>
              <div className="d-flex align-items-center">
                <Search
                  size={18}
                  className="cursor-pointer d-sm-block d-none"
                />
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-icon"
                    color="transparent"
                    size="sm">
                    <MoreVertical size="18" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Block Contact
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Clear Chat
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </header>
          </div>

          <ChatWrapper
            ref={chatArea}
            className="user-chats"
            options={{ wheelPropagation: false }}>
            {chatLog ? <div className="chats">{renderChats()}</div> : null}
          </ChatWrapper>

          <Form className="chat-app-form" onSubmit={(e) => sendMessage(e)}>
            <InputGroup className="input-group-merge mr-1 form-send-message">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <Mic className="cursor-pointer" size={14} />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                id="new_msg"
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Message here..."
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <Label className="attachment-icon mb-0" for="attach-doc">
                    <Image
                      className="cursor-pointer text-secondary"
                      size={14}
                    />
                    <input type="file" id="attach-doc" hidden />
                  </Label>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <Button className="send" color="primary">
              <Send size={14} className="d-lg-none" />
              <span className="d-none d-lg-block">Send</span>
            </Button>
          </Form>
        </div>
      ) : null}
    </div>
  )
}

export default ChatLog
