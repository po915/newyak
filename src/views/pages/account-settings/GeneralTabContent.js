import { Fragment, useState, useEffect } from "react"
import classnames from "classnames"
import { useForm, Controller } from "react-hook-form"
import { Button, Media, Label, Row, Col, Input, FormGroup, Alert, Form } from "reactstrap"
import { v4 as uuid } from "uuid"
import Amplify, { Auth, API, Storage, graphqlOperation } from "aws-amplify"
// import * as mutations from "@src/graphql/mutations.js"

// data is fake data! Do not care!
const GeneralTabs = ({ data }) => {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
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

	// useEffect(()=> {
	// 	Auth.currentAuthenticatedUser().then((res) => {
	// 		setUserInfo(res)
	// 	})
	// }, [])
	
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

	

	// Storage.get("avatar.png", {expires: 300}).then((res) => {
	// 	console.log(res);
	// 	setAvatar(res)
	// })

	const Submit = () => {
		console.log(name, email, phone, bio, dob, country, website)
	}

	const onChange = async (e) => {
		let avatarFile = e.target.files[0]
		let fileName = avatarFile.name
		let fileExtension = getFileExtension(fileName)
		let fileType = avatarFile.type
		let finalName = uuid() + "." + fileExtension

		console.log(fileName, finalName, fileType)
		console.log(Storage)
		await Storage.put(finalName, avatarFile, {
			contentType: fileType,
			// metadata: {
			// 	sub: userInfo.username,
			// 	email: userInfo.attributes.email,
			// },
		})
			.then((res) => {
				console.log(res, "Upload Result")
				// const reader = new FileReader(),
				// 	files = e.target.files
				// reader.onload = function () {
				// 	setAvatar(reader.result)
				// }
				// reader.readAsDataURL(files[0])
			})
			.catch((err) => {
				console.log(err, "Upload Error")
			})
	}

	return (
		<Fragment>
			<Media>
				<Media className="mr-25" left>
					<Media object className="rounded mr-50" src={avatar} alt="Generic placeholder image" height="80" width="80" />
				</Media>
				<Media className="mt-75 ml-1" body>
					<Button.Ripple tag={Label} className="mr-75" size="sm" color="primary">
						Upload
						<Input type="file" onChange={(e) => onChange(e)} hidden accept="image/*" />
					</Button.Ripple>
					<p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
				</Media>
			</Media>
			<Form className="mt-2">
				<Row>
					<Col sm="6">
						<FormGroup>
							<Label for="username">Fullname</Label>
							<Input type="text" value={name} placeholder="Enter your fullname" onChange={(e) => setName(e.target.value)} />
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="email">E-mail</Label>
							<Input type="email" value={email} placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
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
							<Input id="country" type="select" name="country" onChange={(e) => setCountry(e.target.value)}>
								<option value="us">USA</option>
								<option value="fr">France</option>
								<option value="ca">Canada</option>
							</Input>
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="website">Website</Label>
							<Input type="url" id="website" name="website" placeholder="Website Address" onChange={(e) => setWebsite(e.target.value)} />
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="phone">Phone</Label>
							<Input id="phone" name="phone" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} />
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
