import { RouterProvider } from 'react-router-dom'
import './App.css'
import ContentView from './components/ContentView'
import NavBar from './components/NavBar/NavBar'
import TitleBar from './components/TitleBar/TitleBar'
import AppProviders from './providers/AppProviders'
import ViewProvider from './providers/ViewProvider'
import { router } from './router'
import { useEffect, useRef } from 'react'
import dayjs from 'dayjs'

function App() {
	const lastDateRef = useRef(dayjs().format("YYYY-MM-DD"));

	useEffect(() => {
		const interval = setInterval(() => {
			const today = dayjs().format("YYYY-MM-DD");
			if(today !== lastDateRef.current){
				lastDateRef.current = today;
				// console.log("reloaded at ",today)
				window.location.reload();
			}
		},60 * 1000);

		return () => clearInterval(interval)
	},[]);

	return (
		<AppProviders>
			<RouterProvider router={router}></RouterProvider>
		</AppProviders>
	)
}

export default App
