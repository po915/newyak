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
import { X, Search, Bell } from "react-feather"
import {
  Form,
  CardText,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Badge,
  Button,
} from "reactstrap"

const SidebarLeft = (props) => {
  // ** Props & Store
  const {
    store,
    sidebar,
    handleSidebar,
  } = props

  // ** Dispatch
  const dispatch = useDispatch()

  // ** State
  const [query, setQuery] = useState("")
  const [active, setActive] = useState({})
  const [filteredContacts, setFilteredContacts] = useState([])
  const [newContacts, setNewContacts] = useState([])

  const contacts = useSelector((state) => state.chat.contacts)
  const currentUser = useSelector((state) => state.userinfo.userInfo)
  // ** Handles User Chat Click

  useEffect(() => {
    getContact()
  }, [])

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
                  className="contact-avatar"
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
  }, [query])

  const searchNewContact = (e) => {
    e.preventDefault()
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
        if (item.id != currentUser.id) {
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
        }
      })
    } else {
      return null
    }
  }

  return store ? (
    <div className="sidebar-left">
      <div className="sidebar">
        <div
          className={classnames("sidebar-content", {
            show: sidebar === true,
          })}>
          <div className="sidebar-close-icon" onClick={handleSidebar}>
            <X size={14} />
          </div>
          <div className="chat-fixed-search">
            <Form onSubmit={searchNewContact}>
              <div className="d-flex align-items-center w-100 pt-1">
                <InputGroup className="input-group-merge w-100">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText className="round">
                      <Search className="text-muted" size={14} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className="round"
                    placeholder="Search your friends..."
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </InputGroup>
                <Button color="primary" className="ml-1" type="submit">Search</Button>
              </div>
            </Form>
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
