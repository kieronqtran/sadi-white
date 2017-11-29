import UserAccount from 'views/UserAccount/UserAccount'
import Login from 'views/Login/Login'
import Signup from '../views/Signup/Signup'
import Test from 'views/Test/Test'
import AdminTest from 'containers/AdminTest/AdminTest'
import TestForm from 'views/Test/TestForm'

const appRoutes = [
  {
    path: '/login',
    name: 'Login',
    icon: 'pe-7s-id',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    icon: 'pe-7s-science',
    component: Signup,
  },
  {
    path: '/user',
    name: 'User Account',
    icon: 'pe-7s-user',
    component: UserAccount,
  },
  {
    path: '/test',
    name: 'Test',
    icon: 'pe-7s-news-paper',
    component: Test,
  },
  {
    path: '/takeTest/:testId',
    component: TestForm,
  },
  // {
  //   redirect: true,
  //   from: "/test",
  //   to: '/takeTest/:testId',
  //   component: TestForm,
  //   name: "Taking Test"
  // },
  {
    path: '/admintest',
    name: 'Manage Test',
    icon: 'pe-7s-bookmarks',
    component: AdminTest,
  },

  {
    redirect: true,
    path: '/',
    to: '/login',
    name: 'Login',
  },
]

export default appRoutes
