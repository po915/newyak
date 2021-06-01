import { Fragment, useState, useEffect } from "react"
import { Button, Media, Label, Row, Col, Input, FormGroup, Alert, Form } from "reactstrap"
import { v4 as uuid } from "uuid"
import Amplify, { Auth, API, Storage, graphqlOperation } from "aws-amplify"
import S3FileUpload from "react-s3"
import { toast, Slide } from "react-toastify"
import defaultAvatar from "@src/assets/images/avatars/default.png"
import * as mutations from "@src/graphql/mutations"
import { useDispatch, useSelector } from "react-redux"
import { setUserInfo } from "@src/redux/actions/userinfo"
import { useHistory } from "react-router-dom"

const ToastContent = ({ title, message }) => (
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
	const dispatch = useDispatch()
	const S3config = {
		bucketName: "yakbucket104727-dev",
		dirName: "image",
		region: "us-east-1",
		accessKeyId: "AKIAZWJ3ZC3OVURJRFFQ",
		secretAccessKey: "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",
	}
	const baseImageURL = "https://yakbucket104727-dev.s3.amazonaws.com/image/"
	const [name, setName] = useState()
	const [gender, setGender] = useState("none")
	const [bio, setBio] = useState("")
	const [dob, setDob] = useState()
	const [country, setCountry] = useState()
	const [website, setWebsite] = useState()
	const [phone, setPhone] = useState()
	const [avatar, setAvatar] = useState("")

	const history = useHistory()

	const currentUser = useSelector((state) => state.userinfo.currentUser)
	const userInfo = useSelector((state) => state.userinfo.userInfo)

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
			id: userInfo.id,
			name: name,
			gender: gender,
			dob: dob,
			bio: bio,
			phone: phone,
			website: website,
			country: country,
		}
		await API.graphql(graphqlOperation(mutations.updateUserinfo, { input: input })).then((res) => {
			dispatch(setUserInfo(res.data.updateUserinfo))
			toast.success(<ToastContent title="SUCCESS!" message="Your personal information is updated successfully." />, {
				transition: Slide,
				hideProgressBar: true,
				autoClose: 2000,
			})
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
					id: userInfo.id,
					avatar: finalName,
				}
				await API.graphql(graphqlOperation(mutations.updateUserinfo, { input: input })).then((res) => {
					dispatch(setUserInfo(res.data.updateUserinfo))
					console.log(res, "Avatar update result")
					toast.success(<ToastContent title="SUCCESS!" message="Your Avatar is changed successfully!" />, {
						transition: Slide,
						hideProgressBar: true,
						autoClose: 2000,
					})
				})
			})
			.catch((err) => console.error(err))
	}

	return (
		<Fragment>
			<Media>
				<Media className="mr-25" left>
					<Media
						object
						className="rounded mr-50"
						src={userInfo.avatar ? baseImageURL + userInfo.avatar : defaultAvatar}
						alt="Generic placeholder image"
						height="80"
						width="80"
					/>
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
							<Input
								type="text"
								placeholder="Enter your fullname"
								defaultValue={userInfo.name}
								onChange={(e) => setName(e.target.value)}
							/>
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="gender">Gender</Label>
							<select
								className="form-control"
								id="gender"
								type="select"
								name="gender"
								onChange={(e) => setGender(e.target.value)}
								defaultValue={gender}
							>
								<option value="female">Female</option>
								<option value="male">Male</option>
								<option value="none">None</option>
							</select>
						</FormGroup>
					</Col>
					<Col sm="12">
						<FormGroup>
							<Label for="bio">Bio</Label>
							<Input
								type="textarea"
								defaultValue={userInfo.bio}
								placeholder="Your Bio data here..."
								onChange={(e) => setBio(e.target.value)}
							/>
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="birth-date">Birth Date</Label>
							<Input type="date" defaultValue={userInfo.dob} placeholder="" onChange={(e) => setDob(e.target.value)} />
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="country">Country</Label>
							<Input
								id="country"
								type="select"
								name="country"
								onChange={(e) => setCountry(e.target.value)}
								defaultValue={userInfo.country}
							>
								<option value="venus">Venus</option>
								<option value="earth">Earth</option>
								<option value="Mars">Mars</option>
							</Input>
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="website">Website</Label>
							<Input
								type="url"
								id="website"
								name="website"
								defaultValue={userInfo.website}
								placeholder="Website Address"
								onChange={(e) => setWebsite(e.target.value)}
							/>
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="phone">Phone</Label>
							<Input
								id="phone"
								name="phone"
								defaultValue={userInfo.phone}
								placeholder="Phone Number"
								onChange={(e) => setPhone(e.target.value)}
							/>
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
