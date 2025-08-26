import { Route, Routes } from 'react-router-dom'
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
import Contact from './pages/Contact'
import Shop from './pages/Shop'
import CategoryDetails from './pages/CategoryDetails'
import Article from './pages/Article'

function App() {
  return (
    
    <div className="flex flex-col min-h-screen">
      <Banner />
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sale' element={<Sale />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/article' element={<Article />} />
          <Route path='/pages/:id' element={<ProductDetail />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/category/:categoryName' element={<CategoryDetails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
