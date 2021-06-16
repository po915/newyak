// ** React Imports
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// ** Custom Components
import Avatar from "@components/avatar"
// ** Store & Actions
import { useDispatch, useSelector } from "react-redux"
import { handleLogout } from "@store/actions/auth"

// ** Third Party Components
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap"
import { User, Settings, Power } from "react-feather"

const UserDropdown = () => {
  const dispatch = useDispatch()

  const [avatar, setAvatar] = useState(null)
  const userInfo = useSelector((state) => state.userinfo.userInfo)

  useEffect(() => {
    if (userInfo?.avatar) {
      setAvatar(userInfo.avatar)
    }
  }, [])

  return (
    <div>
      {userInfo ? (
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle
            href="/"
            tag="a"
            className="nav-link dropdown-user-link"
            onClick={(e) => e.preventDefault()}>
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name font-weight-bold">
                {userInfo.name}
              </span>
            </div>
            {avatar ? (
              <Avatar
                img={avatar}
                color="light-primary"
                imgHeight="40"
                imgWidth="40"
              />
            ) : (
              <Avatar
                content={userInfo.name}
                color="light-primary"
                initials
                imgHeight="40"
                imgWidth="40"
              />
            )}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag={Link} to={"/user/" + userInfo.id}>
              <User size={14} className="mr-75" />
              <span className="align-middle">My Profile</span>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem tag={Link} to="/account-settings">
              <Settings size={14} className="mr-75" />
              <span className="align-middle">Settings</span>
            </DropdownItem>
            <DropdownItem
              tag={Link}
              to="/login"
              onClick={() => dispatch(handleLogout())}>
              <Power size={14} className="mr-75" />
              <span className="align-middle">Logout</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ) : null}
    </div>
  )
}

export default UserDropdown
