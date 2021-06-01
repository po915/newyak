import { Fragment, useState, useEffect } from "react"
import Sidebar from "../BlogSidebar"
import Avatar from "@components/avatar"
import Amplify, { Auth, API, Storage, graphqlOperation } from "aws-amplify"
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

const BlogDetails = (props) => {
	const [data, setData] = useState()
	const [avatar, setAvatar] = useState()
	const id = props.match.params.id
	const baseImageURL = "https://yakbucket104727-dev.s3.amazonaws.com/image/"

	useEffect(async () => {
		const article = await API.graphql(graphqlOperation(queries.getArticle, { id: id }))
		setData(article.data.getArticle)
		if (article.data.getArticle.owner.avatar) {
			setAvatar(baseImageURL + article.data.getArticle.owner.avatar)
		}
	}, [])

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
								<a href="/" onClick={(e) => e.preventDefault()}>
									<div className="d-inline-flex align-items-center">
										<CornerUpLeft size={18} className="mr-50" />
										<span>Reply</span>
									</div>
								</a>
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
												<Avatar className="mr-50" color="light-primary" img={avatar} content={data.owner.name} initials />
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
												<Avatar className="mr-50" color="light-primary" img={avatar} content={data.owner.name} initials />
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
															<Input className="mb-2" type="textarea" rows="4" placeholder="Comment" />
														</FormGroup>
													</Col>
													<Col sm="12">
														<Button.Ripple color="primary">Post Comment</Button.Ripple>
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