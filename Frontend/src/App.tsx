import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Banner from './components/Banner'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './index.css'
import Home from './pages/Home'
import Sale from './pages/Sale'

function App() {


  return (
    <Router>
      <Banner />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sale' element={<Sale />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
