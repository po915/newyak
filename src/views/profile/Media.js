import { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap"
import { API, graphqlOperation } from "aws-amplify"
import * as queries from "@src/graphql/queries"
import "sweetalert2/src/sweetalert2.scss"
import ReactPlayer from "react-player/lazy"
import { SRLWrapper } from "simple-react-lightbox"

const Media = ({ userID }) => {
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const filter = {
      ownerID: {eq: userID},
      status: {eq: true}
    }
    API.graphql(
      graphqlOperation(queries.listMedias, { filter: filter })
    ).then((res) => {
      var tempImages = new Array()
      var tempVideos = new Array()
      res.data.listMedias.items.map((item, index) => {
        if (item.type.includes("image")) tempImages.push(item)
        if (item.type.includes("video")) tempVideos.push(item)
        setImages(tempImages)
        setVideos(tempVideos)
      })
    })
  }, [])

  return (
    <>
      <Row>
        <Col md="6">
          <h2>Photos</h2>
          <SRLWrapper>
            <Row>
              {images.length > 0
                ? images.map((image, index) => {
                    return (
                      <Col md="6" key={index}>
                        <Card>
                          <CardBody>
                            <Row className="mb-1">
                              <h4 className="ml-1 my-auto">{image.title}</h4>
                            </Row>
                            <a href={image.url}>
                              <img
                                src={image.url}
                                alt={image.title}
                                className="img-fluid imageItem"
                              />
                            </a>
                          </CardBody>
                        </Card>
                      </Col>
                    )
                  })
                : <p className="ml-2">There is no shared image yet.</p>}
            </Row>
          </SRLWrapper>
        </Col>
        <Col md="6">
          <h2>Videos</h2>
          <Row>
            {videos.length > 0
              ? videos.map((video, index) => {
                  return (
                    <Col md="12" key={index}>
                      <Card>
                        <CardBody>
                          <Row>
                            <h4 className="ml-1 my-atuo">{video.title}</h4>
                          </Row>
                          <ReactPlayer
                            url={video.url}
                            controls="true"
                            className="videoItem"
                          />
                        </CardBody>
                      </Card>
                    </Col>
                  )
                })
              : <p className="ml-2">There is no shared video yet.</p>}
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Media
