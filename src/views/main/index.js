import { Fragment, useState, useEffect } from "react"
import classnames from "classnames"
import ProfileAbout from "./ProfileAbout"
import ProfilePosts from "./ProfilePosts"
import Media from "./Media"
import {
  Row,
  Col,
  Button,
  TabContent,
  TabPane,
  Card,
  CardImg,
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap"
import { AlignJustify, Rss, Info, Image, Users, Edit } from "react-feather"
import defaultAvatar from "@src/assets/images/avatars/default.png"
import ProfileFriendsSuggestions from "./ProfileFriendsSuggestions"

import "@styles/react/pages/page-profile.scss"

import { useSelector } from "react-redux"

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("1")
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  const userInfo = useSelector((state) => state.userinfo.userInfo)



  return (
    <Fragment>
      {userInfo !== null ? (
        <div id="user-profile">
          <Row>
            <Col sm="12">
              <Card className="profile-header mb-2">
                {userInfo.banner ? (
                  <CardImg src={userInfo.banner} alt="User Profile Image" top />
                ) : (
                  <CardImg
                    src="https://picsum.photos/1400/300"
                    alt="User Profile Image"
                    top
                  />
                )}

                <div className="position-relative">
                  <div className="profile-img-container d-flex align-items-center">
                    <div className="profile-img">
                      {userInfo.avatar ? (
                        <img
                          className="rounded img-fluid"
                          src={userInfo.avatar}
                          alt="Card image"
                        />
                      ) : (
                        <img
                          className="rounded img-fluid"
                          src={defaultAvatar}
                          alt="Card image"
                        />
                      )}
                    </div>
                    <div className="profile-title ml-3">
                      <h2 className="text-white">{userInfo.name}</h2>
                    </div>
                  </div>
                </div>
                <div className="profile-header-nav">
                  <Navbar
                    className="justify-content-end justify-content-md-between w-100"
                    expand="md"
                    light>
                    <Button
                      color=""
                      className="btn-icon navbar-toggler"
                      onClick={toggle}>
                      <AlignJustify size={21} />
                    </Button>
                    <Collapse isOpen={isOpen} navbar>
                      <div className="profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0">
                        <Nav className="mb-0" pills>
                          <NavItem>
                            <NavLink
                              className="font-weight-bold"
                              className={classnames({
                                active: activeTab === "1",
                              })}
                              onClick={() => {
                                toggle("1")
                              }}>
                              <span className="d-none d-md-block">Feeds</span>
                              <Rss className="d-block d-md-none" size={14} />
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className="font-weight-bold"
                              className={classnames({
                                active: activeTab === "2",
                              })}
                              onClick={() => {
                                toggle("2")
                              }}>
                              <span className="d-none d-md-block">Media</span>
                              <Image className="d-block d-md-none" size={14} />
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </div>
                    </Collapse>
                  </Navbar>
                </div>
              </Card>
            </Col>
          </Row>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <Row>
                    <Col
                      lg={{ size: 3, order: 1 }}
                      sm={{ size: 12 }}
                      xs={{ order: 2 }}>
                      <p>About me</p>
                      <ProfileAbout data={userInfo} />
                    </Col>
                    <Col
                      lg={{ size: 6, order: 2 }}
                      sm={{ size: 12 }}
                      xs={{ order: 1 }}>
                      <p>Recent Posts on the platform</p>
                      <ProfilePosts />
                    </Col>
                    <Col
                      lg={{ size: 3, order: 3 }}
                      sm={{ size: 12 }}
                      xs={{ order: 3 }}>
                      <p>My Friends</p>
                      <ProfileFriendsSuggestions />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Media />
            </TabPane>
          </TabContent>
        </div>
      ) : null}
    </Fragment>
  )
}

export default Profile
