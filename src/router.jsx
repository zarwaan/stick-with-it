import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Register.jsx'
import Error404 from './components/Error404.jsx'
import Profile from './components/Profile/Profile.jsx'
import NewHabit from './components/NewHabit/NewHabit.jsx'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout></Layout>,
		children: [
			{
				index: true,
				element: <Home></Home>
			},
			{
				path: 'login',
				element: <Login></Login>
			},
			{
				path: 'register',
				element: <Register></Register>
			},
			{
				path: 'new-habit',
				element: <NewHabit></NewHabit>
			},
			{
				path: 'user',
				element: <Profile></Profile>
			},
			{
				path: '*',
				element: <Error404></Error404>
			}
		],
  }
]);