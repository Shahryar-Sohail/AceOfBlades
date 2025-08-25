import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import '../index.css'
import { useEffect, useState } from "react";
import { motion } from "motion/react"
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts } from "../store/slices/productSlice";
import { addToCart } from "../store/slices/cartSlice";

const Section8 = () => {
    const dispatch = useAppDispatch();
    const { items: products } = useAppSelector((state) => state.products);

    // Track screen width
    const [slidesToShow, setSlidesToShow] = useState(3);

    useEffect(() => {
        dispatch(fetchProducts());

        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSlidesToShow(1); // mobile
            } else if (window.innerWidth < 1024) {
                setSlidesToShow(2); // tablet
            } else {
                setSlidesToShow(3); // desktop
            }
        };

        handleResize(); // initial check
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [dispatch]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow, // dynamically updated
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear"
    };
    return (
        <div className=" m-10 w-5/6 mx-auto max-w-[1200px] ">
            <h1 className="text-4xl font-semibold text-left">RECENT PRODUCTS</h1>

            <div className="slider-container">
                <Slider {...settings} >
                    {products.map((product) => (
                        <div key={product.id} className="hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <img src={product.imageUrl} className="w-full md:w-3/4" />
                            <h1 className="text-xl font-semibold">{product.title}</h1>
                            <h1 className="font-semibold p-1">Rs {product.finalPrice}</h1>
                            <div className="flex items-center justify-center m-2">
                                <motion.button
                                    whileTap={{ scale: 0.1 }}
                                    whileHover={{ scale: 1.15 }}
                                    onClick={(e) => {
                                        const btn = e.currentTarget;
                                        btn.innerHTML = "✔ Added!";
                                        setTimeout(() => (btn.innerHTML = "Add To Cart"), 1500);
                                        dispatch(addToCart({ ...product, quantity: 1 }))
                                    }}
                                    className="btn btn-neutral text-white rounded-3xl"
                                >
                                    Add To Cart
                                </motion.button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

        </div>
    )
}
export default Section8
