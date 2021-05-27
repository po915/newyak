import { Fragment, useState, useEffect } from "react"
import classnames from "classnames"
import { useForm, Controller } from "react-hook-form"
import { Button, Media, Label, Row, Col, Input, FormGroup, Alert, Form } from "reactstrap"
import { v4 as uuid } from "uuid"
import Amplify, { Auth, API, Storage, graphqlOperation } from "aws-amplify"
import S3FileUpload from "react-s3"

import "react-country-dropdown/dist/index.css"

// data is fake data! Do not care!
const GeneralTabs = ({ data }) => {
	useEffect(() => {
		Auth.currentAuthenticatedUser().then((res) => {
			setUserInfo(res)
		})
	}, [])

	const config = {
		bucketName: "yak009ab091abf9449fba198f486b302e7c104727-dev",
		dirName: "image",
		region: "us-east-1",
		accessKeyId: "AKIAZWJ3ZC3OVURJRFFQ",
		secretAccessKey: "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",
	}
	const [name, setName] = useState("")
	const [gender, setGender] = useState("none")
	const [bio, setBio] = useState("")
	const [dob, setDob] = useState()
	const [country, setCountry] = useState()
	const [website, setWebsite] = useState()
	const [phone, setPhone] = useState()

	const [avatar, setAvatar] = useState(data.avatar ? data.avatar : "")

	const { register, errors, handleSubmit, control, trigger, setValue } = useForm({
		defaultValues: { dob: data.dob || new Date() },
	})

	const [userInfo, setUserInfo] = useState()

	// const test = {
	// 	data: "This is test API"
	// }

	// API.graphql(graphqlOperation( mutations.createTest, {
	// 	input: test
	// })).then(res => {
	// 	console.log(res, "test result")
	// })

	// Auth.currentSession().then((data) => console.log(data, "Current session"))

	function getFileExtension(filename) {
		return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
	}

	function renameFile(originalFile, newName) {
		return new File([originalFile], newName, {
			type: originalFile.type,
			lastModified: originalFile.lastModified,
		})
	}

	const Submit = () => {}
	const onChange = async (e) => {
		let avatarFile = e.target.files[0]
		let fileName = avatarFile.name
		let fileExtension = getFileExtension(fileName)
		let finalName = uuid() + "." + fileExtension
		let finalFile = renameFile(avatarFile, finalName)

		S3FileUpload.uploadFile(finalFile, config)
			.then((data) => {
				console.log(data)
				setAvatar(data.location)
			})
			.catch((err) => console.error(err))
	}

	return (
		<Fragment>
			<Media>
				<Media className="mr-25" left>
					<Media object className="rounded mr-50" src={avatar} alt="Generic placeholder image" height="80" width="80" />
				</Media>
				<Media className="my-auto ml-1" body>
					<Button.Ripple tag={Label} className="mr-75" size="sm" color="primary">
						Upload
						<Input type="file" onChange={(e) => onChange(e)} accept="image/*" hidden />
					</Button.Ripple>
				</Media>
			</Media>
			<Form className="mt-2">
				<Row>
					<Col sm="6">
						<FormGroup>
							<Label for="username">Fullname</Label>
							<Input type="text" placeholder="Enter your fullname" defaultValue={name} onChange={(e) => setName(e.target.value)} />
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="gender">Gender</Label>
							<Input id="gender" type="select" name="gender" onChange={(e) => setGender(e.target.value)} defaultValue={gender}>
								<option value="female">Female</option>
								<option value="male">Male</option>
								<option value="none">None</option>
							</Input>
						</FormGroup>
					</Col>
					<Col sm="12">
						<FormGroup>
							<Label for="bio">Bio</Label>
							<Input type="textarea" placeholder="Your Bio data here..." onChange={(e) => setBio(e.target.value)} />
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="birth-date">Birth Date</Label>
							<Input type="date" placeholder="" onChange={(e) => setDob(e.target.value)} />
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="country">Country</Label>
							<Input id="country" type="select" name="country" onChange={(e) => setCountry(e.target.value)} defaultValue={country}>
								<option value="venus">Venus</option>
								<option value="earth">Earth</option>
								<option value="Mars">Mars</option>
							</Input>
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="website">Website</Label>
							<Input type="url" id="website" name="website" defaultValue={website} placeholder="Website Address" onChange={(e) => setWebsite(e.target.value)} />
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="phone">Phone</Label>
							<Input id="phone" name="phone" defaultValue={phone} placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} />
						</FormGroup>
					</Col>
					<Col className="mt-1" sm="12">
						<Button.Ripple onClick={Submit} className="mr-1" color="primary">
							Save changes
						</Button.Ripple>
						<Button.Ripple color="secondary" outline>
							Cancel
						</Button.Ripple>
					</Col>
				</Row>
			</Form>
		</Fragment>
	)
}

export default GeneralTabs
