import mock from "../mock"
import jwt from "jsonwebtoken"
import { Auth } from "aws-amplify"

const jwtConfig = {
	secret: "dd5f3089-40c3-403d-af14-d0c228b05cb4",
	refreshTokenSecret: "7c4c1c50-3230-45bf-9eae-c9b2e401c767",
	expireTime: "10m",
	refreshTokenExpireTime: "10m",
}

mock.onPost("/jwt/login").reply((request) => {
	const { email, password } = JSON.parse(request.data)
	let error = {
		email: ["Something went wrong"],
	}
	try {
		return Auth.signIn(email, password)
			.then((res) => {
				const accessToken = jwt.sign({ id: res.username }, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })
				const refreshToken = jwt.sign({ id: res.username }, jwtConfig.refreshTokenSecret, {
					expiresIn: jwtConfig.refreshTokenExpireTime,
				})
				res.ability = [
					{
						action: "manage",
						subject: "all",
					},
				]
				res.role = "admin"
				const userData = { ...res }
				const response = {
					userData,
					accessToken,
					refreshToken,
				}
				return [200, response]
			})
			.catch((error) => {
				console.log(error, "Cognito Error")
				return [400, { error }]
			})
	} catch (e) {}
})

mock.onPost("/jwt/register").reply((request) => {
	const { email, password, username } = JSON.parse(request.data)
	var isEmailAlreadyInUse = false
	var isUsernameAlreadyInUse = false
	const error = {
		email: isEmailAlreadyInUse ? "This email is already in use." : null,
		username: isUsernameAlreadyInUse ? "This username is already in use." : null,
	}

	try {
		return Auth.signUp({
			username: email,
			password,
			attributes: {
				email: email,
				name: username,
			},
		}).then((res) => {
			console.log(res, "SignUp Result")
			const accessToken = jwt.sign({ id: res.userSub }, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })
			const refreshToken = jwt.sign({ id: res.userSub }, jwtConfig.refreshTokenSecret, {
				expiresIn: jwtConfig.refreshTokenExpireTime,
			})
			res.ability = [
				{
					action: "manage",
					subject: "all",
				},
			]
			res.role = "admin"
			const userData = { ...res }
			const response = {
				username,
				password,
				userData,
				accessToken,
				refreshToken,
			}
			localStorage.setItem("tempData", JSON.stringify(response))
			return [200, response]
		})
	} catch (err) {
		return [400, { error }]
	}
})

mock.onPost("/jwt/refresh-token").reply((request) => {
	const { refreshToken } = JSON.parse(request.data)

	try {
		const { id } = jwt.verify(refreshToken, jwtConfig.refreshTokenSecret)

		const userData = { ...data.users.find((user) => user.id === id) }

		const newAccessToken = jwt.sign({ id: userData.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })
		const newRefreshToken = jwt.sign({ id: userData.id }, jwtConfig.refreshTokenSecret, {
			expiresIn: jwtConfig.refreshTokenExpireTime,
		})

		delete userData.password
		const response = {
			userData,
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
		}

		return [200, response]
	} catch (e) {
		const error = "Invalid refresh token"
		return [401, { error }]
	}
})
