import { Fragment, useState, useEffect } from "react"
import { API, graphqlOperation } from "aws-amplify"
import * as queries from "@src/graphql/queries"
import Sidebar from "../BlogSidebar"
import Avatar from "@components/avatar"
import { Link } from "react-router-dom"
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

			return (
				<Col key={item.id} md="6">
					<Card>
						<Link to={`/blog/detail/${item.id}`}>
							<CardImg
								className="img-fluid articleCardImg"
								src={item.coverImg ? item.coverImg : defaultCoverImg}
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
								{item.owner.avatar ? (
									<Avatar className="mr-50" img={item.owner.avatar} color="light-primary" imgHeight="24" imgWidth="24" />
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
