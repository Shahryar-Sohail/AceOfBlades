import image from '../assets/hero-bg.jpg'
import image1 from '../assets/logo.jpg'
import image2 from '../assets/g1.jpg'
import image3 from '../assets/g2.jpg'
import image4 from '../assets/g3.jpg'
import image5 from '../assets/knifecare.png'
import image6 from '../assets/li4.jpg'
import image7 from '../assets/knifeBag.jpg'

import { fetchProducts } from '../store/slices/productSlice'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { Link } from 'react-router-dom'


const Shop = () => {
    const dispatch = useAppDispatch();
    const { categoryCounts } = useAppSelector((state) => state.products);
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);


    return (
        <div>
            <div
                style={{ background: `url(${image})`, height: '200px' }}
                className='bg-fixed flex flex-col justify-center items-center '
            >
                <h1 className='text-white text-4xl font-bold'>SHOP</h1>
                <h1 className='text-white text-1xl font-bold'>HOME <span>&gt;&gt;</span> Shop</h1>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center flex-wrap gap-5 m-10 max-w-[1200px] mx-auto dark:text-black">

                <Link to={`/category/Uncategorized`}> <div className=" bg-base-100 w-64 shadow-lg overflow-hidden hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <div
                        style={{ background: `url(${image1})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                        className=' flex flex-col h-72 '
                    >
                        <div className="bg-white/90 relative top-40 flex flex-col justify-center items-center p-3">
                            <h2 className="font-bold" id='category'>Uncategorized</h2>
                            <p className=''>Products: {categoryCounts["Uncategorized"] || 0}</p>
                        </div>
                    </div>
                </div>
                </Link>

                <Link to={`/category/Collectors`}><div className=" bg-base-100 w-64 shadow-lg overflow-hidden hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <div
                        style={{ background: `url(${image2})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                        className=' flex flex-col h-72 '
                    >
                        <div className="bg-white/90 relative top-40 flex flex-col justify-center items-center p-3">
                            <h2 className="font-bold">Collectors and limited-edition knives</h2>
                            <p className=''>Products: {categoryCounts["Collectors"] || 0}</p>
                        </div>
                    </div>
                </div>
                </Link>

                <Link to={`/category/Fixed Blades`}><div className=" bg-base-100 w-64 shadow-lg overflow-hidden hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <div
                        style={{ background: `url(${image3})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                        className=' flex flex-col h-72 '
                    >
                        <div className="bg-white/90 relative top-40 flex flex-col justify-center items-center p-3">
                            <h2 className="font-bold">Fixed Blade Knives</h2>
                            <p className=''>Products: {categoryCounts["Fixed Blades"] || 0}</p>
                        </div>
                    </div>
                </div>
                </Link>

                <Link to={`/category/Folding Knives`}><div className=" bg-base-100 w-64 shadow-lg overflow-hidden hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <div
                        style={{ background: `url(${image4})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                        className=' flex flex-col h-72 '
                    >
                        <div className="bg-white/90 relative top-40 flex flex-col justify-center items-center p-3">
                            <h2 className="font-bold">Folding Knives</h2>
                            <p className=''>Products: {categoryCounts["Folding Knives"] || 0}</p>
                        </div>
                    </div>
                </div>
                </Link>
                {/* second row  */}
                <Link to={`/category/Key Rings`}><div className=" bg-base-100 w-64 shadow-lg overflow-hidden hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <div
                        style={{ background: `url(${image5})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                        className=' flex flex-col h-72 '
                    >
                        <div className="bg-white/90 relative top-40 flex flex-col justify-center items-center p-3">
                            <h2 className="font-bold">Key Ring</h2>
                            <p className=''>Products: {categoryCounts["Key Rings"] || 0}</p>
                        </div>
                    </div>
                </div>
                </Link>

                <Link to={`/category/Kitchen and Chef Knives`}><div className=" bg-base-100 w-64 shadow-lg overflow-hidden hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <div
                        style={{ background: `url(${image6})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                        className=' flex flex-col h-72 '
                    >
                        <div className="bg-white/90 relative top-40 flex flex-col justify-center items-center p-3">
                            <h2 className="font-bold">Kitchen and Chef Knives</h2>
                            <p className=''>Products: {categoryCounts["Kitchen and Chef Knives"] || 0}</p>
                        </div>
                    </div>
                </div>
                </Link>

                <Link to={`/category/Knife Care`}><div className=" bg-base-100 w-64 shadow-lg overflow-hidden hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <div
                        style={{ background: `url(${image3})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                        className=' flex flex-col h-72 '
                    >
                        <div className="bg-white/90 relative top-40 flex flex-col justify-center items-center p-3">
                            <h2 className="font-bold">Knife Care</h2>
                            <p className=''>Products: {categoryCounts["Knife Care"] || 0}</p>
                        </div>
                    </div>
                </div>
                </Link>

                <Link to={`/category/Straight Razors`}><div className=" bg-base-100 w-64 shadow-lg overflow-hidden hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <div
                        style={{ background: `url(${image7})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                        className=' flex flex-col h-72 '
                    >
                        <div className="bg-white/90 relative top-40 flex flex-col justify-center items-center p-3">
                            <h2 className="font-bold">Straight Razors</h2>
                            <p className=''>Products: {categoryCounts["Straight Razors"] || 0}</p>
                        </div>
                    </div>
                </div>
                </Link>

            </div>
        </div >
    )
}

export default Shop
