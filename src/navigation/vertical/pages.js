import { FileText, Circle } from 'react-feather'
export default [
  {
    id: 'pages',
    title: 'User Setting',
    icon: <FileText size={20} />,
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
    icon: <Circle size={12} />,
    children: [
      {
        id: 'blogList',
        title: 'List',
        permissions: ['admin', 'editor'],
        navLink: '/pages/blog/list'
      },
      {
        id: 'blogDetail',
        title: 'Detail',
        permissions: ['admin', 'editor'],
        navLink: '/pages/blog/detail'
      },
      {
        id: 'blogEdit',
        title: 'Edit',
        permissions: ['admin', 'editor'],
        navLink: '/pages/blog/edit'
      }
    ]
  }
]
