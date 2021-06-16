import { useEffect, useState } from "react"
// ** Custom Components
import Avatar from "@components/avatar"
// ** Store & Actions
import { useDispatch, useSelector } from "react-redux"
//AWS
import { API, graphqlOperation } from "aws-amplify"
import * as mutations from "@src/graphql/mutations"
import * as queries from "@src/graphql/queries"
import * as subscriptions from "@src/graphql/subscriptions"

// ** Third Party Components
import classnames from "classnames"
import PerfectScrollbar from "react-perfect-scrollbar"
import {
  X,
  Search,
  Bell,
} from "react-feather"
import {
  CardText,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Badge,
  CustomInput,
  Button,
} from "reactstrap"

const SidebarLeft = (props) => {
  // ** Props & Store
  const {
    store,
    sidebar,
    handleSidebar,
    userSidebarLeft,
    handleUserSidebarLeft,
  } = props

  // ** Dispatch
  const dispatch = useDispatch()

  // ** State
  const [query, setQuery] = useState("")
  const [active, setActive] = useState({})
  const [status, setStatus] = useState("online")
  const [filteredContacts, setFilteredContacts] = useState([])

  // const [contacts, setContacts] = useState([])
  const contacts = useSelector((state) => state.chat.contacts)

  const [allUsers, setAllUsers] = useState()

  const [newContacts, setNewContacts] = useState([])

  const currentUser = useSelector((state) => state.userinfo.userInfo)
  // ** Handles User Chat Click

  useEffect(() => {
    getContact()
    getAllUsers()
  }, [])

  const getAllUsers = () => {
    API.graphql(graphqlOperation(queries.listUserinfos)).then((res) => {
      setAllUsers(res.data.listUserinfos.items)
    })
  }

  const getContact = () => {
    API.graphql(
      graphqlOperation(queries.listContacts, {
        filter: { ownerID: { eq: currentUser.id } },
      })
    ).then((res) => {
      dispatch({ type: "GET_CONTACTS", data: res.data.listContacts.items })
    })
  }

  useEffect(() => {
    renderContacts()
  }, [contacts])

  const handleUserClick = (contactID, userinfo) => {
    if (contactID != "newContact") {
      contacts.map((contact, index) => {
        if (contact.id == contactID) {
          contact.unseenMsgs = false
          const contactUpdate = {
            id: contactID,
            unseenMsgs: false,
          }
          API.graphql(
            graphqlOperation(mutations.updateContact, { input: contactUpdate })
          )
        }
      })
    }

    dispatch({ type: "SELECTED_USER", data: userinfo })
    setActive(userinfo.id)
    if (sidebar === true) {
      handleSidebar()
    }
  }

  // ** Renders Contact
  const renderContacts = () => {
    if (contacts && contacts.length) {
      if (query.length && !filteredContacts.length) {
        return (
          <li className="no-results show">
            <h6 className="mb-0">No Chats Found</h6>
          </li>
        )
      } else {
        const arrToMap =
          query.length && filteredContacts.length ? filteredContacts : contacts
        return arrToMap.map((item) => {
          return (
            <li
              className={classnames({
                active: active == item.info?.id,
              })}
              key={item.id}
              onClick={() => handleUserClick(item.id, item.info)}>
              {item.info.avatar ? (
                <Avatar img={item.info.avatar} imgHeight="42" imgWidth="42" />
              ) : (
                <Avatar
                  content={item.info.name}
                  initials
                  imgHeight="42"
                  imgWidth="42"
                />
              )}
              <div className="chat-info flex-grow-1">
                <h5 className="my-auto">{item.info.name}</h5>
              </div>
              <div className="chat-meta text-nowrap">
                {item.unseenMsgs ? (
                  <Badge className="float-right" color="danger" pill>
                    <Bell />
                  </Badge>
                ) : null}
              </div>
            </li>
          )
        })
      }
    } else {
      return null
    }
  }

  // ** Handles Filter
  useEffect(() => {
    const searchFilterFunction = (contact) =>
      contact.info.name.toLowerCase().includes(query.toLowerCase())
    const filteredContactssArr = contacts.filter(searchFilterFunction)
    setFilteredContacts([...filteredContactssArr])

    // const searchUserFunction = (user) => {
    //   user.name.toLowerCase().includes(query.toLowerCase())
    // }
    // if(allUsers) {
    //   const filteredUsers = allUsers.filter(searchUserFunction)
    //   setNewContacts([...filteredUsers])
    // }

    searchNewContact()
  }, [query])

  const searchNewContact = () => {
    if (query.length > 0) {
      var search = {
        or: [{ id: { eq: query } }, { name: { matchPhrasePrefix: query } }],
      }
      API.graphql(
        graphqlOperation(queries.searchUserinfos, { filter: search })
      ).then((res) => {
        setNewContacts(res.data.searchUserinfos.items)
      })
    } else if (query.length == 0) {
      setNewContacts([])
    }
  }

  // Subscription
  useEffect(() => {
    const onUpdateContact = API.graphql(
      graphqlOperation(subscriptions.onUpdateContact)
    ).subscribe({
      next: (event) => {
        getContact()
      },
    })

    const onCreateContact = API.graphql(
      graphqlOperation(subscriptions.onCreateContact)
    ).subscribe({
      next: (event) => {
        getContact()
      },
    })
    return () => {
      onCreateContact.unsubscribe()
      onUpdateContact.unsubscribe()
    }
  }, [])

  const renderNewContacts = () => {
    if (newContacts && newContacts.length) {
      return newContacts.map((item) => {
        return (
          <li
            className={classnames({
              active: active == item.id,
            })}
            key={item.name}
            onClick={() => handleUserClick("newContact", item)}>
            {item.avatar ? (
              <Avatar img={item.avatar} imgHeight="42" imgWidth="42" />
            ) : (
              <Avatar
                content={item.name}
                initials
                imgHeight="42"
                imgWidth="42"
              />
            )}
            <div className="chat-info flex-grow-1">
              <h5 className="mb-0">{item.name}</h5>
              <CardText className="text-truncate">{item.bio}</CardText>
            </div>
          </li>
        )
      })
    } else {
      return null
    }
  }

  return store ? (
    <div className="sidebar-left">
      <div className="sidebar">
        <div
          className={classnames("chat-profile-sidebar", {
            show: userSidebarLeft,
          })}>
          <header className="chat-profile-header">
            <div className="close-icon" onClick={handleUserSidebarLeft}>
              <X size={14} />
            </div>
            <div className="header-profile-sidebar">
              {currentUser.avatar ? (
                <Avatar
                  className="box-shadow-1 avatar-border"
                  img={currentUser.avatar}
                  status={status}
                  size="xl"
                />
              ) : (
                <Avatar
                  className="box-shadow-1 avatar-border"
                  content={currentUser.name}
                  initials
                  status={status}
                  size="xl"
                />
              )}

              <h4 className="chat-user-name">{currentUser.name}</h4>
            </div>
          </header>
          <PerfectScrollbar
            className="profile-sidebar-area"
            options={{ wheelPropagation: false }}>
            <h6 className="section-label mb-1 mt-3">Status</h6>
            <ul className="list-unstyled user-status">
              <li className="pb-1">
                <CustomInput
                  type="radio"
                  className="custom-control-primary"
                  id="online"
                  label="Online"
                  onChange={(e) => setStatus("online")}
                  checked={status === "online"}
                />
              </li>
              <li className="pb-1">
                <CustomInput
                  type="radio"
                  className="custom-control-danger"
                  id="busy"
                  label="Do Not Disturb"
                  onChange={(e) => setStatus("busy")}
                  checked={status === "busy"}
                />
              </li>
              <li className="pb-1">
                <CustomInput
                  type="radio"
                  className="custom-control-warning"
                  id="away"
                  label="Away"
                  onChange={(e) => setStatus("away")}
                  checked={status === "away"}
                />
              </li>
              <li className="pb-1">
                <CustomInput
                  type="radio"
                  className="custom-control-secondary"
                  id="offline"
                  label="Offline"
                  onChange={(e) => setStatus("offline")}
                  checked={status === "offline"}
                />
              </li>
            </ul>

            <div className="mt-3">
              <Button color="primary">Logout</Button>
            </div>
          </PerfectScrollbar>
        </div>
        <div
          className={classnames("sidebar-content", {
            show: sidebar === true,
          })}>
          <div className="sidebar-close-icon" onClick={handleSidebar}>
            <X size={14} />
          </div>
          <div className="chat-fixed-search">
            <div className="d-flex align-items-center w-100">
              <div
                className="sidebar-profile-toggle"
                onClick={handleUserSidebarLeft}>
                {currentUser.avatar ? (
                  <Avatar
                    className="avatar-border"
                    img={currentUser.avatar}
                    status={currentUser.status}
                    imgHeight="42"
                    imgWidth="42"
                  />
                ) : (
                  <Avatar
                    className="avatar-border"
                    content={currentUser.name}
                    initials
                    color="light-primary"
                    status={currentUser.status}
                    imgHeight="42"
                    imgWidth="42"
                  />
                )}
              </div>
              <InputGroup className="input-group-merge ml-1 w-100">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText className="round">
                    <Search className="text-muted" size={14} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  className="round"
                  placeholder="Search or start a new chat"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </InputGroup>
            </div>
          </div>
          <PerfectScrollbar
            className="chat-user-list-wrapper list-group"
            options={{ wheelPropagation: false }}>
            <h4 className="chat-list-title">Contacts</h4>
            <ul className="chat-users-list contact-list media-list">
              {renderContacts()}
            </ul>
            {newContacts.length > 0 ? (
              <>
                <h4 className="chat-list-title">New Contacts</h4>
                <ul className="chat-users-list contact-list media-list">
                  {renderNewContacts()}
                </ul>
              </>
            ) : null}
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  ) : null
}

export default SidebarLeft
