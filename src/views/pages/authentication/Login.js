import { useState, useContext, Fragment } from "react"
import classnames from "classnames"
import Avatar from "@components/avatar"
import { useSkin } from "@hooks/useSkin"
import useJwt from "@src/auth/jwt/useJwt"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { toast, Slide } from "react-toastify"
import { handleLogin } from "@store/actions/auth"
import { AbilityContext } from "@src/utility/context/Can"
import { Link, useHistory } from "react-router-dom"
import InputPasswordToggle from "@components/input-password-toggle"
import { getHomeRouteForLoggedInUser, isObjEmpty } from "@utils"
import { Coffee } from "react-feather"
import { Alert, Row, Col, CardTitle, CardText, Form, Input, FormGroup, Label, CustomInput, Button, UncontrolledTooltip } from "reactstrap"

import logo from "../../../assets/images/logo/main-logo.png"

import "@styles/base/pages/page-auth.scss"

const ToastContent = ({ name, role }) => (
	<Fragment>
		<div className="toastify-header">
			<div className="title-wrapper">
				<Avatar size="sm" color="success" icon={<Coffee size={12} />} />
				<h6 className="toast-title font-weight-bold">Welcome, {name}</h6>
			</div>
		</div>
		<div className="toastify-body">
			<span>You have successfully logged in as an {role} user to Yakkaz. Now you can start to explore. Enjoy!</span>
		</div>
	</Fragment>
)

const Login = (props) => {
	const [skin, setSkin] = useSkin()
	const ability = useContext(AbilityContext)
	const dispatch = useDispatch()
	const history = useHistory()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const { register, errors, handleSubmit } = useForm()
	const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
		source = require(`@src/assets/images/pages/${illustration}`).default

	const onSubmit = (data) => {
		if (isObjEmpty(errors)) {
			useJwt
				.login({ email, password })
				.then((res) => {
					const data = { ...res.data.userData, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }
					dispatch(handleLogin(data))
					ability.update(res.data.userData.ability)
					history.push(getHomeRouteForLoggedInUser(data.role))
				})
				.catch((err) => {
					console.log(err, "login error")
				})
		}
	}

	return (
		<div className="auth-wrapper auth-v2">
			<Row className="auth-inner m-0">
				<Link className="brand-logo" to="/">
					<img src={logo} className="main-logo" />
				</Link>
				<Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
					<div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
						<img className="img-fluid" src={source} alt="Login V2" />
					</div>
				</Col>
				<Col className="d-flex align-items-center auth-bg px-2 p-lg-5" lg="4" sm="12">
					<Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
						<CardTitle tag="h2" className="font-weight-bold mb-1">
							Welcome to Yakkaz! 👋
						</CardTitle>
						<CardText className="mb-2">Please sign-in to your account and start the adventure</CardText>

						<Form className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
							<FormGroup>
								<Label className="form-label" for="login-email">
									Email
								</Label>
								<Input
									autoFocus
									type="email"
									value={email}
									id="login-email"
									name="login-email"
									placeholder="Enter your email address to login"
									onChange={(e) => setEmail(e.target.value)}
									className={classnames({ "is-invalid": errors["login-email"] })}
									innerRef={register({ required: true, validate: (value) => value !== "" })}
								/>
							</FormGroup>
							<FormGroup>
								<div className="d-flex justify-content-between">
									<Label className="form-label" for="login-password">
										Password
									</Label>
								</div>
								<InputPasswordToggle
									value={password}
									id="login-password"
									name="login-password"
									placeholder="Enter your password to login"
									className="input-group-merge"
									onChange={(e) => setPassword(e.target.value)}
									className={classnames({ "is-invalid": errors["login-password"] })}
									innerRef={register({ required: true, validate: (value) => value !== "" })}
								/>
							</FormGroup>
							<FormGroup>
								<CustomInput type="checkbox" className="custom-control-Primary" id="remember-me" label="Remember Me" />
							</FormGroup>
							<Button.Ripple type="submit" color="primary" block>
								Sign in
							</Button.Ripple>
						</Form>
						<p className="text-center mt-2">
							<span className="mr-25">New to here?</span>
							<Link to="/register">
								<span>Create an account</span>
							</Link>
						</p>
					</Col>
				</Col>
			</Row>
		</div>
	)
}

export default Login
