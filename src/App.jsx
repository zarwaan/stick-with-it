import { RouterProvider } from 'react-router-dom'
import './App.css'
import ContentView from './components/ContentView'
import NavBar from './components/NavBar/NavBar'
import TitleBar from './components/TitleBar/TitleBar'
import AppProviders from './providers/AppProviders'
import ViewProvider from './providers/ViewProvider'
import { router } from './router'

function App() {
	return (
		<AppProviders>
			{/* <TitleBar></TitleBar>
			<NavBar></NavBar>
			<ContentView></ContentView> */}
			<RouterProvider router={router}></RouterProvider>
		</AppProviders>
	)
}

export default App
