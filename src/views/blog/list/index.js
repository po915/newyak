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
// import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"

import loadingImg from "@src/assets/images/icons/loading.svg"

const BlogList = () => {
	const [articleData, setArticleData] = useState([])
	const userInfo = useSelector((state) => state.userinfo.userInfo)
	const userID = userInfo.id
	const history = useHistory()
	const [visiablity, setVisiablity] = useState("show")

	useEffect(async () => {
		const articles = await API.graphql(graphqlOperation(queries.articleByStatus, { status: "published" }))
		const data = []
		articles.data?.articleByStatus?.items.map((item, index) => {
			if (item.ownerID == userID) {
				data.push(item)
			}
		})
		setArticleData(data)
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
		history.push("/blog/draft")
	}

	return (
		<Fragment>
			<div className={visiablity}>
				<img src={loadingImg} className="loadingIcon" />
			</div>
			<h2>Your published articles.</h2>
			{articleData.length > 0 ? (
				<Row className="match-height">
					{articleData.map((item, index) => {
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
											<Col md="6">
												<Button
													className="w-100 px-0 mb-1"
													color="primary"
													outline
													onClick={() => editArticle(item.id)}
												>
													Edit
												</Button>
											</Col>
											<Col md="6">
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
			) : (
				<p>You have no published article yet. Please add new.</p>
			)}
		</Fragment>
	)
}

export default BlogList
