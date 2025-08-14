import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Banner from './components/Banner'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './index.css'
import Home from './pages/Home'
import Sale from './pages/Sale'
import Login from './pages/Login'
import AdminPanel from './pages/AdminPanel'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Gallery from './pages/Gallery'
import ProductDetail from './pages/ProductDetail'
// import {app} from './firebase'
// import { getDatabase } from 'firebase/database'

// const db = getDatabase(app);

function App() {


  return (
    <>
      <Banner />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sale' element={<Sale />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/pages/:id' element={<ProductDetail />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
