import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import k1 from '../assets/k1.jpg';
import k2 from '../assets/k2.jpg';
import '../index.css'


const Section8 = () => {

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
        <div className=" m-10 w-5/6 mx-auto">
            <h1 className="text-4xl font-semibold text-left">RECENT PRODUCTS</h1>

            <div className="slider-container">
                <Slider {...settings} >
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
                    </div>

             


                </Slider>
            </div>

        </div>
    )
}
export default Section8
