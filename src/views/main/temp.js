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
  Label,
  FormGroup,
  Input,
  CustomInput,
} from "reactstrap"
import Uppy from "@uppy/core"
import thumbnailGenerator from "@uppy/thumbnail-generator"
import { DragDrop } from "@uppy/react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import { API, graphqlOperation } from "aws-amplify"
import * as mutations from "@src/graphql/mutations"
import * as queries from "@src/graphql/queries"
import S3FileUpload from "react-s3"
import { v4 as uuid } from "uuid"

import { css } from "@emotion/react"
import CircleLoader from "react-spinners/CircleLoader"
import { Trash } from "react-feather"
import LoadingOverlay from "react-loading-overlay"

import ImgsViewer from "react-images-viewer"

import Swal from "sweetalert2/dist/sweetalert2.js"
import "sweetalert2/src/sweetalert2.scss"

import "uppy/dist/uppy.css"
import "@uppy/status-bar/dist/style.css"
import "@styles/react/libs/file-uploader/file-uploader.scss"

const Media = () => {
  const userInfo = useSelector((state) => state.userinfo.userInfo)
  const [formModal, setFormModal] = useState(false)
  const [previewArr, setPreviewArr] = useState([])
  const [fileObjects, setFileObjects] = useState([])
  const [title, setTitle] = useState("")
  const [memo, setMemo] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [loaderClass, setLoaderClass] = useState("d-flex hidden")
  const [mediaGroups, setMediaGroups] = useState([])
  const [uploading, setUploading] = useState(false)
  const S3config = {
    bucketName: "yakbucket104727-dev",
    dirName: "image",
    region: "us-east-1",
    accessKeyId: "AKIAZWJ3ZC3OVURJRFFQ",
    secretAccessKey: "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",
  }

  const loaderStyle = css`
    display: block;
    border-color: #000;
    margin-right: 10px;
  `

  const uppy = new Uppy({
    restrictions: {
      allowedFileTypes: ["image/*", "video/*"],
    },
    autoProceed: true,
  })

  uppy.use(thumbnailGenerator)
  uppy.on("thumbnail:generated", (file, preview) => {
    const arr = previewArr
    arr.push(preview)
    setPreviewArr([...arr])
  })
  uppy.on("files-added", (files) => {
    setFileObjects([...fileObjects, ...files])
  })

  const renderPreview = () => {
    if (previewArr.length) {
      return previewArr.map((src, index) => (
        <img key={index} className="rounded mt-2 mr-1" src={src} alt="avatar" />
      ))
    } else {
      return null
    }
  }

  function getFileExtension(filename) {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
  }

  function renameFile(originalFile, newName) {
    return new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    })
  }

  const mediaUpload = () => {
    setLoaderClass("d-flex show")
    // setUploading(true)
    // uppy.cancelAll()
    var status = isPublic ? "public" : "private"
    const group = {
      ownerID: userInfo.id,
      title: title,
      memo: memo,
      status: status,
    }
    API.graphql(
      graphqlOperation(mutations.createMediaGroup, { input: group })
    ).then((res) => {
      let groupID = res.data.createMediaGroup.id
      fileObjects.map((file, key) => {
        let realFile = file.data
        let fileName = realFile.name
        let fileExtension = getFileExtension(fileName)
        let finalName = uuid() + "." + fileExtension
        let finalFile = renameFile(realFile, finalName)

        console.log(key)

        S3FileUpload.uploadFile(finalFile, S3config).then((res) => {
          console.log(res, "fileupload result")
          const media = {
            groupID: groupID,
            type: file.type,
            path: res.location,
          }
          API.graphql(
            graphqlOperation(mutations.createMedia, { input: media })
          ).then((res) => {
            console.log(res, "media register result")
            setLoaderClass("d-flex hidden")
            setUploading(false)
            setFormModal(false)
            getMediaGroups()
          })
        })
      })
    })
  }

  useEffect(() => {
    // API.graphql(
    //   graphqlOperation(queries.mediaGroupByOwner, { ownerID: userInfo.id })
    // ).then((res) => {
    //   InsertMediasIntoGroup(res.data.mediaGroupByOwner.items)
    //   setMediaGroups(res.data.mediaGroupByOwner.items)
    // })
    getMediaGroups()
  }, [])

  const getMediaGroups = () => {
    API.graphql(
      graphqlOperation(queries.mediaGroupByOwner, { ownerID: userInfo.id })
    ).then((res) => {
      var groups = res.data.mediaGroupByOwner.items
      var tempGroups = new Array()
      groups.map((group, key) => {
        API.graphql(
          graphqlOperation(queries.mediaByGroup, { groupID: group.id })
        ).then((res) => {
          group.medias = res.data.mediaByGroup.items
          group.key = key
          tempGroups.push(group)
        })
      })

      setMediaGroups(tempGroups)
    })
  }

  const InsertMediasIntoGroup = (groups) => {
    var temp = groups
    temp.map((group, key) => {
      API.graphql(
        graphqlOperation(queries.mediaByGroup, { groupID: group.id })
      ).then((res) => {
        group.medias = res.data.mediaByGroup.items
        group.key = key
      })
    })
    setMediaGroups([...temp])
  }

  const renderMedia = (medias) => {
    var temp = []
    if (typeof medias.nextToken == "undefined") {
      medias.map((media, key) => {
        temp.push(
          <Col sm={{ size: 3 }} key={key}>
            <img className="imgItem" src={media.path}></img>
          </Col>
        )
      })
      return temp
    }
  }

  const deleteMediaGroup = (id, key) => {
    const itemId = {
      id: id,
    }
    API.graphql(graphqlOperation(mutations.deleteMediaGroup, { input: itemId }))
      .then((res) => {
        Swal.fire({
          text: "Item is removed successfully.",
          icon: "success",
          confirmButtonText: "Retry",
        })
        setMediaGroups(mediaGroups.splice(key))
      })
      .catch((error) => {
        console.log(error)
        Swal.fire({
          title: "Something Error!",
          text: "Your operation failed.",
          icon: "error",
          confirmButtonText: "Retry",
        })
      })
  }

  const renderMediaGroup = (groups) => {
    return groups.map((group, key) => {
      return (
        <div key={key}>
          <Card className="my-1">
            <div className="d-flex">
              <p className="groupTitle ml-1 mt-1">{group.title}</p>

              <Button.Ripple
                className="btn-icon rounded-circle ml-auto mt-1"
                outline
                color="primary"
                color="danger"
                onClick={(e) => deleteMediaGroup(group.id, group.key)}>
                <Trash size={16} />
              </Button.Ripple>

              {group.status == "public" ? (
                <CustomInput
                  type="switch"
                  id="statusOfGroup"
                  name="statusOfGroup"
                  className="mx-2 mt-2"
                  defaultChecked
                />
              ) : (
                <CustomInput
                  type="switch"
                  id="statusOfGroup"
                  name="statusOfGroup"
                  className="mx-2 mt-2"
                />
              )}
            </div>

            <p className="groupMemo ml-1 mt-0">{group.memo}</p>
            <Row>{renderMedia(group.medias)}</Row>
          </Card>
        </div>
      )
    })
  }

  return (
    <>
      {/* <LoadingOverlay
        active={true}
        spinner
        text="Uploading"
        styles={{
          overlay: (base) => ({
            ...base,
            position: "absolute",
            width: "100vw",
            height: "100vh",
          }),
        }}></LoadingOverlay> */}
      <Row>
        <Button.Ripple
          className="ml-3"
          color="primary"
          outline
          onClick={() => setFormModal(!formModal)}>
          ADD NEW
        </Button.Ripple>
        <Modal
          isOpen={formModal}
          toggle={() => setFormModal(!formModal)}
          className="modal-dialog-centered">
          <ModalHeader toggle={() => setFormModal(!formModal)}>
            Add New Media
          </ModalHeader>
          <ModalBody className="fileUploadModal">
            <FormGroup>
              <Label>Title:</Label>
              <Input
                type="text"
                placeholder="Title here..."
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Memo:</Label>
              <Input
                type="text"
                placeholder="Memo here..."
                onChange={(e) => setMemo(e.target.value)}
              />
            </FormGroup>
            If you choose "Private", only you can see these. In case of you
            choose "Public", everybody on this platform will be able to see
            this.
            <CustomInput
              type="switch"
              id="exampleCustomSwitch"
              name="customSwitch"
              className="mb-2 mt-1"
              onChange={() => {
                setIsPublic(!isPublic)
              }}
              label={isPublic ? "Public" : "Private"}
            />
            <DragDrop uppy={uppy} />
            <div className="file-preview">{renderPreview()}</div>
          </ModalBody>
          <ModalFooter>
            <div className={loaderClass}>
              <CircleLoader color={"#058fff"} css={loaderStyle} size={20} />
              Uploading...
            </div>
            <Button color="primary" onClick={() => mediaUpload()}>
              Add
            </Button>
            <Button
              color="primary"
              outline
              onClick={() => setFormModal(!formModal)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Row>
      {mediaGroups ? (
        renderMediaGroup(mediaGroups)
      ) : (
        <p>There is no medias yet. Please add new.</p>
      )}
    </>
  )
}

export default Media
