import { Home, MessageSquare, FileText, Circle, User } from 'react-feather'
export default [
  {
    id: 'Home',
    title: 'Dashboards',
    icon: <Home size={20} />,
    navLink: '/dashboard'
  },
  {
    id: 'blog',
    title: 'Post',
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
  },
  {
    id: 'chat',
    title: 'Chat',
    icon: <MessageSquare size={20} />,
    navLink: '/apps/chat'
  }
]
