import { Fragment, useState, useEffect } from "react"
import { Button, Media, Label, Row, Col, Input, FormGroup, Alert, Form } from "reactstrap"
import { v4 as uuid } from "uuid"
import Amplify, { Auth, API, Storage, graphqlOperation } from "aws-amplify"
import S3FileUpload from "react-s3"
import { toast, Slide } from "react-toastify"
import defaultAvatar from "../../../assets/images/avatars/default.png"
import * as mutations from "@src/graphql/mutations"
import * as queries from "@src/graphql/queries"

const ToastContent = ({title, message}) => (
	<Fragment>
		<div className="toastify-header">
			<div className="title-wrapper">
				<h6 className="toast-title font-weight-bold">{title}</h6>
			</div>
		</div>
		<div className="toastify-body">
			<span>{message}</span>
		</div>
	</Fragment>
)

// data is fake data! Do not care!
const GeneralTabs = ({ data }) => {
	const S3config = {
		bucketName: "yak009ab091abf9449fba198f486b302e7c104727-dev",
		dirName: "image",
		region: "us-east-1",
		accessKeyId: "AKIAZWJ3ZC3OVURJRFFQ",
		secretAccessKey: "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",
	}
	const baseImageURL = "https://yak009ab091abf9449fba198f486b302e7c104727-dev.s3.amazonaws.com/image/"
	const [name, setName] = useState()
	const [gender, setGender] = useState("none")
	const [bio, setBio] = useState("")
	const [dob, setDob] = useState()
	const [country, setCountry] = useState()
	const [website, setWebsite] = useState()
	const [phone, setPhone] = useState()
	const [avatar, setAvatar] = useState("")
	const [user, setUser] = useState()
	const [userInfo, setUserInfo] = useState()

	useEffect(async () => {
		let currentUser = await Auth.currentAuthenticatedUser()
		setUser(currentUser)
		let userInfo = await API.graphql(graphqlOperation(queries.getUserinfo, { id: currentUser.attributes.nickname }))
		setUserInfo(userInfo)
		console.log(userInfo, "Current userInfo")
		userInfo = userInfo.data.getUserinfo
		setName(userInfo.name)
		setGender(userInfo.gender)
		setBio(userInfo.bio)
		setDob(userInfo.dob)
		setCountry(userInfo.country)
		setWebsite(userInfo.website)
		setPhone(userInfo.phone)
		setAvatar(baseImageURL + userInfo.avatar)
	}, [])

	function getFileExtension(filename) {
		return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
	}

	function renameFile(originalFile, newName) {
		return new File([originalFile], newName, {
			type: originalFile.type,
			lastModified: originalFile.lastModified,
		})
	}

	const Submit = async () => {
		const input = {
			id : user.attributes.nickname,
			name: name,
			gender: gender,
			dob: dob,
			bio: bio,
			phone: phone,
			website: website,
			country: country
		}
		await API.graphql(graphqlOperation(mutations.updateUserinfo, {input: input})).then(res=> {
			console.log(res, "G update result")
			toast.success(<ToastContent title="SUCCESS!" message="Your personal information is updated successfully." />, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
		})
	}

	const uploadAvatar = async (e) => {
		let avatarFile = e.target.files[0]
		let fileName = avatarFile.name
		let fileExtension = getFileExtension(fileName)
		let finalName = uuid() + "." + fileExtension
		let finalFile = renameFile(avatarFile, finalName)

		S3FileUpload.uploadFile(finalFile, S3config)
			.then(async (data) => {
				console.log(data)
				setAvatar(baseImageURL + finalName)
				//Register new avatar
				const input = {
					id: user.attributes.nickname,
					avatar: finalName
				}
				await API.graphql(graphqlOperation(mutations.updateUserinfo, {input: input})).then(res=> {
					console.log(res, "G update result")
					toast.success(<ToastContent />, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
				})
			})
			.catch((err) => console.error(err))
		// let result = await Storage.put(finalName, finalFile)
		// console.log(result)

		// let previousAvatar = user.attributes.picture
		// console.log(previousAvatar)

		// Storage.remove('image/9ba1b6ec-39da-4c12-b483-e2017976c252.png').then(res=>{
		// 	console.log(res)
		// })
		// try {
		// 	S3FileUpload.deleteFile("9ba1b6ec-39da-4c12-b483-e2017976c252.png", S3config)
		// 		.then((response) => console.log(response))
		// 		.catch((err) => console.error(err))
		// } catch (err) {
		// 	console.error(err)
		// }
	}

	return (
		<Fragment>
			<Media>
				<Media className="mr-25" left>
					<Media object className="rounded mr-50" src={avatar ? avatar : defaultAvatar} alt="Generic placeholder image" height="80" width="80" />
				</Media>
				<Media className="my-auto ml-1" body>
					<Button.Ripple tag={Label} className="mr-75" size="sm" color="primary">
						Upload
						<Input type="file" onChange={(e) => uploadAvatar(e)} accept="image/*" hidden />
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
							<Input type="textarea" defaultValue={bio} placeholder="Your Bio data here..." onChange={(e) => setBio(e.target.value)} />
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="birth-date">Birth Date</Label>
							<Input type="date" defaultValue={dob} placeholder="" onChange={(e) => setDob(e.target.value)} />
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
