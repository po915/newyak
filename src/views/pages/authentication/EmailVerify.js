import { useEffect, useState, useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import { Auth, API } from "aws-amplify"
import { useDispatch } from "react-redux"
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, Button } from "reactstrap"
import { handleLogin } from "@store/actions/auth"
import { AbilityContext } from "@src/utility/context/Can"


import "@styles/base/pages/page-auth.scss"

import logo from "../../../assets/images/logo/main-logo.png"

const EmailVerify = () => {
	const ability = useContext(AbilityContext)
	// const username = useSelector(state => state.custom.username)
	const history = useHistory()
	const dispatch = useDispatch()

	let username = JSON.parse(localStorage.getItem("tempData")).userData.user.username

	if (!username) {
		history.push("/login")
	}

	const [code, setCode] = useState("")

	const resendCode = (e) => {
		e.preventDefault()
		Auth.resendSignUp(username).then((res) => {
			console.log(res, "Resend Result")
		})
	}

	const onSubmit = () => {
		try {
			Auth.confirmSignUp(username, code).then((res) => {
				if (res == "SUCCESS") {
					ability.update([
						{
							action: "manage",
							subject: "all",
						},
					])
					// set up local storage to local JWT
					var temp = JSON.parse(localStorage.getItem("tempData"))
					const userData = {
						username: temp.userData.userSub,
						accessToken: temp.accessToken,
						refreshToken: temp.refreshToken,
						email: temp.userData.user.username,
						ability: temp.userData.ability,
						role: "admin",
					}
					ability.update(temp.userData.ability)
					dispatch(handleLogin(userData))
					history.push("/dashboard")

					const userInfo = {
						id: temp.userData.userSub,
						email: temp.userData.user.username,
					}

					// const deletedTodo = await API.graphql({ query: mutations.deleteTodo, variables: {input: todoDetails}});
				}
			})
		} catch (err) {
			console.log(err, "exception error")
		}
	}

	return (
		<div className="auth-wrapper auth-v1 px-2">
			<div className="auth-inner py-2">
				<Card className="mb-0">
					<CardBody>
						<Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
							<img src={logo} className="main-logo" />
						</Link>
						<CardTitle tag="h4" className="mb-1">
							Verify your Email Address 📧
						</CardTitle>
						<CardText className="mb-2">Check your inbox and please enter the verify code here.</CardText>
						<Form className="auth-forgot-password-form mt-2">
							<FormGroup>
								<Label className="form-label" for="login-email">
									Code
								</Label>
								<Input type="text" id="login-email" onChange={(e) => setCode(e.target.value)} placeholder="6 digits" autoFocus />
							</FormGroup>
							<p>
								Not received code?
								<Link className="mb-4" to="/" onClick={(e) => resendCode(e)}>
									Resend Code
								</Link>
							</p>
							<Button.Ripple onClick={onSubmit} color="primary" block>
								Send Code
							</Button.Ripple>
						</Form>
					</CardBody>
				</Card>
			</div>
		</div>
	)
}

export default EmailVerify
