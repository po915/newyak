import { Fragment, useEffect, useState } from "react"
import classnames from "classnames"
import Avatar from "@components/avatar"
import { Heart, MessageSquare, Share2 } from "react-feather"
import {
  Card,
  CardBody,
  CardText,
  Row,
  Col,
  UncontrolledTooltip,
  Input,
  Label,
  Button,
} from "reactstrap"
import { API, graphqlOperation } from "aws-amplify"
import * as mutations from "@src/graphql/mutations"
import * as queries from "@src/graphql/queries"
import * as subscriptions from "@src/graphql/subscriptions"
import { useHistory } from "react-router-dom"

const ProfilePosts = () => {
  const [articles, setArticles] = useState([])
  const [nextToken, setNextToken] = useState()

  const history = useHistory()

  useEffect(() => {
    API.graphql(graphqlOperation(queries.listArticles, { limit: 5 })).then(
      (res) => {
        setArticles(res.data.listArticles.items)
        setNextToken(res.data.nextToken)
      }
    )
  }, [])

  return (
    <>
      {articles.length > 0
        ? articles.map((article, index) => {
            return (
              <Card className="post" key={index}>
                <CardBody>
                  <div className="d-flex justify-content-start align-items-center mb-1">
                    {article.owner.avatar ? (
                      <Avatar
                        className="mr-1"
                        img={article.owner.avatar}
                        imgHeight="50"
                        imgWidth="50"
                      />
                    ) : (
                      <Avatar
                        className="mr-1"
                        content={article.owner.name}
                        initials
                        imgHeight="50"
                        imgWidth="50"
                      />
                    )}
                    <div className="profile-user-info">
                      <h6 className="mb-0">{article.owner.name}</h6>
                      <small className="text-muted">{article.createdAt}</small>
                    </div>
                  </div>
                  <CardText>{article.title}</CardText>
                  <img
                    src={article.coverImg}
                    alt={article.title}
                    className="img-fluid rounded mb-75 postImage"
                  />
                  <Row>
                      <Button.Ripple
                        color="primary"
                        className="ml-auto mr-1"
                        onClick={() => {history.push("/blog/detail/" + article.id)}}
                        size="md">
                        View Details
                      </Button.Ripple>
                  </Row>
                </CardBody>
              </Card>
            )
          })
        : null}
    </>
  )
}
export default ProfilePosts
