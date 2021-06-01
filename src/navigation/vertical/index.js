import { Home, MessageSquare, FileText, Circle, User } from 'react-feather'
export default [
  {
    id: 'Home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/main'
  },
  {
    id: 'blog',
    title: 'Article',
    icon: <FileText size={12} />,
    children: [
      {
        id: 'allArticle',
        title: 'All articles',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/blog/all'
      },
      {
        id: 'ownArticle',
        title: 'Your articles',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/blog/list'
      },
      {
        id: 'ownDraft',
        title: 'Your drafts',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/blog/draft'
      },
      {
        id: 'blogEdit',
        title: 'New Article',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/blog/new'
      }
    ]
  },
  {
    id: 'chat',
    title: 'Chat',
    icon: <MessageSquare size={20} />,
    navLink: '/chat'
  }
]