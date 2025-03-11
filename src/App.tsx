import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DreamMapPage from './pages/DreamMapPage';
import StarBackground from './components/StarBackground'


function App() {

  return (
    <>
    <Router>
      <div className='app'>
        <StarBackground />
        <Routes>
          <Route path='/' element={<DreamMapPage />}/>
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
