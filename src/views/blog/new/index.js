import { useState } from "react"
import S3FileUpload from "react-s3"
import { Editor } from "react-draft-wysiwyg"
import { v4 as uuid } from "uuid"
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify"
import * as mutations from "@src/graphql/mutations"
import { convertToRaw } from "draft-js"
import { Row, Col, Card, CardBody, Media, Form, Label, Input, FormGroup, CustomInput, Button } from "reactstrap"

import "@styles/react/libs/editor/editor.scss"
import "@styles/base/plugins/forms/form-quill-editor.scss"
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/base/pages/page-blog.scss"
import draftToHtml from "draftjs-to-html"
import { useSelector } from "react-redux"
import defaultCoverImg from "@src/assets/images/slider/06.jpg"
import { useHistory } from "react-router-dom"

const BlogEdit = () => {
	const S3config = {
		bucketName: "yakbucket104727-dev",
		dirName: "image",
		region: "us-east-1",
		accessKeyId: "AKIAZWJ3ZC3OVURJRFFQ",
		secretAccessKey: "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",
	}

	const [title, setTitle] = useState(""),
		[content, setContent] = useState(),
		[featuredImg, setFeaturedImg] = useState(null),
		[coverImg, setCoverImg] = useState(),
		[coverImgName, setCoverImgName] = useState()

	const userInfo = useSelector((state) => state.userinfo.userInfo)
	const history = useHistory()

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
		let avatarFile = e.target?.files[0]
		if (avatarFile) {
			let fileName = avatarFile.name
			let fileExtension = getFileExtension(fileName)
			let finalName = uuid() + "." + fileExtension
			let finalFile = renameFile(avatarFile, finalName)

			setCoverImg(finalFile)
			setCoverImgName(finalName)
		}
		const reader = new FileReader(),
			files = e.target.files
		reader.onload = function () {
			setFeaturedImg(reader.result)
		}
		reader.readAsDataURL(files[0])
	}

	const publish = () => {
		const realContent = draftToHtml(convertToRaw(content.getCurrentContent()))
		S3FileUpload.uploadFile(coverImg, S3config)
			.then((res) => {
				console.log(res)
				const input = {
					coverImg: coverImgName,
					title: title,
					content: realContent,
					status: "published",
					ownerID: userInfo.id,
				}
				API.graphql(graphqlOperation(mutations.createArticle, { input: input }))
					.then((res) => {
						console.log(res, "api update")
						history.push("/pages/blog/list")
					})
					.catch((err) => {
						console.error(err, "api error")
					})
			})
			.catch((err) => {
				console.error(err, "storage error")
			})
	}

	const draft = async () => {
		const realContent = draftToHtml(convertToRaw(content.getCurrentContent()))
		S3FileUpload.uploadFile(coverImg, S3config)
			.then((res) => {
				console.log(res)
				const input = {
					coverImg: coverImgName,
					title: title,
					content: realContent,
					status: "draft",
					ownerID: userInfo.id,
				}
				API.graphql(graphqlOperation(mutations.createArticle, { input: input }))
					.then((res) => {
						console.log(res, "api update")
						history.push("/pages/blog/draft")
					})
					.catch((err) => {
						console.error(err, "api error")
					})
			})
			.catch((err) => {
				console.error(err, "storage error")
			})
	}

	const cancel = () => {
		history.push("/pages/blog/all")
	}

	return (
		<div className="blog-edit-wrapper">
			<Row>
				<Col sm="12">
					<Card>
						<CardBody>
							<Form className="mt-2" onSubmit={(e) => e.preventDefault()}>
								<Row>
									<Col md="12">
										<FormGroup className="mb-2">
											<Label for="blog-edit-title">Title</Label>
											<Input id="blog-edit-title" placeholder="Your title here" onChange={(e) => setTitle(e.target.value)} />
										</FormGroup>
									</Col>
									<Col className="mb-2" sm="12">
										<div className="border rounded p-2">
											<h4 className="mb-1">Cover Image</h4>
											<Media className="flex-column flex-md-row">
												<img className="rounded mr-2 mb-1 mb-md-0" src={featuredImg || defaultCoverImg} alt="featured img" width="170" height="110" />
												<Media body>
													<small className="text-muted">Required image resolution 800x400, image size 10mb.</small>
													<p className="my-50"></p>
													<div className="d-inline-block">
														<FormGroup className="mb-0">
															<CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" onChange={onChange} accept=".jpg, .png, .gif" />
														</FormGroup>
													</div>
												</Media>
											</Media>
										</div>
									</Col>
									<Col sm="12">
										<FormGroup className="mb-2">
											<Label>Content</Label>
											<Editor editorState={content} onEditorStateChange={(data) => setContent(data)} />
										</FormGroup>
									</Col>
									<Col className="mt-50">
										<Button.Ripple color="primary" className="mr-1" onClick={publish}>
											Publish
										</Button.Ripple>
										<Button.Ripple color="primary" outline onClick={draft}>
											Save as Draft
										</Button.Ripple>
										<Button color="secondary" outline className="ml-1" onClick={cancel}>
											Cancel
										</Button>
									</Col>
								</Row>
							</Form>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default BlogEdit
