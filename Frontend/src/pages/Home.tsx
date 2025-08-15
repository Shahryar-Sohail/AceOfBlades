
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
            <div>
                <div className='relative max-h-auto bg-center bg-fixed bg-cover flex justify-center md:justify-end px-2 lg:px-[19%]' style={{
                    backgroundImage: `url(${bg})`,
                    backgroundAttachment: 'fixed',
                }}>
                    <div className="absolute inset-0 bg-black/40 z-0"></div>

                    <div className='relative w-full md:w-4/6  my-40'>
                        <div className='max-w-[1200px] mx-auto'>
                            <h1 className=' text-white text-5xl lg:text-6xl font-semibold text-end'>THE CRAFTERS OF LIFE</h1>
                            <p className='text-white text-md text-end'>THESE LINES HAVE SHAPED YOUR LIFE. fROM THE CONTOUR LINES OF THE FIELDS WORKED, THE ROADS BENDING AROUND MOUNTAINS AND THE RIPPLE FROM THE FIRST DROP OF LONG AWAITED RAIN. tHE GLOWING RINGS OF OAK DISAPPEARING INTO THE FIRE PIT AND THE FOLDS OF FRESH DOUGH IN THE KITCHEN. eACH UNIQUE AND ETCHED INTO YOUR LIFE STORY, JUST AS THE SOFT LINES O​​F AGE THAT HAVE SHAPED YOUR FATHER’S FACE AND HARD WORKING HANDS. tHESE LINES GUIDE US, DEFINE US, AND REMIND US. tHEY COME TO LIFE IN OUR BLADES.</p>
                            <p className='text-white text-md text-end'>- THE ACE OF BLADES</p>
                            <div className='flex justify-end  gap-4 mt-4 '>
                                <button className="btn btn-soft bg-white hover:bg-gray-800 hover:text-white hover:border-none rounded-none w-40">SHOP NOW</button>
                                <button className="btn btn-soft bg-white hover:bg-gray-800 hover:text-white hover:border-none rounded-none w-40">KNIFE CARE</button>
                            </div>
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
