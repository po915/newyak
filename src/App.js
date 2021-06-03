// ** Router Import
import { useDispatch } from "react-redux"
import { setCurrentUser, setUserInfo } from "./redux/actions/userinfo"
import Router from "./router/Router"

const App = (props) => {
	const dispatch = useDispatch()

	const sUser = JSON.parse(localStorage.getItem("sUser"))
	dispatch(setUserInfo(sUser))

	return <Router />
}

export default App
