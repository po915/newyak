import { API, graphqlOperation } from "aws-amplify"
import { useEffect } from "react"
import { Card, CardBody, Row, Col } from "reactstrap"
import * as mutations from "@src/graphql/mutations"
import * as queries from "@src/graphql/queries"
import * as subscriptions from "@src/graphql/subscriptions"
import { useSelector } from "react-redux"

const ProfileLatestPhotos = ({ data }) => {
  const currentUser = useSelector((state) => state.userinfo.userInfo)

  useEffect(() => {
    const getMedia = {
      ownerID: { eq: currentUser.id },
    }
    // API.graphql(
    //   graphqlOperation(queries.listMedia, { filter: { title: { eq: title } } })
    // )
  }, [])

  const renderPhotos = () => {
    return data.map((item, index) => {
      return (
        <Col key={index} md="4" xs="6" className="profile-latest-img">
          <a href="/" onClick={(e) => e.preventDefault()}>
            <img
              className="img-fluid rounded"
              src={item.img}
              alt="latest-photo"
            />
          </a>
        </Col>
      )
    })
  }

  return (
    <Card>
      <CardBody>
        <h5 className="mb-0">Latest Photos</h5>
        <Row>{renderPhotos()}</Row>
      </CardBody>
    </Card>
  )
}

export default ProfileLatestPhotos
