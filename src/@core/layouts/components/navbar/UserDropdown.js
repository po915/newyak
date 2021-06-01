// ** React Imports
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Utils
import { isUserLoggedIn } from "@utils"

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux"
import { handleLogout } from "@store/actions/auth"

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap"
import { Settings, Power } from "react-feather"

const UserDropdown = () => {
	// ** Store Vars
	const dispatch = useDispatch()
	const baseImageURL = "https://yakbucket104727-dev.s3.amazonaws.com/image/"
	// ** State
	const [userData, setUserData] = useState(null)
	const [avatar, setAvatar] = useState()
	const userInfo = useSelector((state) => state.userinfo.userInfo)

	//** ComponentDidMount
	useEffect(() => {
		if (isUserLoggedIn() !== null) {
			setUserData(JSON.parse(localStorage.getItem("userData")))
		}
		if (userInfo.avatar) {
			setAvatar(baseImageURL + userInfo.avatar)
		}
	}, [])

	return (
		<div>
			{userInfo ? (
				<UncontrolledDropdown tag="li" className="dropdown-user nav-item">
					<DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}>
						<div className="user-nav d-sm-flex d-none">
							<span className="user-name font-weight-bold">{userInfo.name}</span>
						</div>
						{avatar ? (
							<Avatar
								img={avatar}
								color="light-primary"
								imgHeight="40"
								imgWidth="40"
								status="online"
							/>
						) : (
							<Avatar
								content={userInfo.name}
								color="light-primary"
								initials
								imgHeight="40"
								imgWidth="40"
								status="online"
							/>
						)}
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem tag={Link} to="/account-settings">
							<Settings size={14} className="mr-75" />
							<span className="align-middle">Settings</span>
						</DropdownItem>
						<DropdownItem tag={Link} to="/login" onClick={() => dispatch(handleLogout())}>
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
