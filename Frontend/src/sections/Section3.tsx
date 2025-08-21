import image from '../assets/section3.jpg'
import finger from '../assets/finger.png'
import fire from '../assets/fire.png'
import hands from '../assets/hands.png'

const Section3 = () => {
    return (
        <div className="p-5 overflow-hidden ">
            <div className='flex flex-col lg:flex-row justify-between items-center max-w-[1200px] mx-auto'>

                <div className="w-full lg:w-2/4">
                    <h1 className="text-3xl font-semibold  md:text-5xl">WHO ARE WE</h1>
                    <p className="text-lg font-semibold">HOMEMADE & HANDCRAFTED</p>
                    <p className="text-lg">We are Ace of Blades and just like you, we appreciate the finest craftsmanship for the most rugged terrain. We are here to share a passion for only the sharpest and more beautiful Damascus blades, no bells and hunting whistles, just beautiful and finely crafted blades.
                    </p>
                    <p className="text-lg mt-5">
                        The crafting process of each knife is a humble journey indeed, an experience we hope to share with you. Handcrafted by only the best, we believe each blade tells a story, captures a memory and holds the potential to add to your unique story. Made from only the finest Damascus, Carbon and stainless steel, our knives are perfect for the wild terrain or for the collection in the glass case.</p>
                    <div className='flex w-full p-0'>
                        <div className="card bg-base-100 w-80 shadow-sm">
                            <figure className="px-10 pt-10 ">
                                <img
                                    src={fire}
                                    alt="Shoes"
                                    className="rounded-full bg-black lg:p-4 p-1 lg:w-2/4 w-full" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title text-xs">R E A L &nbsp; D A M A S C U S <br /> S T E E L</h2>
                            </div>
                        </div>

                        <div className="card bg-base-100 w-80 shadow-sm">
                            <figure className="px-10 pt-10 ">
                                <img
                                    src={hands}
                                    alt="Shoes"
                                    className="rounded-full bg-black lg:p-4 p-1 lg:w-2/4 w-full" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title text-xs ">H A N D &nbsp; <br /> C R A F T E D</h2>
                            </div>
                        </div>


                        <div className="card bg-base-100 w-80 shadow-sm">
                            <figure className="px-10 pt-10 ">
                                <img
                                    src={finger}
                                    alt="Shoes"
                                    className="rounded-full bg-black lg:p-4 p-1 lg:w-2/4 w-full" />
                            </figure>

                            <div className="card-body items-center text-center">
                                <h2 className="card-title text-xs">U N I Q E U L Y &nbsp; <br /> M A D E</h2>
                            </div>
                        </div>
                    </div>
                </div>
                {/* main image  */}
                <div className='flex justify-center items-center w-full overflow-hidden'>
                    <img src={image} alt="Section 3" className="w-full lg:w-4/6 h-auto shadow-lg" />
                </div>
            </div>
        </div>
    )
}

export default Section3
