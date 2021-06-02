import { Fragment, useState, useEffect } from "react"
import axios from "axios"
import UILoader from "@components/ui-loader"
import ProfilePoll from "./ProfilePolls"
import ProfileAbout from "./ProfileAbout"
import ProfilePosts from "./ProfilePosts"
import ProfileHeader from "./ProfileHeader"
import { Row, Col, Button } from "reactstrap"
import ProfileTwitterFeeds from "./ProfileTwitterFeeds"
import ProfileLatestPhotos from "./ProfileLatestPhotos"
import ProfileSuggestedPages from "./ProfileSuggestedPages"
import ProfileFriendsSuggestions from "./ProfileFriendsSuggestions"

import "@styles/react/pages/page-profile.scss"

import { useSelector } from "react-redux"
import { API, graphqlOperation } from "aws-amplify"
import * as queries from "@src/graphql/queries"
import * as mutations from "@src/graphql/mutations"

const Profile = () => {
	const [data, setData] = useState(null)
	const [block, setBlock] = useState(false)

	const userInfo = useSelector((state) => state.userinfo.userInfo)

	const handleBlock = () => {
		setBlock(true)
		setTimeout(() => {
			setBlock(false)
		}, 2000)
	}

	useEffect(() => {
		axios.get("/profile/data").then((response) => setData(response.data))

	}, [])

	console.log(data)

	return (
		<Fragment>
			{data !== null ? (
				<div id="user-profile">
					<Row>
						<Col sm="12">
							<ProfileHeader data={userInfo} />
						</Col>
					</Row>
					<section id="profile-info">
						<Row>
							<Col lg={{ size: 3, order: 1 }} sm={{ size: 12 }} xs={{ order: 2 }}>
								<ProfileAbout data={data.userAbout} />
							</Col>
							<Col lg={{ size: 6, order: 2 }} sm={{ size: 12 }} xs={{ order: 1 }}>
								<ProfilePosts data={data.post} />
							</Col>
							<Col lg={{ size: 3, order: 3 }} sm={{ size: 12 }} xs={{ order: 3 }}>
								<ProfileLatestPhotos data={data.latestPhotos} />
								<ProfileFriendsSuggestions data={data.suggestions} />
							</Col>
						</Row>
						<Row>
							<Col className="text-center" sm="12">
								<Button color="primary" className="border-0 mb-1 profile-load-more" size="sm" onClick={handleBlock}>
									<UILoader blocking={block} overlayColor="rgba(255,255,255, .5)">
										<span> Load More</span>
									</UILoader>
								</Button>
							</Col>
						</Row>
					</section>
				</div>
			) : null}
		</Fragment>
	)
}

export default Profile
