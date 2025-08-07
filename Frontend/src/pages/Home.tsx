
import bg from '../assets/hero-bg.jpg'
const Home = () => {
    return (
        <div>
            <div>
                <div className='relative h-[85vh] bg-center bg-fixed bg-cover flex justify-center md:justify-end items-center' style={{
                    backgroundImage: `url(${bg})`,
                    backgroundAttachment: 'fixed',
                }}>
                     <div className="absolute inset-0 bg-black/40 z-0"></div>
                    <div className='relative w-full lg:w-1/2 mx-10'>
                        <h1 className=' text-white text-5xl md:text-7xl font-semibold'>THE CRAFTERS OF LIFE</h1>
                        <p className='text-white text-md text-end'>THESE LINES HAVE SHAPED YOUR LIFE. fROM THE CONTOUR LINES OF THE FIELDS WORKED, THE ROADS BENDING AROUND MOUNTAINS AND THE RIPPLE FROM THE FIRST DROP OF LONG AWAITED RAIN. tHE GLOWING RINGS OF OAK DISAPPEARING INTO THE FIRE PIT AND THE FOLDS OF FRESH DOUGH IN THE KITCHEN. eACH UNIQUE AND ETCHED INTO YOUR LIFE STORY, JUST AS THE SOFT LINES O​​F AGE THAT HAVE SHAPED YOUR FATHER’S FACE AND HARD WORKING HANDS. tHESE LINES GUIDE US, DEFINE US, AND REMIND US. tHEY COME TO LIFE IN OUR BLADES.</p>
                        <p className='text-white text-md text-end'>- THE ACE OF BLADES</p>
                        <div className='flex justify-end  gap-4 mt-4'>
                            <button className="btn btn-soft bg-white hover:bg-gray-800 hover:text-white hover:border-none rounded-none w-40">SHOP NOW</button>
                            <button className="btn btn-soft bg-white hover:bg-gray-800 hover:text-white hover:border-none rounded-none w-40">KNIFE CARE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
