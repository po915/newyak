import { useState, useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import { Auth, API, graphqlOperation } from "aws-amplify"
import { useDispatch } from "react-redux"
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap"
import { handleLogin } from "@store/actions/auth"
import { AbilityContext } from "@src/utility/context/Can"
import * as mutations from "@src/graphql/mutations"

import "@styles/base/pages/page-auth.scss"

import logo from "@src/assets/images/logo/main-logo.png"
import { setUserInfo } from "@src/redux/actions/userinfo"

import LoadingOverlay from "react-loading-overlay"

import Swal from "sweetalert2/dist/sweetalert2.js"
import "sweetalert2/src/sweetalert2.scss"

const EmailVerify = () => {
  const ability = useContext(AbilityContext)
  const history = useHistory()
  const dispatch = useDispatch()
  const [isLogging, setIsLogging] = useState(false)
  var temp = JSON.parse(localStorage.getItem("tempData"))
  let email = temp.userData.user.username
  let password = temp.password

  if (!email) {
    history.push("/login")
  }

  const [code, setCode] = useState("")

  const resendCode = (e) => {
    e.preventDefault()
    Auth.resendSignUp(email).then((res) => {
      console.log(res, "Resend Result")
    })
  }
  const onSubmit = () => {
    setIsLogging(true)
    try {
      Auth.confirmSignUp(email, code)
        .then((res) => {
          if (res == "SUCCESS") {
            ability.update([
              {
                action: "manage",
                subject: "all",
              },
            ])
            Auth.signIn(email, password).then(() => {
              const input = {
                name: temp.username,
                email: email,
              }

              API.graphql(
                graphqlOperation(mutations.createUserinfo, { input: input })
              ).then((sUser) => {
                dispatch(setUserInfo(sUser.data?.createUserinfo))
                Auth.currentAuthenticatedUser().then((user) => {
                  Auth.updateUserAttributes(user, {
                    nickname: sUser.data.createUserinfo.id,
                  })
                })
              })

              const userData = {
                name: temp.username,
                sub: temp.userData.userSub,
                accessToken: temp.accessToken,
                refreshToken: temp.refreshToken,
                email: temp.userData.user.username,
                ability: temp.userData.ability,
                role: "admin",
              }
              setIsLogging(false)
              ability.update(temp.userData.ability)
              dispatch(handleLogin(userData))
              history.push("/main")
            })
          }
        })
        .catch((err) => {
          setIsLogging(false)
          Swal.fire({
            title: "Invalid Code!",
            text: "Please insert correct verification code.",
            icon: "error",
            confirmButtonText: "Retry",
          })
        })
    } catch (err) {
      setIsLogging(false)
      Swal.fire({
        title: "Invalid Code!",
        text: "Please insert correct verification code.",
        icon: "error",
        confirmButtonText: "Retry",
      })
      console.log(err, "exception error")
    }
  }

  return (
    <>
      <LoadingOverlay
        active={isLogging}
        spinner
        text="Just a moment..."
        styles={{
          overlay: (base) => ({
            ...base,
            position: "absolute",
            width: "100vw",
            height: "100vh",
          }),
        }}></LoadingOverlay>
      <div className="auth-wrapper auth-v1 px-2">
        <div className="auth-inner py-2">
          <Card className="mb-0">
            <CardBody>
              <Link
                className="brand-logo"
                to="/"
                onClick={(e) => e.preventDefault()}>
                <img src={logo} className="main-logo" />
              </Link>
              <CardTitle tag="h4" className="mb-1">
                Verify your Email Address 📧
              </CardTitle>
              <CardText className="mb-2">
                Check your inbox and please enter the verify code here.
              </CardText>
              <Form className="auth-forgot-password-form mt-2" onSubmit={onSubmit}>
                <FormGroup>
                  <Label className="form-label" for="login-email">
                    Code
                  </Label>
                  <Input
                    type="text"
                    id="login-email"
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="6 digits"
                    autoFocus
                  />
                </FormGroup>
                <p>
                  Not received code?
                  <Link className="mb-4" to="/" onClick={(e) => resendCode(e)}>
                    Resend Code
                  </Link>
                </p>
                <Button.Ripple type="submit" color="primary" block>
                  Send Code
                </Button.Ripple>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}

export default EmailVerify
