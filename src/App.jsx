import './App.css'
import ContentView from './components/ContentView'
import NavBar from './components/NavBar/NavBar'
import TitleBar from './components/TitleBar/TitleBar'
import ViewProvider from './providers/ViewProvider'

function App() {
	return (
		<>
			<ViewProvider>
				<TitleBar></TitleBar>
				<NavBar></NavBar>
				<ContentView></ContentView>
			</ViewProvider>
		</>
	)
}

export default App
