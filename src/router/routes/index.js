import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
// ** Document title
const TemplateTitle = "%s - Yakkaz"

// ** Default Route
const DefaultRoute = "/main"

const Routes = [
	{
		path: "/main",
		component: lazy(() => import("../../views/main")),
		exact: true,
	},
	{
		path: "/profile",
		component: lazy(() => import("../../views/profile")),
		exact: true,
	},
	{
		path: "/chat",
		appLayout: true,
		className: "chat-application",
		component: lazy(() => import("../../views/chat")),
	},
	// {
	// 	path: "/chatt",
	// 	appLayout: true,
	// 	className: "chat-application",
	// 	component: lazy(() => import("../../views/chatt")),
	// },
	{
		path: "/home",
		component: lazy(() => import("../../views/home")),
		layout: "BlankLayout",
		meta: {
			authRoute: true,
		},
	},
	{
		path: "/login",
		component: lazy(() => import("../../views/authentication/Login")),
		layout: "BlankLayout",
		meta: {
			authRoute: true,
		},
	},
	{
		path: "/register",
		component: lazy(() => import("../../views/authentication/Register")),
		layout: "BlankLayout",
		meta: {
			authRoute: true,
		},
	},
	{
		path: "/email-verify",
		component: lazy(() => import("../../views/authentication/EmailVerify")),
		layout: "BlankLayout",
		meta: {
			authRoute: true,
		},
	},
	{
		path: "/account-settings",
		component: lazy(() => import("../../views/account-settings")),
	},
	{
		path: "/blog/all",
		exact: true,
		component: lazy(() => import("../../views/blog/all")),
	},
	{
		path: "/blog/list",
		exact: true,
		component: lazy(() => import("../../views/blog/list")),
	},
	{
		path: "/blog/draft",
		exact: true,
		component: lazy(() => import("../../views/blog/draft")),
	},
	{
		path: "/blog/detail/:id",
		exact: true,
		component: lazy(() => import("../../views/blog/details")),
	},
	{
		path: "/blog/edit/:id",
		exact: true,
		component: lazy(() => import("../../views/blog/edit")),
		meta: {
			navLink: "/blog/edit",
		},
	},
	{
		path: "/blog/edit",
		exact: true,
		component: () => <Redirect to="/blog/edit/1" />,
	},
	{
		path: "/blog/new",
		exact: true,
		component: lazy(() => import("../../views/blog/new")),
	},
	{
		path: "/misc/not-authorized",
		component: lazy(() => import("../../views/misc/NotAuthorized")),
		layout: "BlankLayout",
		meta: {
			publicRoute: true,
		},
	},
	{
		path: "/misc/maintenance",
		component: lazy(() => import("../../views/misc/Maintenance")),
		layout: "BlankLayout",
		meta: {
			publicRoute: true,
		},
	},
	{
		path: "/misc/error",
		component: lazy(() => import("../../views/misc/Error")),
		layout: "BlankLayout",
		meta: {
			publicRoute: true,
		},
	},
]

export { DefaultRoute, TemplateTitle, Routes }