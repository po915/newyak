import { Fragment, useState, useEffect } from "react"
import { API, graphqlOperation } from "aws-amplify"
import * as queries from "@src/graphql/queries"
import * as mutations from "@src/graphql/mutations"
import Sidebar from "../BlogSidebar"
import Avatar from "@components/avatar"
import { Link } from "react-router-dom"
import { MessageSquare } from "react-feather"
import {
	Row,
	Col,
	Card,
	CardBody,
	CardTitle,
	CardImg,
	Media
} from "reactstrap"

import "@styles/base/pages/page-blog.scss"
import defaultCoverImg from "@src/assets/images/slider/04.jpg"
import loadingImg from "@src/assets/images/icons/loading.svg"

const BlogList = () => {
	const [data, setData] = useState(null)
	const baseImageURL = "https://yakbucket104727-dev.s3.amazonaws.com/image/"

	useEffect(async () => {
		const articles = await API.graphql(graphqlOperation(queries.articleByStatus, { status: "published" }))
		const data = []
		articles.data?.articleByStatus?.items.map((item, index) => {
			data.push(item)
		})
		setData(data)
	}, [])

	const renderRenderList = () => {
		return data.map((item) => {
			var editorAvatar = baseImageURL + item.owner.avatar

			return (
				<Col key={item.id} md="6">
					<Card>
						<Link to={`/blog/detail/${item.id}`}>
							<CardImg
								className="img-fluid articleCardImg"
								src={item.coverImg ? baseImageURL + item.coverImg : defaultCoverImg}
								alt={item.title}
								top
							/>
						</Link>
						<CardBody>
							<CardTitle tag="h4" className="articleCardTitle">
								<Link className="blog-title-truncate text-body-heading" to={`/blog/detail/${item.id}`}>
									{item.title}
								</Link>
							</CardTitle>
							<Media>
								{editorAvatar ? (
									<Avatar className="mr-50" img={editorAvatar} color="light-primary" imgHeight="24" imgWidth="24" />
								) : (
									<Avatar
										className="mr-50"
										color="light-primary"
										content={item.owner.name}
										initials
										imgHeight="24"
										imgWidth="24"
									/>
								)}

								<Media body className="my-auto">
									<small className="text-muted mr-25">by</small>
									<small>
										<a className="text-body" href="/" onClick={(e) => e.preventDefault()}>
											{item.owner.name}
										</a>
									</small>
								</Media>
							</Media>
							<hr />
							<div className="d-flex justify-content-between align-items-center">
								{/* <Link to={`/blog/detail/${item.id}`}>
									<MessageSquare size={15} className="text-body mr-50" />
									<span className="text-body font-weight-bold">10 Comments</span>
								</Link> */}
								<Link className="font-weight-bold" to={`/blog/detail/${item.id}`}>
									Read More
								</Link>
							</div>
						</CardBody>
					</Card>
				</Col>
			)
		})
	}

	return (
		<Fragment>
			<div className="blog-wrapper">
				<div className="content-detached content-left">
					<div className="content-body">
						{data !== null ? (
							<div className="blog-list-wrapper">
								<Row>{renderRenderList()}</Row>
								{/* <Row>
									<Col sm="12">
										<Pagination className="d-flex justify-content-center mt-2">
											<PaginationItem className="prev-item">
												<PaginationLink href="#" onClick={(e) => e.preventDefault()}></PaginationLink>
											</PaginationItem>
											<PaginationItem>
												<PaginationLink href="#" onClick={(e) => e.preventDefault()}>
													1
												</PaginationLink>
											</PaginationItem>
											<PaginationItem>
												<PaginationLink href="#" onClick={(e) => e.preventDefault()}>
													2
												</PaginationLink>
											</PaginationItem>
											<PaginationItem>
												<PaginationLink href="#" onClick={(e) => e.preventDefault()}>
													3
												</PaginationLink>
											</PaginationItem>
											<PaginationItem active>
												<PaginationLink href="#" onClick={(e) => e.preventDefault()}>
													4
												</PaginationLink>
											</PaginationItem>
											<PaginationItem>
												<PaginationLink href="#" onClick={(e) => e.preventDefault()}>
													5
												</PaginationLink>
											</PaginationItem>
											<PaginationItem>
												<PaginationLink href="#" onClick={(e) => e.preventDefault()}>
													6
												</PaginationLink>
											</PaginationItem>
											<PaginationItem>
												<PaginationLink href="#" onClick={(e) => e.preventDefault()}>
													7
												</PaginationLink>
											</PaginationItem>
											<PaginationItem className="next-item">
												<PaginationLink href="#" onClick={(e) => e.preventDefault()}></PaginationLink>
											</PaginationItem>
										</Pagination>
									</Col>
								</Row> */}
							</div>
						) : (
							<div className="show">
								<img src={loadingImg} className="loadingIcon" />
							</div>
						)}
					</div>
				</div>
				{data ? <Sidebar /> : null}
			</div>
		</Fragment>
	)
}

export default BlogList
