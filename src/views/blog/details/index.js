import { Fragment, useState, useEffect } from "react"
import Sidebar from "../BlogSidebar"
import Avatar from "@components/avatar"
import { API, graphqlOperation } from "aws-amplify"
import * as queries from "@src/graphql/queries"
import * as mutations from "@src/graphql/mutations"
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
} from "reactstrap"

import "@styles/base/pages/page-blog.scss"
import { useSelector } from "react-redux"

const BlogDetails = (props) => {
	const userInfo = useSelector((state) => state.userinfo.userInfo)
	const [data, setData] = useState()
	const [avatar, setAvatar] = useState()
	const [comment, setComment] = useState()
	const [commentData, setCommentData] = useState()
	const [reply, setReply] = useState()
	const [replyData, setReplyData] = useState([])
	const [showReply, setShowReply] = useState(false)
	const id = props.match.params.id
	const baseImageURL = "https://yakbucket104727-dev.s3.amazonaws.com/image/"
	/////////////////////////////////
	useEffect(async () => {
		const article = await API.graphql(graphqlOperation(queries.getArticle, { id: id }))
		setData(article.data.getArticle)

		const rawComments = await API.graphql(
			graphqlOperation(queries.commentByArticle, { articleID: article.data.getArticle.id })
		)

		setCommentData(rawComments.data?.commentByArticle?.items)
		if (article.data.getArticle.owner.avatar) {
			setAvatar(baseImageURL + article.data.getArticle.owner.avatar)
		}
	}, [])
	/////////////////////////////////////////
	const postComment = () => {
		const comment_data = {
			content: comment,
			ownerID: userInfo.id,
			articleID: data.id,
		}
		API.graphql(graphqlOperation(mutations.createComment, { input: comment_data }))
			.then((res) => {
				console.log(res, "commentPost Result")
			})
			.catch((err) => {
				console.error(err, "commentPost Error")
			})
	}
	/////////////////////////////////////////
	const addReply = (commentID) => {
		const reply_data = {
			content: reply,
			ownerID: userInfo.id,
			commentID: commentID,
		}
		API.graphql(graphqlOperation(mutations.createReply, { input: reply_data }))
			.then((res) => {
				setShowReply(false)
				console.log(res, "addReply result")
			})
			.catch((err) => {
				console.error(err, "addReply error")
			})
	}
	/////////////////////////////////////////
	// const renderReply = (id) => {
	// 	API.graphql(graphqlOperation(queries.replyByPost, { commentID: id }))
	// 		.then((res) => {
	// 			setReplyData(res.data.replyByPost.items)
	// 		})
	// 		.catch((err) => {
	// 			console.error(err, "reply DATA error")
	// 		})
	// 	if (replyData.length > 0) {
	// 		return replyData.map((item, index) => {
	// 			return (
	// 				<Media className="reply my-1" key={item.id}>
	// 					{item.owner.avatar ? (
	// 						<Avatar className="mr-75" img={baseImageURL + item.owner.avatar} width="38" height="38" />
	// 					) : (
	// 						<Avatar className="mr-75" content={item.owner.name} initials width="38" height="38" />
	// 					)}

	// 					<Media body>
	// 						<h6 className="font-weight-bolder mb-25">{item.owner.name}</h6>
	// 						<CardText>{item.createdAt}</CardText>
	// 						<CardText>{item.content}</CardText>
	// 					</Media>
	// 				</Media>
	// 			)
	// 		})
	// 	}
	// }
	/////////////////////////////////////////
	const replyShow = (e) => {
		e.preventDefault()
		setShowReply(true)
	}

	const replyHide = () => {
		setShowReply(false)
	}

	const renderComments = (comments) => {
		return comments.map((comment) => {
			var commenterName = comment.owner.name
			var commenterAvatar = baseImageURL + comment.owner.avatar

			return (
				<Card className="mb-3" key={comment.id}>
					<CardBody>
						<Media>
							{comment.owner.avatar ? (
								<Avatar className="mr-75" img={commenterAvatar} width="38" height="38" />
							) : (
								<Avatar className="mr-75" content={commenterName} color="light-primary" initials width="38" height="38" />
							)}

							<Media body>
								<h6 className="font-weight-bolder mb-25">{comment.owner.name}</h6>
								<CardText>{comment.createdAt}</CardText>
								<CardText>{comment.content}</CardText>
								{/* {renderReply(comment.id)} */}

								{/* {showReply ? (
									<Form className="form" onSubmit={(e) => e.preventDefault()}>
										<Row>
											<Col sm="12">
												<FormGroup className="mb-2">
													<Input
														className="mb-2"
														type="textarea"
														rows="4"
														placeholder="Reply..."
														onChange={(e) => setReply(e.target.value)}
													/>
												</FormGroup>
											</Col>
											<Col sm="12">
												<Button.Ripple
													color="primary"
													onClick={() => {
														addReply(comment.id)
													}}
												>
													Reply
												</Button.Ripple>
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
								)} */}
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
										{commentData ? renderComments(commentData) : null}
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
