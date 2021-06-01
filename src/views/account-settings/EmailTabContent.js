import * as yup from "yup"
import classnames from "classnames"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Input, Label, Form, FormGroup, Row, Col, Button } from "reactstrap"
import InputPasswordToggle from "@components/input-password-toggle"

const EmailTabContent = () => {

	return (
		<Form>
			<Row>
				<Col sm="6">
					<FormGroup>
						<Label>Current Email</Label>
						<Input type="text" />
					</FormGroup>
				</Col>
			</Row>
			<Row>
				<Col sm="6">
					<FormGroup>
						<Label>New Email</Label>
						<Input type="text" placeholder="Enter your new email address." />
					</FormGroup>
				</Col>
				<Col sm="6">
					<FormGroup>
						<Label>Verification Code</Label>
						<Input type="text" placeholder="Code here" />
					</FormGroup>
				</Col>
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

export default EmailTabContent
