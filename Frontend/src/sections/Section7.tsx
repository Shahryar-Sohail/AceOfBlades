import star from '../assets/star.png';
import lock from '../assets/lock.png';
import bus from '../assets/bus.png';
const Section7 = () => {
    return (
        <div className="bg-black text-white p-0 md:p-10">
            <h1 className="text-center text-4xl font-semibold">HOW DOES IT WORKS?</h1>
            <p className="text-center">o u r &nbsp;o n l i n e &nbsp;e x p e r i e n c e &nbsp;m a d e &nbsp;e a s y</p>
            <div className='grid md:flex content-center justify-center items-center'>
                <div className="card bg-transparent w-96 shadow-sm mr-10 ">
                    <figure className="px-10 pt-10">
                        <img
                            src={star}
                            alt="Shoes"
                            className="w-1/4 rounded-full border-4 p-2 bg-white" />
                    </figure>
                    <div className="card-body items-center text-center ">
                        <h2 className="card-title text-3xl font-bold">OUR SELECT RANGE</h2>
                        <p className='text-md font-semibold'>o u r &nbsp;&nbsp;e x c l u s i v e &nbsp;&nbsp;r a n g e</p>
                        <p className='text-md'>Take your pick of our top quality, ever-growing range of handcrafted Damascus knives.</p>

                    </div>
                </div>
                <div className='bg-red-500 border-r-2 h-0 md:h-96 '></div>

                <div className="card bg-transparent w-96 shadow-sm mr-10">
                    <figure className="px-10 pt-10">
                        <img
                            src={lock}
                            alt="Shoes"
                            className="w-1/4 rounded-full border-4 p-2 bg-white" />
                    </figure>
                    <div className="card-body items-center text-center ">
                        <h2 className="card-title text-3xl font-bold">SECURE CHECKOUT</h2>
                        <p className='text-md font-semibold'>s i m p l e &nbsp;&nbsp; & &nbsp;&nbsp; e a s y </p>
                        <p className='text-md'>Take your pick of our top quality, ever-growing range of handcrafted Damascus knives.</p>

                    </div>
                </div>

                <div className='bg-red-500 border-r-2 h-0 md:h-96 '></div>
                <div className="card bg-transparent w-96 shadow-sm mr-10">
                    <figure className="px-10 pt-10">
                        <img
                            src={bus}
                            alt="Shoes"
                            className="w-1/4 rounded-full border-4 p-2 bg-white" />
                    </figure>
                    <div className="card-body items-center text-center ">
                        <h2 className="card-title text-3xl font-bold">SIMPLE DELIVERY</h2>
                        <p className='text-md font-semibold'>n o &nbsp;&nbsp; h a s s l e</p>
                        <p className='text-md'>Take your pick of our top quality, ever-growing range of handcrafted Damascus knives.</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section7
