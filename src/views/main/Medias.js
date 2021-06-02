import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Input } from "reactstrap"

import FileUploader from "./FileUploader"


const Medias = () => {
	const userInfo = useSelector((state) => state.userinfo.userInfo)
	const [formModal, setFormModal] = useState(false)

	return (
		<Row>
			<Col lg={{ size: 3 }}>
				<Button.Ripple color="primary" outline onClick={() => setFormModal(!formModal)}>
					ADD NEW
				</Button.Ripple>
				<Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className="modal-dialog-centered">
					<ModalHeader toggle={() => setFormModal(!formModal)}>Add New Media</ModalHeader>
					<ModalBody>
						<FormGroup>
							<Label>Title:</Label>
							<Input type="text" placeholder="Title here..." />
						</FormGroup>
						<FormGroup>
							<Label>Memo:</Label>
							<Input type="text" placeholder="Memo here..." />
						</FormGroup>
            <FileUploader />
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={() => setFormModal(!formModal)}>
							Add
						</Button>
            <Button color="primary" outline onClick={() => setFormModal(!formModal)}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</Col>
		</Row>
	)
}

export default Medias