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
  PhoneCall,
  Video,
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

const ChatLog = (props) => {
  // ** Props & Store
  const {
    handleUser,
    handleUserSidebarRight,
    handleSidebar,
    // store,
    userSidebarLeft,
  } = props
  // const { selectedUser } = store

  // console.log(selectedUser, "Chat/seletedUSer")

  const [selectedUser, setSelectedUser] = useState()

  const currentUser = useSelector((state) => state.userinfo.userInfo)
  const selectedContact = useSelector((state) => state.chat.selectedContact)

  // ** Refs & Dispatch
  const chatArea = useRef(null)
  const dispatch = useDispatch()

  // ** State
  const [msg, setMsg] = useState("")
  const [chatLog, setChatLog] = useState([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    if (selectedContact) {
      getChatLog()
      getSeletedUser()
      console.log(selectedContact, "selectedContact")
    }
  }, [selectedContact])

  const getChatLog = () => {
    API.graphql(
      graphqlOperation(queries.chatByContact, { contactID: selectedContact })
    ).then((res) => {
      console.log(res, "chatlog")
      setChatLog(res.data.chatByContact.items)
    })
  }

  const getSeletedUser = () => {
    API.graphql(
      graphqlOperation(queries.getContact, { id: selectedContact })
    ).then((res) => {
      console.log(res, "selectedUser")
      setSelectedUser(res.data.getContact.info)
    })
  }

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    console.log(chatArea)
    if (!chatArea.current) return false
    const chatContainer = ReactDOM.findDOMNode(chatArea.current)
    chatContainer.scrollTop = Number.MAX_SAFE_INTEGER
  }

  // ** If user chat is not empty scrollToBottom
  useEffect(() => {
    if (chatLog) {
      formattedChatData()
      scrollToBottom()
      renderChats()
    }
  }, [chatLog])

  // ** Formats chat data based on sender
  const formattedChatData = () => {
    console.log(chatLog, "chatLog")
    const formattedChatLog = []
    let chatMessageSenderId = chatLog[0] ? chatLog[0].senderID : undefined
    let msgGroup = {
      senderId: chatMessageSenderId,
      messages: [],
    }
    chatLog.forEach((msg, index) => {
      if (chatMessageSenderId === msg.senderId) {
        msgGroup.messages.push({
          msg: msg.message,
          time: msg.time,
        })
      } else {
        chatMessageSenderId = msg.senderId
        formattedChatLog.push(msgGroup)
        msgGroup = {
          senderId: msg.senderId,
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
    console.log(formattedChatLog, "formattedChatLog")
    return formattedChatLog
  }

  // ** Renders user chat
  const renderChats = () => {
    return formattedChatData().map((item, index) => {
      return (
        <div
          key={index}
          className={classnames("chat", {
            "chat-left": item.senderId !== currentUser.id,
          })}>
          <div className="chat-avatar">
            {/* {currentUser.avatar ? (
              <Avatar
                className="box-shadow-1 cursor-pointer"
                img={
                  item.senderId === currentUser.id
                    ? currentUser.avatar
                    : selectedUser.avatar
                }
              />
            ) : (
              <Avatar
                className="box-shadow-1 cursor-pointer"
                img={
                  item.senderId === currentUser.id
                    ? currentUser.avatar
                    : selectedUser.avatar
                }
              />
            )}
            <Avatar
              className="box-shadow-1 cursor-pointer"
              img={
                item.senderId === currentUser.id
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
    if (!selectedUser && !userSidebarLeft && window.innerWidth <= 1200) {
      handleSidebar()
    }
  }

  // ** Sends New Msg
  // const handleSendMsg = (e) => {
  //   e.preventDefault()
  //   if (msg.length) {
  //     dispatch(sendMsg({ ...selectedUser, message: msg }))
  //     setMsg("")
  //   }
  // }

  const sendMessage = (e) => {
    e.preventDefault()
    if (newMessage) {
      var now = new Date()
      var time = now.toISOString()
      const newMsg = {
        contactID: selectedContact,
        message: newMessage,
        time: time,
        senderID: currentUser.id,
      }
      console.log(newMsg, "newMsg")
      API.graphql(
        graphqlOperation(mutations.createChat, { input: newMsg })
      ).then((res) => {
        console.log(res, "addnewchat result")
        getChatLog()
      })
    }
  }

  // ** ChatWrapper tag based on chat's length
  const ChatWrapper = selectedUser && chatLog ? PerfectScrollbar : "div"

  return (
    <div className="chat-app-window">
      <div
        className={classnames("start-chat-area", { "d-none": selectedUser })}>
        <div className="start-chat-icon mb-1">
          <MessageSquare />
        </div>
        <h4
          className="sidebar-toggle start-chat-text"
          onClick={handleStartConversation}>
          Start Conversation
        </h4>
      </div>
      {selectedUser ? (
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
                <Avatar
                  imgHeight="36"
                  imgWidth="36"
                  img={selectedUser.avatar}
                  status={selectedUser.status}
                  className="avatar-border user-profile-toggle m-0 mr-1"
                  onClick={() => handleAvatarClick(selectedUser)}
                />
                <h6 className="mb-0">{selectedUser.name}</h6>
              </div>
              <div className="d-flex align-items-center">
                <PhoneCall
                  size={18}
                  className="cursor-pointer d-sm-block d-none mr-1"
                />
                <Video
                  size={18}
                  className="cursor-pointer d-sm-block d-none mr-1"
                />
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
                      View Contact
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Mute Notifications
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Block Contact
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Clear Chat
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Report
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
            {selectedUser.chat ? (
              <div className="chats">{renderChats()}</div>
            ) : null}
          </ChatWrapper>

          <Form className="chat-app-form" onSubmit={(e) => sendMessage(e)}>
            <InputGroup className="input-group-merge mr-1 form-send-message">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <Mic className="cursor-pointer" size={14} />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message or use speech to text"
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
