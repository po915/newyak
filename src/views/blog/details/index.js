import { Fragment, useState, useEffect } from "react"
import Sidebar from "../BlogSidebar"
import Avatar from "@components/avatar"
import { API, graphqlOperation } from "aws-amplify"
import * as queries from "@src/graphql/queries"
import * as mutations from "@src/graphql/mutations"
import { CornerUpLeft } from "react-feather"
import {
	Row,
	Col,
	Card,
	CardBody,
	CardTitle,
	CardText,
	CardImg,
	Media,
	Form,
	Input,
	Button,
	FormGroup,
	CustomInput,
} from "reactstrap"

import "@styles/base/pages/page-blog.scss"
import { useSelector } from "react-redux"

const BlogDetails = (props) => {
	const userInfo = useSelector((state) => state.userinfo.userInfo)
	const [data, setData] = useState()
	const [avatar, setAvatar] = useState()
	const [comment, setComment] = useState()
	const [showReply, setShowReply] = useState(false)
	const id = props.match.params.id
	const baseImageURL = "https://yakbucket104727-dev.s3.amazonaws.com/image/"

	useEffect(async () => {
		const article = await API.graphql(graphqlOperation(queries.getArticle, { id: id }))
		setData(article.data.getArticle)
		if (article.data.getArticle.owner.avatar) {
			setAvatar(baseImageURL + article.data.getArticle.owner.avatar)
		}
	}, [])

	// console.log("ArticleData", data)

	const postComment = () => {
		const comment_data = {
			content: comment,
			ownerID: userInfo.id,
			articleID: data.id,
		}
		API.graphql(graphqlOperation(mutations.createComment, { input: comment_data })).then((res) => {
			console.log(res)
		})
		// API.graphql(graphqlOperation(queries.commentByArticle, { articleID: "6384a22e-f6a2-4c3e-9a12-76825e78d487" })).then(
		// 	(res) => {
		// 		console.log(res)
		// 	}
		// )
	}

	const replyShow = (e) => {
		e.preventDefault()
		setShowReply(true)
	}

	const replyHide = () => {
		setShowReply(false)
	}

	const renderComments = (comments) => {
		return comments.map((comment) => {
			return (
				<Card className="mb-3" key={comment.id}>
					<CardBody>
						<Media>
							{/* <Avatar className='mr-75' img={baseImageURL + comment.owner.avatar} width='38' height='38' /> */}
							<Media body>
								{/* <h6 className='font-weight-bolder mb-25'>{comment.owner.name}</h6>
	              <CardText>{comment.createdAt}</CardText> */}
								<CardText>{comment.content}</CardText>
								{showReply ? (
									<Form className="form" onSubmit={(e) => e.preventDefault()}>
										<Row>
											<Col sm="12">
												<FormGroup className="mb-2">
													<Input
														className="mb-2"
														type="textarea"
														rows="4"
														placeholder="Reply..."
														onChange={(e) => setComment(e.target.value)}
													/>
												</FormGroup>
											</Col>
											<Col sm="12">
												<Button.Ripple color="primary">Reply</Button.Ripple>
												<Button.Ripple color="primary" className="ml-2" outline onClick={replyHide}>
													Dismiss
												</Button.Ripple>
											</Col>
										</Row>
									</Form>
								) : (
									<a href="/" onClick={(e) => replyShow(e)}>
										<div className="d-inline-flex align-items-center">
											<CornerUpLeft size={18} className="mr-50" />
											<span>Reply</span>
										</div>
									</a>
								)}
							</Media>
						</Media>
					</CardBody>
				</Card>
			)
		})
	}

	return (
		<Fragment>
			{data ? (
				<div className="blog-wrapper">
					<div className="content-detached content-left">
						<div className="content-body">
							<Row>
								<Col sm="12">
									<Card className="mb-3">
										<CardImg src={baseImageURL + data.coverImg} className="img-fluid" top />
										<CardBody>
											<CardTitle tag="h4">{data.title}</CardTitle>
											<Media>
												<Avatar
													className="mr-50"
													color="light-primary"
													img={avatar}
													content={data.owner.name}
													initials
												/>
												<Media body>
													<small className="text-muted mr-25">by</small>
													<small>
														<a className="text-body" href="/" onClick={(e) => e.preventDefault()}>
															{data.owner.name}
														</a>
													</small>
													<span className="text-muted ml-50 mr-25">|</span>
													<small className="text-muted">{data.createdAt}</small>
												</Media>
											</Media>
											<div
												className="article-content my-3"
												dangerouslySetInnerHTML={{
													__html: data.content,
												}}
											></div>
											<hr />
											<Media>
												<Avatar
													className="mr-50"
													color="light-primary"
													img={avatar}
													content={data.owner.name}
													initials
												/>
												<Media body>
													<h6 className="font-weight-bolder">{data.owner.name}</h6>
													<CardText className="mb-0">{data.owner.bio}</CardText>
												</Media>
											</Media>
										</CardBody>
									</Card>
								</Col>
								{data.comments.items.length > 0 ? (
									<Col sm="12">
										<h6 className="section-label">Comment</h6>
										{renderComments(data.comments.items)}
									</Col>
								) : null}

								<Col sm="12">
									<h6 className="section-label">Leave a Comment</h6>
									<Card>
										<CardBody>
											<Form className="form" onSubmit={(e) => e.preventDefault()}>
												<Row>
													<Col sm="12">
														<FormGroup className="mb-2">
															<Input
																className="mb-2"
																type="textarea"
																rows="4"
																placeholder="Comment"
																onChange={(e) => setComment(e.target.value)}
															/>
														</FormGroup>
													</Col>
													<Col sm="12">
														<Button.Ripple color="primary" onClick={postComment}>
															Post Comment
														</Button.Ripple>
													</Col>
												</Row>
											</Form>
										</CardBody>
									</Card>
								</Col>
							</Row>
						</div>
					</div>
					<Sidebar />
				</div>
			) : null}
		</Fragment>
	)
}

export default BlogDetails
