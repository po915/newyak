import { Fragment, useState, useEffect } from "react"

import { Row, Button, Col, Card, CardBody, CardTitle, CardImg } from "reactstrap"
import Amplify, { Auth, API, Storage, graphqlOperation } from "aws-amplify"
import * as queries from "@src/graphql/queries"
import * as mutations from "@src/graphql/mutations"
import defaultCoverImg from "@src/assets/images/slider/04.jpg"
import "@styles/base/pages/page-blog.scss"
import { useSelector } from "react-redux"
import { Edit } from "react-feather"
import { useHistory } from "react-router-dom"

import loadingImg from "@src/assets/images/icons/loading.svg"

const BlogList = () => {
	const [draftData, setDraftData] = useState([])
	const userInfo = useSelector((state) => state.userinfo.userInfo)
	const userID = userInfo.id
	const history = useHistory()
	const [visiablity, setVisiablity] = useState("show")

	useEffect(async () => {
		const articles = await API.graphql(graphqlOperation(queries.articleByStatus, { status: "draft" }))
		const drafts = []
		articles.data?.articleByStatus?.items.map((item, index) => {
			if (item.ownerID == userID) {
				drafts.push(item)
			}
		})
		setDraftData(drafts)
		setVisiablity("hidden")
	}, [])

	const publish = (event, id) => {
		event.target.innerHTML = "Pubish<i class='fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom'></i>"
		const info = {
			id: id,
			status: "published",
		}

		API.graphql(graphqlOperation(mutations.updateArticle, { input: info }))
			.then((res) => {
				console.log(res, "Article Publish res")
				history.push("/blog/list")
			})
			.catch((err) => {
				console.error(err, "Article Publish Err")
			})
	}

	const editArticle = (id) => {
		history.push("/blog/edit/"+id)
	}

	const deleteArticle = (id) => {
		const input = {
			id: id,
		}

		API.graphql(graphqlOperation(mutations.deleteArticle, { input: input }))
			.then((res) => {
				console.log(res, "article delete result")
			})
			.catch((err) => {
				console.log(err, "article delete result")
			})
		history.push("/pages/blog/draft")
	}

	return (
		<Fragment>
			<div className={visiablity}>
				<img src={loadingImg} className="loadingIcon" />
			</div>
			<h2>Your drafts</h2>
			<Row className="match-height">
				{draftData.map((item, index) => {
					return (
						<Col md="4" sm="6" key={"draft" + index}>
							<Card>
								<CardImg
									top
									src={item.coverImg ? item.coverImg : defaultCoverImg}
									alt="Card cap"
									className="articleCardImg"
								/>
								<CardBody>
									<CardTitle tag="h4" className="articleCardTitle">
										{item.title}
									</CardTitle>
									<Row>
										<Col lg="4">
											<Button
												className="w-100 px-0 mb-1"
												color="primary"
												onClick={(e) => publish(e, item.id)}
											>
												Publish
											</Button>
										</Col>
										<Col lg="4">
											<Button
												className="w-100 px-0 mb-1"
												color="primary"
												outline
												onClick={() => editArticle(item.id)}
											>
												Edit
											</Button>
										</Col>
										<Col lg="4">
											<Button
												className="w-100 px-0"
												color="secondary"
												outline
												onClick={() => deleteArticle(item.id)}
											>
												Delete
												<i className="fa fa-trash"></i>
											</Button>
										</Col>
									</Row>
								</CardBody>
							</Card>
						</Col>
					)
				})}
			</Row>
		</Fragment>
	)
}

export default BlogList
