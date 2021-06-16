// ** Custom Components
import Avatar from "@components/avatar"

// ** Third Party Components
import classnames from "classnames"
import PerfectScrollbar from "react-perfect-scrollbar"
import { X, Mail, PhoneCall, Trash, Slash } from "react-feather"
import { useEffect, useState } from "react"
import { API, graphqlOperation } from "aws-amplify"
import * as queries from "@src/graphql/queries"
import * as mutations from "@src/graphql/mutations"

import { useSelector } from "react-redux"

const UserProfileSidebar = (props) => {
  // ** Props
  const { user, handleUserSidebarRight, userSidebarRight } = props
  const [myContact, setMyContact] = useState({})
  const [yourContact, setYourContact] = useState({})

  const currentUser = useSelector((state) => state.userinfo.userInfo)
  const selectedUser = useSelector((state) => state.chat.selectedUser)

  useEffect(() => {
    getContact()
  }, [])

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

  const deleteContact = () => {
    if (
      Object.keys(myContact).length > 0 &&
      Object.keys(yourContact).length > 0
    ) {
      API.graphql(
        graphqlOperation(mutations.deleteContact, { id: myContact.id })
      ).then((res) => console.log(res))
      API.graphql(
        graphqlOperation(mutations.deleteContact, { id: yourContact.id })
      ).then((res) => console.log(res))
    }
  }

  const blockContact = () => {
    if (Object.keys(myContact).length > 0) {
      const update = {
        id: myContact.id,
        accepted: "blocked",
      }
      API.graphql(graphqlOperation(mutations.updateContact, { input: update }))
    }
  }

  return (
    <div
      className={classnames("user-profile-sidebar", {
        show: userSidebarRight === true,
      })}>
      <header className="user-profile-header">
        <span className="close-icon" onClick={handleUserSidebarRight}>
          <X size={14} />
        </span>
        <div className="header-profile-sidebar">
          {/* {Object.keys(selectedUser).length > 0 && selectedUser.avatar ? (
            <Avatar
              className="box-shadow-1 avatar-border"
              size="xl"
              img={selectedUser.avatar}
              imgHeight="70"
              imgWidth="70"
            />
          ) : (
            <Avatar
              className="box-shadow-1 avatar-border"
              size="xl"
              content={selectedUser.name}
              initials
              color="light-primary"
              imgHeight="70"
              imgWidth="70"
            />
          )} */}

          <h4 className="chat-user-name">{selectedUser.name}</h4>
        </div>
      </header>
      <PerfectScrollbar
        className="user-profile-sidebar-area"
        options={{ wheelPropagation: false }}>
        <h6 className="section-label mb-1">About</h6>
        <p>{selectedUser.bio}</p>
        <div className="personal-info">
          <h6 className="section-label mb-1 mt-3">Personal Information</h6>
          <ul className="list-unstyled">
            <li className="mb-1">
              <Mail className="mr-50" size={17} />
              <span className="align-middle">{selectedUser.email}</span>
            </li>
            <li className="mb-1">
              <PhoneCall className="mr-50" size={17} />
              <span className="align-middle">{selectedUser.phone}</span>
            </li>
          </ul>
        </div>
        <div className="more-options">
          <h6 className="section-label mb-1 mt-3">Options</h6>
          <ul className="list-unstyled">
            {/* <li className="cursor-pointer mb-1" onClick={deleteContact}>
              <Trash className="mr-50" size={17} />
              <span className="align-middle">Delete Contact</span>
            </li> */}
            <li className="cursor-pointer" onClick={blockContact}>
              <Slash className="mr-50" size={17} />
              <span className="align-middle">Block Contact</span>
            </li>
          </ul>
        </div>
      </PerfectScrollbar>
    </div>
  )
}

export default UserProfileSidebar
