// ** React Imports
import { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
// ** Custom Components
import Avatar from "@components/avatar"
// ** Store & Actions
import { useSelector } from "react-redux"
// ** Third Party Components
import classnames from "classnames"
import PerfectScrollbar from "react-perfect-scrollbar"
import {
  MessageSquare,
  Menu,
  Smile,
  Image,
  MoreVertical,
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

import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react"

const ChatLog = (props) => {
  const { handleUser, handleUserSidebarRight, handleSidebar, userSidebarLeft } =
    props
  const currentUser = useSelector((state) => state.userinfo.userInfo)
  const selectedUser = useSelector((state) => state.chat.selectedUser)
  const [myContact, setMyContact] = useState({})
  const [yourContact, setYourContact] = useState({})
  const [updateMsg, setUpdateMsg] = useState({})
  const [emojiShow, setEmojiShow] = useState(false)
  // ** Refs & Dispatch
  const chatArea = useRef(null)

  // ** State
  const [chatLog, setChatLog] = useState([])
  const [newMessage, setNewMessage] = useState("")

  const newMsgInput = useRef()

  useEffect(() => {
    if (Object.keys(selectedUser).length > 0) {
      var isOldContact = getContact()
      if (!isOldContact) {
        setChatLog([])
        setMyContact({})
        setYourContact({})
      }
    }
  }, [selectedUser])

  useEffect(() => {
    if (Object.keys(myContact).length) getChatLog()
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
        if (res.data.listContacts?.items[0])
          setMyContact(res.data.listContacts?.items[0])
      })
      var filter = {
        ownerID: { eq: selectedUser.id },
        friendID: { eq: currentUser.id },
      }
      API.graphql(
        graphqlOperation(queries.listContacts, { filter: filter })
      ).then((res) => {
        if (res.data.listContacts?.items[0])
          setYourContact(res.data.listContacts?.items[0])
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
        })
      } else {
        chatMessagesenderID = msg.senderID
        formattedChatLog.push(msgGroup)
        msgGroup = {
          senderID: msg.senderID,
          messages: [
            {
              msg: msg.message,
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
            {currentUser.avatar && selectedUser.avatar ? (
              <Avatar
                className="cursor-pointer"
                img={
                  item.senderID === currentUser.id
                    ? currentUser.avatar
                    : selectedUser.avatar
                }
              />
            ) : (
              <Avatar
                className="box-shadow-1 cursor-pointer"
                content={
                  item.senderID === currentUser.id
                    ? currentUser.name
                    : selectedUser.name
                }
                initials
                color="light-primary"
              />
            )}
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

  useEffect(() => {
    if (Object.keys(updateMsg).length && myContact) {
      if (updateMsg?.contactID == myContact?.id) {
        setChatLog([...chatLog, updateMsg])
      }
    }
  }, [updateMsg])
  // subcription onCreateChat
  useEffect(() => {
    const onCreateChat = API.graphql(
      graphqlOperation(subscriptions.onCreateChat)
    ).subscribe({
      next: (event) => {
        setUpdateMsg(event.value.data.onCreateChat)
      },
    })

    return () => {
      onCreateChat.unsubscribe()
    }
  }, [])
// subcription onUpdateChat
  useEffect(() => {
    const onUpdateContact = API.graphql(
      graphqlOperation(subscriptions.onUpdateContact)
    ).subscribe({
      next: (event) => {
        const updatedContactID = event.value.data.onUpdateContact.id
        // console.log(updatedContactID, yourContact.id, myContact.id)
        if(updatedContactID == yourContact.id) setYourContact(event.value.data.onUpdateContact)
        if(updatedContactID == myContact.id) setMyContact(event.value.data.onUpdateContact)
        // switch (updatedContactID) {
        //   case yourContact.id:
        //     setYourContact(event.value.data.onUpdateContact)
        //     break
        //   case myContact.id:
        //     setMyContact(event.value.data.onUpdateContact)
        //     break
        //   default:
        //     console.log(event.value.data.onUpdateContact, "Updated contact")
        //     break
        // }
        // chatMain()
      },
    })
    return () => {
      onUpdateContact.unsubscribe()
    }
  }, [])

  useEffect(() => newMsgInput.current && newMsgInput.current.focus())

  const sendMessage = (e) => {
    e.preventDefault()
    setEmojiShow(false)
    if (newMessage) {
      // if (chatLog.length > 0) {
      const newMsg = {
        contactID: myContact.id,
        message: newMessage,
        senderID: currentUser.id,
      }
      document.getElementById("new_msg").value = ""
      API.graphql(
        graphqlOperation(mutations.createChat, { input: newMsg })
      ).then((res) => {
        newMsgInput.current?.focus()
        setNewMessage("")
      })
      // add new message to your contact
      const newYourMsg = {
        contactID: yourContact?.id,
        message: newMessage,
        senderID: currentUser.id,
      }
      API.graphql(graphqlOperation(mutations.createChat, { input: newYourMsg }))
      // set unreadmessages to your contact
      const setUnread = {
        id: yourContact.id,
        unseenMsgs: true,
      }
      API.graphql(
        graphqlOperation(mutations.updateContact, { input: setUnread })
      )
    }
  }

  const onInputFocus = (e) => {
    setEmojiShow(false)
    // console.log(e.target.value.length)

    // const setUnread = {
    //   id: myContact.id,
    //   unseenMsgs: false,
    // }
    // API.graphql(graphqlOperation(mutations.updateContact, { input: setUnread }))
  }

  const acceptInvite = () => {
    if (myContact?.id) {
      const accept = {
        id: myContact.id,
        accepted: "yes",
      }
      API.graphql(
        graphqlOperation(mutations.updateContact, { input: accept })
      ).then((res) => {
        setMyContact(res.data.updateContact)
      })
    }
  }

  const denyInvite = () => {
    if (myContact?.id) {
      const deny = {
        id: myContact.id,
        accepted: "blocked",
      }
      API.graphql(
        graphqlOperation(mutations.updateContact, { input: deny })
      ).then((res) => {
        setMyContact(res.data.updateContact)
      })
    }
  }

  const sendInvite = () => {
    if (Object.keys(selectedUser).length > 0) {
      const myNewContact = {
        ownerID: currentUser.id,
        friendID: selectedUser.id,
        accepted: "yes",
      }
      const yourNewContact = {
        ownerID: selectedUser.id,
        friendID: currentUser.id,
        unseenMsgs: true,
        accepted: "pending",
      }
      API.graphql(
        graphqlOperation(mutations.createContact, { input: myNewContact })
      ).then((res) => {
        setMyContact(res.data.createContact)
      })
      API.graphql(
        graphqlOperation(mutations.createContact, { input: yourNewContact })
      ).then((res) => {
        setYourContact(res.data.createContact)
      })
    }
  }

  const unBlock = () => {
    if (myContact?.id) {
      const deny = {
        id: myContact.id,
        accepted: "yes",
      }
      API.graphql(
        graphqlOperation(mutations.updateContact, { input: deny })
      ).then((res) => {
        setMyContact(res.data.updateContact)
      })
    }
  }

  const onEmojiClick = (event, emojiObject) => {
    setEmojiShow(false)
    setNewMessage(newMessage + emojiObject.emoji)
    newMsgInput.current.focus()
  }

  const blockContact = () => {
    if (confirm("Are you sure want to block this user?")) {
      const update = {
        id: myContact.id,
        accepted: "blocked",
      }
      API.graphql(
        graphqlOperation(mutations.updateContact, { input: update })
      ).then((res) => console.log(res))
    }
  }

  const chatMain = () => {
    // i'm waiting his acceptance
    if (yourContact.accepted == "pending" && myContact.accepted == "yes") {
      return (
        <>
          <ChatWrapper
            ref={chatArea}
            className="user-chats"
            options={{ wheelPropagation: false }}>
            <div className="box-1">
              <Button color="primary">Waiting Acceptance</Button>
            </div>
          </ChatWrapper>
          <Form className="chat-app-form"></Form>
        </>
      )
    }
    // he invited me
    if (myContact.accepted == "pending" && yourContact.accepted == "yes") {
      return (
        <>
          <ChatWrapper
            ref={chatArea}
            className="user-chats"
            options={{ wheelPropagation: false }}>
            <div className="box-1">
              <p>{selectedUser.name} is going to add you as his/her friend.</p>
              <Button color="primary" className="mr-1" onClick={acceptInvite}>
                Accept
              </Button>
              <Button color="warning" onClick={denyInvite}>
                Deny
              </Button>
            </div>
          </ChatWrapper>
          <Form className="chat-app-form"></Form>
        </>
      )
    }
    // he accepted my invitation, all of us can have chat
    if (yourContact.accepted == "yes" && myContact.accepted == "yes") {
      return (
        <>
          <ChatWrapper
            ref={chatArea}
            className="user-chats"
            options={{ wheelPropagation: false }}>
            {chatLog ? <div className="chats">{renderChats()}</div> : null}
          </ChatWrapper>
          {emojiShow ? (
            <div className="emojiPicker-box">
              <Picker
                onEmojiClick={onEmojiClick}
                disableAutoFocus={true}
                skinTone={SKIN_TONE_MEDIUM_DARK}
                groupNames={{ smileys_people: "PEOPLE" }}
                native
              />
            </div>
          ) : null}
          <Form className="chat-app-form" onSubmit={(e) => sendMessage(e)}>
            <InputGroup className="input-group-merge mr-1 form-send-message">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <Smile
                    className="cursor-pointer"
                    onClick={() => setEmojiShow(!emojiShow)}
                    size={14}
                  />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                id="new_msg"
                autoComplete="false"
                ref={newMsgInput}
                value={newMessage}
                onFocus={(e) => onInputFocus(e)}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Message here..."
              />
            </InputGroup>
            <Button className="send" color="primary">
              <Send size={14} className="d-lg-none" />
              <span className="d-none d-lg-block">Send</span>
            </Button>
          </Form>
        </>
      )
    }
    // he blocked me
    if (yourContact.accepted == "blocked") {
      return (
        <>
          <ChatWrapper
            ref={chatArea}
            className="user-chats"
            options={{ wheelPropagation: false }}>
            <div className="box-1">
              <p>Sorry, {selectedUser.name} blocked you.</p>
              <Button color="danger" className="mr-1">
                Blocked
              </Button>
            </div>
          </ChatWrapper>
          <Form className="chat-app-form"></Form>
        </>
      )
    }
    // i blocked him
    if (myContact.accepted == "blocked") {
      return (
        <>
          <ChatWrapper
            ref={chatArea}
            className="user-chats"
            options={{ wheelPropagation: false }}>
            <div className="box-1">
              <p>Sorry, You blocked {selectedUser.name}.</p>
              <Button color="danger" className="mr-1">
                Blocked
              </Button>
              <Button color="info" onClick={unBlock}>
                Unblock
              </Button>
            </div>
          </ChatWrapper>
          <Form className="chat-app-form"></Form>
        </>
      )
    }
    // new user
    if (Object.keys(selectedUser).length > 0) {
      return (
        <>
          <ChatWrapper
            ref={chatArea}
            className="user-chats"
            options={{ wheelPropagation: false }}>
            <div className="box-1">
              <Button
                color="primary"
                className="mr-1"
                onClick={() => sendInvite()}>
                Say Hi
              </Button>
            </div>
          </ChatWrapper>
          <Form
            className="chat-app-form"
            onSubmit={(e) => sendMessage(e)}></Form>
        </>
      )
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
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-icon"
                    color="transparent"
                    size="sm">
                    <MoreVertical size="18" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={blockContact}>
                      Block Contact
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </header>
          </div>
          {chatMain()}
        </div>
      ) : null}
    </div>
  )
}

export default ChatLog
