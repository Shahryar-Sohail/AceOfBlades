import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import '../index.css'
import { useEffect} from "react";
import { motion } from "motion/react"
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts } from "../store/slices/productSlice";
import { addToCart } from "../store/slices/cartSlice";




const Section8 = () => {

      const dispatch = useAppDispatch();
      const { items: products } = useAppSelector((state) => state.products);
    
      useEffect(() => {
        dispatch(fetchProducts());
      }, [dispatch]);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]


    };
    return (
        <div className=" m-10 w-5/6 mx-auto max-w-[1200px] ">
            <h1 className="text-4xl font-semibold text-left">RECENT PRODUCTS</h1>

            <div className="slider-container">
                <Slider {...settings} >
                    {products.map((product) => (
                        <div key={product.id}>
                            <img src={product.imageUrl} className="w-full md:w-3/4"></img>
                            <h1 className="text-xl font-semibold">{product.title}</h1>
                            <h1 className="font-semibold p-1">Rs {product.finalPrice}</h1>
                            <div className="flex items-center justify-center m-2">
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                                    className="btn btn-neutral text-white rounded-3xl"
                                >
                                    Add To Cart
                                </motion.button>
                            </div>
                        </div>
                    ))}


                    {/* <div>
                        <img src={k2} className="w-full md:w-3/4"></img>
                        <h1 className="text-xl font-semibold">AOB-2452 Handmade <br /> Damascus Chef's Knife</h1>
                        <h1 className="font-semibold p-1">Rs 980</h1>
                        <div className="flex items-center justify-center m-2">
                            <button className="btn btn-neutral btn-outline">Add To Cart</button>
                        </div>
                    </div>
                    <div>
                        <img src={k1} className="w-full md:w-3/4"></img>
                        <h1 className="text-xl font-semibold">AOB-2452 Handmade <br /> Damascus Chef's Knife</h1>
                        <h1 className="font-semibold p-1">Rs 980</h1>
                        <div className="flex items-center justify-center m-2">
                            <button className="btn btn-neutral btn-outline">Add To Cart</button>
                        </div>
                    </div>
                    <div>
                        <img src={k1} className="w-full md:w-3/4"></img>
                        <h1 className="text-xl font-semibold">AOB-2452 Handmade <br /> Damascus Chef's Knife</h1>
                        <h1 className="font-semibold p-1">Rs 980</h1>
                        <div className="flex items-center justify-center m-2">
                            <button className="btn btn-neutral btn-outline">Add To Cart</button>
                        </div>
                    </div>
                    <div>
                        <img src={k2} className="w-full md:w-3/4"></img>
                        <h1 className="text-xl font-semibold">AOB-2452 Handmade <br /> Damascus Chef's Knife</h1>
                        <h1 className="font-semibold p-1">Rs 980</h1>
                        <div className="flex items-center justify-center m-2">
                            <button className="btn btn-neutral btn-outline">Add To Cart</button>
                        </div>
                    </div>
                    <div>
                        <img src={k1} className="w-full md:w-3/4"></img>
                        <h1 className="text-xl font-semibold">AOB-2452 Handmade <br /> Damascus Chef's Knife</h1>
                        <h1 className="font-semibold p-1">Rs 980</h1>
                        <div className="flex items-center justify-center m-2">
                            <button className="btn btn-neutral btn-outline">Add To Cart</button>
                        </div>
                    </div> */}




                </Slider>
            </div>

        </div>
    )
}
export default Section8
