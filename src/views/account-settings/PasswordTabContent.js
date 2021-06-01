import { Form, FormGroup, Row, Col, Button } from "reactstrap"
import InputPasswordToggle from "@components/input-password-toggle"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Auth } from "aws-amplify"

const PasswordTabContent = () => {
	const [oldPassword, setOldPassword] = useState()
	const [newPassword, setNewPassword] = useState()

	function submit(event) {
		event.preventDefault()
		Auth.currentAuthenticatedUser()
			.then((user) => {
				return Auth.changePassword(user, oldPassword, newPassword)
			})
			.then((data) => console.log(data))
			.catch((err) => console.log(err))
	}

	return (
		<Form onSubmit={(e) => submit(e)}>
			<Row>
				<Col sm="6">
					<FormGroup>
						<InputPasswordToggle label="Old Password" placeholder="Current password" required onChange={(e) => setOldPassword(e.target.value)} />
					</FormGroup>
				</Col>
				<Col sm="6">
					<FormGroup>
						<InputPasswordToggle label="New Password" placeholder="New password" required onChange={(e) => setNewPassword(e.target.value)} />
					</FormGroup>
				</Col>
			</Row>
			<Row>
				<Col className="mt-1" sm="12">
					<Button.Ripple type="submit" className="mr-1" color="primary">
						Save changes
					</Button.Ripple>
					<Button.Ripple color="secondary" outline>
						Cancel
					</Button.Ripple>
				</Col>
			</Row>
		</Form>
	)
}

export default PasswordTabContent
