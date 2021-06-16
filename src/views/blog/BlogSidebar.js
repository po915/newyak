import { useEffect, useState, Fragment } from "react"
import classnames from "classnames"
import * as Icon from "react-feather"
import { Link } from "react-router-dom"
import {
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Media,
} from "reactstrap"

import { API, graphqlOperation } from "aws-amplify"
import * as queries from "@src/graphql/queries"

const BlogSidebar = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    API.graphql(
      graphqlOperation(queries.articleByStatus, { status: "published", limit: 5 })
    ).then((res) => {
      setArticles(res.data.articleByStatus.items)
    })
  }, [])

  const renderRecentPosts = () => {
    return articles.map((article, index) => {
      return (
        <Media
          key={index}
          className={classnames({
            "mb-2": index !== articles.length - 1,
          })}>
          <Link className="mr-2" to={`/blog/detail/${article.id}`}>
            <img
              className="rounded"
              src={article.coverImg}
              alt={article.title}
              width="100"
              height="70"
            />
          </Link>
          <Media body>
            <h6 className="blog-recent-post-title">
              <Link
                className="text-body-heading recent-heading"
                to={`/blog/detail/${article.id}`}>
                {article.title}
              </Link>
            </h6>
            {/* <div className="text-muted mb-0">{article.createdAt}</div> */}
          </Media>
        </Media>
      )
    })
  }

  return (
    <div className="sidebar-detached sidebar-right">
      <div className="sidebar">
        <div className="blog-sidebar right-sidebar my-2 my-lg-0">
          <div className="right-sidebar-content">
            <div className="blog-search">
              <InputGroup className="input-group-merge">
                <Input placeholder="Search here" />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Icon.Search size={14} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
            {articles.length >0 !== null ? (
              <Fragment>
                <div className="blog-recent-posts mt-3">
                  <h6 className="section-label">Recent Posts</h6>
                  <div className="mt-75">{renderRecentPosts()}</div>
                </div>
              </Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSidebar
