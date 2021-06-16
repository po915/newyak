import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  CustomInput,
  Card,
  CardBody,
} from "reactstrap"
import UILoader from "@components/ui-loader"

import { API, graphqlOperation, Storage } from "aws-amplify"
import * as mutations from "@src/graphql/mutations"
import * as queries from "@src/graphql/queries"
import S3FileUpload from "react-s3"
import { v4 as uuid } from "uuid"

import { Trash } from "react-feather"

import { FilePond, registerPlugin } from "react-filepond"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginMediaPreview from "filepond-plugin-media-preview"
import FilePondPluginFileRename from "filepond-plugin-file-rename"
import "filepond/dist/filepond.min.css"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import "filepond-plugin-media-preview/dist/filepond-plugin-media-preview.min.css"

import Swal from "sweetalert2/dist/sweetalert2.js"
import "sweetalert2/src/sweetalert2.scss"

import ReactPlayer from "react-player/lazy"

import { SRLWrapper } from "simple-react-lightbox"

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginMediaPreview,
  FilePondPluginFileRename
)

const Media = () => {
  const currentUser = useSelector((state) => state.userinfo.userInfo)
  const [formModal, setFormModal] = useState(false)
  const [title, setTitle] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [newMedia, setNewMedia] = useState()
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])

  const S3config = {
    bucketName: "yakbucket104727-dev",
    dirName: "image",
    region: "us-east-1",
    accessKeyId: "AKIAZWJ3ZC3OVURJRFFQ",
    secretAccessKey: "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",
  }

  useEffect(() => {
    API.graphql(
      graphqlOperation(queries.mediaByOwner, { ownerID: currentUser.id })
    ).then((res) => {
      var tempImages = new Array()
      var tempVideos = new Array()
      res.data.mediaByOwner.items.map((item, index) => {
        if (item.type.includes("image")) tempImages.push(item)
        if (item.type.includes("video")) tempVideos.push(item)
        setImages(tempImages)
        setVideos(tempVideos)
      })
    })
  }, [])

  const mediaUpload = () => {
    setUploading(true)
    if (title && newMedia.length > 0) {
      try {
        S3FileUpload.uploadFile(newMedia[0].file, S3config).then((res) => {
          const media = {
            ownerID: currentUser.id,
            title: title,
            type: newMedia[0].fileType,
            status: isPublic,
            url: res.location,
          }
          API.graphql(
            graphqlOperation(mutations.createMedia, { input: media })
          ).then((res) => {
            let newItem = res.data.createMedia
            if (newItem.type.includes("image")) setImages([...images, newItem])
            if (newItem.type.includes("video")) setVideos([...videos, newItem])

            setIsPublic(true)
            setUploading(false)
            setFormModal(false)
          })
        })
      } catch (e) {}
    } else {
      Swal.fire({
        title: "Warning!",
        text: "Please add new title and file correctly.",
        icon: "warning",
        confirmButtonText: "Confirm",
      })
      setUploading(false)
    }
  }

  const changeMediaStatus = (id, status) => {
    const updateMedia = {
      id: id,
      status: !status,
    }
    API.graphql(
      graphqlOperation(mutations.updateMedia, { input: updateMedia })
    ).then((res) => console.log(res, "Update Media result"))
  }

  const deleteMedia = (id, type, index) => {
    API.graphql(
      graphqlOperation(mutations.deleteMedia, { input: { id: id } })
    ).then((res) => {
      switch (type) {
        case "image":
          setImages(images.splice(index - 1, 1))
          break
        case "video":
          setVideos(videos.splice(index - 1, 1))
          break
      }
    })
  }

  return (
    <>
      <Modal
        isOpen={formModal}
        toggle={() => setFormModal(!formModal)}
        className="modal-dialog-centered">
        <ModalHeader toggle={() => setFormModal(!formModal)}>
          Add New Media
        </ModalHeader>
        <ModalBody className="fileUploadModal">
          <FormGroup>
            <Input
              type="text"
              placeholder="Please add some title here..."
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          If you choose "Private", only you can see these. In case of you choose
          "Public", everybody on this platform will be able to see this.
          <CustomInput
            type="switch"
            id="exampleCustomSwitch"
            name="customSwitch"
            className="mb-2 mt-1"
            onChange={() => {
              setIsPublic(!isPublic)
            }}
            label={isPublic ? "Public" : "Private"}
            defaultChecked
          />
          <p className="my-2">
            And system will assign a unique name to your file automatically.
          </p>
          <FilePond
            allowMultiple={false}
            allowFileRename={true}
            fileRenameFunction={(file) => uuid() + file.extension}
            onupdatefiles={(file) => setNewMedia(file)}
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => mediaUpload()}>
            <UILoader blocking={uploading} overlayColor="rgba(255,255,255, .5)">
              <span>Upload</span>
            </UILoader>
          </Button>
          <Button
            color="primary"
            outline
            onClick={() => setFormModal(!formModal)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Row>
        <Button.Ripple
          className="ml-3 mb-2"
          color="primary"
          outline
          onClick={() => setFormModal(!formModal)}>
          ADD NEW
        </Button.Ripple>
      </Row>
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
                              {image.status ? (
                                <CustomInput
                                  type="switch"
                                  id={"image-" + index}
                                  className="ml-auto mr-1 my-auto"
                                  defaultChecked
                                  onChange={(e) =>
                                    changeMediaStatus(image.id, image.status)
                                  }
                                />
                              ) : (
                                <CustomInput
                                  type="switch"
                                  id={"image-" + index}
                                  className="ml-auto mr-1 my-auto"
                                  onChange={(e) =>
                                    changeMediaStatus(image.id, image.status)
                                  }
                                />
                              )}
                              <Button.Ripple
                                className="btn-icon rounded-circle my-auto"
                                outline
                                size="sm"
                                color="primary"
                                color="danger"
                                onClick={(e) =>
                                  deleteMedia(image.id, "image", index)
                                }>
                                <Trash size={16} />
                              </Button.Ripple>
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
                : null}
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
                            {video.status ? (
                              <CustomInput
                                type="switch"
                                id={"video-" + index}
                                className="ml-auto mr-1 my-auto"
                                defaultChecked
                                onChange={(e) =>
                                  changeMediaStatus(video.id, video.status)
                                }
                              />
                            ) : (
                              <CustomInput
                                type="switch"
                                id={"video-" + index}
                                className="ml-auto mr-1 my-auto"
                                onChange={(e) =>
                                  changeMediaStatus(video.id, video.status)
                                }
                              />
                            )}
                            <Button.Ripple
                              className="btn-icon rounded-circle my-auto"
                              outline
                              size="sm"
                              color="primary"
                              color="danger"
                              onClick={(e) =>
                                deleteMedia(video.id, "video", index)
                              }>
                              <Trash size={16} />
                            </Button.Ripple>
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
              : null}
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Media
