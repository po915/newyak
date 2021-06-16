import { useState, useEffect } from "react"
import axios from "axios"
import Select from "react-select"
import Avatar from "@components/avatar"
import htmlToDraft from "html-to-draftjs"
import { v4 as uuid } from "uuid"
import { selectThemeColors } from "@utils"
import { Editor } from "react-draft-wysiwyg"
import {
  EditorState,
  ContentState,
  convertFromRaw,
  convertToRaw,
} from "draft-js"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Media,
  Form,
  Label,
  Input,
  FormGroup,
  CustomInput,
  Button,
} from "reactstrap"

import "@styles/react/libs/editor/editor.scss"
import "@styles/base/plugins/forms/form-quill-editor.scss"
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/base/pages/page-blog.scss"
import draftToHtml from "draftjs-to-html"
import { useSelector } from "react-redux"
import { API, graphqlOperation } from "aws-amplify"
import * as mutations from "@src/graphql/mutations"
import * as queries from "@src/graphql/queries"
import { useHistory } from "react-router-dom"
import S3FileUpload from "react-s3"

const BlogEdit = (props) => {
  const articleID = props.match.params.id
  const currentUser = useSelector((state) => state.userinfo.userInfo)
  const history = useHistory()

  const [article, setArticle] = useState({})
  const [coverImg, setCoverImg] = useState(null)
  const [coverFile, setCoverFile] = useState()
  const [content, setContent] = useState()
  // const [featuredImg, setFeaturedImg] = useState(null)
  const [title, setTitle] = useState()

  const S3config = {
    bucketName: "yakbucket104727-dev",
    dirName: "image",
    region: "us-east-1",
    accessKeyId: "AKIAZWJ3ZC3OVURJRFFQ",
    secretAccessKey: "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",
  }

  useEffect(() => {
    API.graphql(graphqlOperation(queries.getArticle, { id: articleID })).then(
      (res) => {
        if (currentUser.id != res.data.getArticle.ownerID)
          history.push("/blog/all")
        else if (currentUser.id == res.data.getArticle.ownerID)
          setArticle(res.data.getArticle)
        setTitle(res.data.getArticle.title)
        setCoverImg(res.data.getArticle.coverImg)
      }
    )
  }, [])

  useEffect(() => {
    if (Object.keys(article).length > 0) {
      const initialContent = article.content
      const contentBlock = htmlToDraft(initialContent)
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      )
      const editorState = EditorState.createWithContent(contentState)
      setContent(editorState)
    }
  }, [article])

  function getFileExtension(filename) {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
  }

  function renameFile(originalFile, newName) {
    return new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    })
  }

  const onChange = (e) => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setCoverImg(reader.result)
    }
    reader.readAsDataURL(files[0])
    let coverImgFile = e.target.files[0]
    if (coverImgFile) {
      let fileName = coverImgFile.name
      let fileExtension = getFileExtension(fileName)
      let finalName = uuid() + "." + fileExtension
      let finalFile = renameFile(coverImgFile, finalName)

      setCoverFile(finalFile)
    }
  }

  const saveArticle = (e) => {
    const realContent = draftToHtml(convertToRaw(content.getCurrentContent()))
    if (coverFile) {
      S3FileUpload.uploadFile(coverFile, S3config)
        .then((res) => {
          var update = {
            id: article.id,
            coverImg: res.location,
            title: title,
            content: realContent,
          }
          API.graphql(
            graphqlOperation(mutations.updateArticle, { input: update })
          )
            .then((res) => {
              history.push("/blog/list")
            })
            .catch((err) => {
              console.error(err, "api error")
            })
        })
        .catch((err) => {
          console.error(err, "storage error")
        })
    } else {
      var update1 = {
        id: article.id,
        title: title,
        content: realContent,
      }
      API.graphql(graphqlOperation(mutations.updateArticle, { input: update1 }))
        .then((res) => {
          history.push("/blog/list")
        })
        .catch((err) => {
          console.error(err, "api error")
        })
    }
  }

  return (
    <div className="blog-edit-wrapper">
      {Object.keys(article).length > 0 ? (
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Form className="mt-2" onSubmit={(e) => e.preventDefault()}>
                  <Row>
                    <Col md="6">
                      <FormGroup className="mb-2">
                        <Label for="blog-edit-title">Title</Label>
                        <Input
                          id="blog-edit-title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup className="mb-2">
                        <Label>Content</Label>
                        <Editor
                          editorState={content}
                          onEditorStateChange={(data) => setContent(data)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="mb-2" sm="12">
                      <div className="border rounded p-2">
                        <h4 className="mb-1">Cover Image</h4>
                        <Media className="flex-column flex-md-row">
                          <img
                            className="rounded mr-2 mb-1 mb-md-0"
                            src={coverImg}
                            alt="featured img"
                            width="170"
                            height="110"
                          />
                          <Media body>
                            <small className="text-muted">
                              Required image resolution 800x400, image size
                              10mb.
                            </small>
                            <p className="my-50"></p>
                            <div className="d-inline-block">
                              <FormGroup className="mb-0">
                                <CustomInput
                                  type="file"
                                  id="exampleCustomFileBrowser"
                                  name="customFile"
                                  onChange={onChange}
                                  accept=".jpg, .png, .gif"
                                />
                              </FormGroup>
                            </div>
                          </Media>
                        </Media>
                      </div>
                    </Col>
                    <Col className="mt-50">
                      <Button.Ripple
                        color="primary"
                        className="mr-1"
                        onClick={saveArticle}>
                        Save Changes
                      </Button.Ripple>
                      <Button.Ripple color="secondary" outline>
                        Cancel
                      </Button.Ripple>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null}
    </div>
  )
}

export default BlogEdit
