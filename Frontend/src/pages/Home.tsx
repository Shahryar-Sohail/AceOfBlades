
import bg from '../assets/hero-bg.jpg'
import Section2 from '../sections/Section2'
import Section3 from '../sections/Section3'
import Section4 from '../sections/Section4'
import Section5 from '../sections/Section5'
import Section6 from '../sections/Section6'
import Section7 from '../sections/Section7'
import Section8 from '../sections/Section8'
const Home = () => {
    return (
        <div>
            <div
                className="relative bg-center bg-fixed bg-cover"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundAttachment: 'fixed',
                }}
            >
                <div className="absolute inset-0 bg-black/40 z-0"></div>

                <div className="relative flex justify-center px-4 lg:px-0">
                    <div className="max-w-[1200px] w-full py-40 text-right pr-12">
                        <h1 className="text-white text-5xl lg:text-6xl font-semibold">
                            THE CRAFTERS OF LIFE
                        </h1>

                        <p className="text-white text-md mt-4 max-w-[800px] ml-auto">
                            THESE LINES HAVE SHAPED YOUR LIFE. FROM THE CONTOUR LINES OF THE
                            FIELDS WORKED, THE ROADS BENDING AROUND MOUNTAINS AND THE RIPPLE FROM
                            THE FIRST DROP OF LONG AWAITED RAIN...
                        </p>

                        <p className="text-white text-md mt-2 pr-1">- THE ACE OF BLADES</p>

                        <div className="flex justify-end gap-4 mt-4 pr-1 -mr-16 sm:mr-0">
                            <button className="btn btn-soft bg-white hover:bg-gray-800 hover:text-white hover:border-none rounded-none w-40">
                                SHOP NOW
                            </button>
                            <button className="btn btn-soft bg-white hover:bg-gray-800 hover:text-white hover:border-none rounded-none w-40">
                                KNIFE CARE
                            </button>
                        </div>
                    </div>
                </div>
            </div>



            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Section6 />
            <Section7 />
            <Section8 />
        </div>

    )
}

export default Home
