import '../index.css'
import logo from '../assets/logo-small.jpg'
import logoSmall from '../assets/logo.jpg'
import li2 from '../assets/li2.jpg'
import li3 from '../assets/li3.jpg'
import li4 from '../assets/li4.jpg'
import li5 from '../assets/keyrings.jpg'
import li6 from '../assets/knifecare.png'
import li7 from '../assets/razor.jpg'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { listenCartCount } from "../firebase";

const Navbar = () => {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const unsubscribe = listenCartCount((count: number) => {
            setCartCount(count);
        });

        return () => unsubscribe(); 
    }, []);


    return (
        <div className='w-[98%] sticky top-6 z-50 bg-white'>
            <div className="navbar shadow-sm py-6  bg-white max-w-[1200px] mx-auto">
                {/* mobile navbar  */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-screen pr-10 -left-2 shadow text-xl">
                            <li><Link to="/">Home</Link></li>
                            <li>
                                <details>
                                    <summary><Link to="/shop">AOB Collection</Link></summary>
                                    <ul className="p-2 text-red-700 text-sm">
                                        <li className='flex flex-row items-center'>
                                            <img src={logoSmall} className='w-16' />
                                            <a>Uncategorized22 products</a>
                                        </li>
                                        <li className='flex flex-row items-center'>
                                            <img src={li2} className='w-24' />
                                            <a>Collectors and knives33 products</a>
                                        </li>
                                        <li className='flex flex-row items-center'>
                                            <img src={li3} className='w-24' />
                                            <a>Fixed Blades</a>
                                        </li>
                                        <li className='flex flex-row items-center'>
                                            <img src={li4} className='w-24' />
                                            <a>Folding Knives1818 products</a>
                                        </li>
                                        <li className='flex flex-row items-center'>
                                            <img src={li5} className='w-24' />
                                            <a>Key Rings11 product</a>
                                        </li>
                                        <li className='flex flex-row items-center'>
                                            <img src={li3} className='w-24' />
                                            <a>Kitchen and chef knives2020 products</a>
                                        </li>
                                        <li className='flex flex-row items-center'>
                                            <img src={li6} className='w-24' />
                                            <a>Knife Care33 products</a>
                                        </li>
                                        <li className='flex flex-row items-center'>
                                            <img src={li7} className='w-24' />
                                            <a>Straight razors7</a>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            <li><Link to="/sale">On Sale</Link></li>
                            <li><a>Articals</a></li>
                            <li><Link to="/gallery">Gallery</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                            <li><Link to="/checkout">Checkout</Link></li>
                            <li><Link to="/contact">Contact US</Link></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost w-32"><img src={logo} /></a>
                </div>

                <div className=' w-full flex sm:hidden justify-end -mr-24'>
                    <Link to='/cart' className='md:block border border-black p-2 relative'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                        </svg>
                        <div className="badge badge-sm badge-neutral absolute -top-3 left-5">{cartCount}</div>
                    </Link>
                </div>


                {/* pc navbar  */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-xl font-semibold">
                        <li><Link to="/">Home</Link></li>
                        <li>
                            <details>
                                <summary><Link to="/shop">AOB Collection</Link></summary>
                                <ul className="p-2 w-96 text-red-700 text-sm">
                                    <li className='flex flex-row items-center'>
                                        <img src={logoSmall} className='w-24' />
                                        <a>Uncategorized22 products</a>
                                    </li>
                                    <li className='flex flex-row items-center'>
                                        <img src={li2} className='w-24' />
                                        <a>Collectors and knives33 products</a>
                                    </li>
                                    <li className='flex flex-row items-center'>
                                        <img src={li3} className='w-24' />
                                        <a>Fixed Blades</a>
                                    </li>
                                    <li className='flex flex-row items-center'>
                                        <img src={li4} className='w-24' />
                                        <a>Folding Knives1818 products</a>
                                    </li>
                                    <li className='flex flex-row items-center'>
                                        <img src={li5} className='w-24' />
                                        <a>Key Rings11 product</a>
                                    </li>
                                    <li className='flex flex-row items-center'>
                                        <img src={li3} className='w-24' />
                                        <a>Kitchen and chef knives2020 products</a>
                                    </li>
                                    <li className='flex flex-row items-center'>
                                        <img src={li6} className='w-24' />
                                        <a>Knife Care33 products</a>
                                    </li>
                                    <li className='flex flex-row items-center'>
                                        <img src={li7} className='w-24' />
                                        <a>Straight razors7</a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li><Link to='/sale'>On Sale</Link></li>
                        <li><a>Articals</a></li>
                        <li><Link to="/gallery">Gallery</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                        <li><Link to="/checkout">Checkout</Link></li>
                        <li><Link to="/contact">Contact US</Link></li>
                    </ul>
                </div>
                <div className="navbar-end justify-center p-2">
                    <Link to='/login' className='hidden md:block mr-5' >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="brown" className="size-6">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                        </svg>
                    </Link>
                    <Link to='/cart' className='hidden md:block border border-black p-2 relative'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                        </svg>
                        <div className="badge badge-sm badge-neutral absolute -top-3 left-5">{cartCount}</div>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default Navbar
