import { MessageSquare, FileText, Circle, User } from 'react-feather'

export default [
  {
    id: 'chat',
    title: 'Chat',
    icon: <MessageSquare size={20} />,
    navLink: '/apps/chat'
  },
  {
    id: 'pages',
    title: 'User Setting',
    icon: <User size={20} />,
    children: [
      {
        id: 'accountSettings',
        title: 'Account Settings',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/account-settings'
      },
      {
        id: 'profile',
        title: 'Profile',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/profile',
        collapsed: true
      }
    ]
  },
  {
    id: 'blog',
    title: 'Newsfeed',
    icon: <FileText size={12} />,
    children: [
      {
        id: 'blogList',
        title: 'List',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/blog/list'
      },
      {
        id: 'blogDetail',
        title: 'Detail',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/blog/detail'
      },
      {
        id: 'blogEdit',
        title: 'Edit',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/blog/edit'
      }
    ]
  }
]
