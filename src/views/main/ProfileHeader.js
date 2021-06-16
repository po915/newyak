import { useState } from "react"
import { AlignJustify, Rss, Info, Image, Users, Edit } from "react-feather"
import { Card, CardImg, Collapse, Navbar, Nav, NavItem, NavLink, Button } from "reactstrap"
import defaultAvatar from "@src/assets/images/avatars/default.png"
import defaultBanner from "@src/assets/images/banner/banner-15.jpg"
import { useHistory } from "react-router-dom"
import classnames from "classnames"
import { useDispatch } from "react-redux"

const ProfileHeader = ({ data }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [activeTab, setActiveTab] = useState("feed")
	const history = useHistory()
	const dispatch = useDispatch()


	const toggle = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab)
			dispatch(setActiveTab(tab))
		}
	}

	return (
		<Card className="profile-header mb-2">
			{data.banner ? (
				<CardImg src={data.banner} alt="User Profile Image" top />
			) : (
				<CardImg src={defaultBanner} alt="User Profile Image" top />
			)}

			<div className="position-relative">
				<div className="profile-img-container d-flex align-items-center">
					<div className="profile-img">
						{data.avatar ? (
							<img className="rounded img-fluid" src={data.avatar} alt="Card image" />
						) : (
							<img className="rounded img-fluid" src={defaultAvatar} alt="Card image" />
						)}
					</div>
					<div className="profile-title ml-3">
						<h2 className="text-white">{data.name}</h2>
					</div>
				</div>
			</div>
			<div className="profile-header-nav">
				<Navbar className="justify-content-end justify-content-md-between w-100" expand="md" light>
					<Button color="" className="btn-icon navbar-toggler" onClick={toggle}>
						<AlignJustify size={21} />
					</Button>
					<Collapse navbar>
						<div className="profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0">
							<Nav className="mb-0" pills>
								<NavItem>
									<NavLink className="font-weight-bold" className={classnames({ active: activeTab === "feed" })}>
										<span className="d-none d-md-block">Feeds</span>
										<Rss className="d-block d-md-none" size={14} />
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="font-weight-bold" className={classnames({ active: activeTab === "media" })}>
										<span className="d-none d-md-block">Media</span>
										<Image className="d-block d-md-none" size={14} />
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="font-weight-bold" className={classnames({ active: activeTab === "friend" })}>
										<span className="d-none d-md-block">Friends</span>
										<Users className="d-block d-md-none" size={14} />
									</NavLink>
								</NavItem>
							</Nav>
							<Button color="primary">
								<Edit className="d-block d-md-none" size={14} />
								<span className="font-weight-bold d-none d-md-block">Edit</span>
							</Button>
						</div>
					</Collapse>
				</Navbar>
			</div>
		</Card>
	)
}

export default ProfileHeader
