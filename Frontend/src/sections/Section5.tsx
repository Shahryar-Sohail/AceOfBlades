import image from '../assets/knifeinbag.jpg'


const Section5 = () => {
    return (
        <div className="block lg:flex  justify-between items-center p-10 md:p-40 overflow-hidden">
            <div className="w-full lg:w-5/6">
                <h1 className="text-3xl font-semibold  md:text-5xl">THE HISTORY </h1>
                <p className="text-lg ">o f &nbsp; d a m a s c u s</p>
               
                <p className="text-lg mt-5">
                    Damascus is a well-known style of steel that is distinguishable by its contrasting marble light and dark design.  There are two types of Damascus steel (cast Damascus steel and pattern-welded Damascus steel).  Although similar looking, they are forged through very specific and different processes. Historically, Damascus steel was always prized for its beauty, as well as ability to keep a sharp edge while remaining strong and flexible. Seen as the “Steel of Ancients”, arms made of Damascus steel are superior to those made of iron. Damascus craftsmanship gained a reputation of near magical properties and with only a precious few that knew how to achieve this, it would become a precious piece of history for any arms enthusiast.</p>
             
            </div>
            <div className='flex justify-center items-center w-full  overflow-hidden'>
                <img src={image} alt="Section 3" className="w-5/6 lg:w-4/6 h-auto shadow-lg" />
            </div>
        </div>
    )
}

export default Section5
