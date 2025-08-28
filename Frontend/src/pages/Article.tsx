import image1 from '../assets/Damascus500.jpg'
import image2 from '../assets/takecare.jpg'
import image3 from '../assets/sunrise500.jpg'

const Article = () => {
    return (
        <div>
            <div>
                <div className=" p-4 md:p-10  max-w-[1200px] mx-auto">
            
                    <div className='grid md:flex content-center justify-center items-center'>
                        <div className="card bg-transparent w-5/6 mx-auto sm:w-96 shadow-sm mr-10 ">
                            <figure>
                                <img
                                    src={image1}
                                    alt="Shoes"
                                    className="bg-white" />
                            </figure>
                            <div className="card-body p-0 mt-4">
                                <h2 className="card-title text-3xl text-start font-bold">A Very Brief History of Damascus Steel</h2>
                                <p className='text-md font-semibold text-start'>Traditional Damascus steel, also known as Pattern Weld, Damascene, or Damast, was first produced over two thousand years ago.</p>
                                <button className="btn btn-soft text-white bg-black hover:bg-gray-300 hover:text-black hover:border-none rounded-none w-40 dark:text-black hover:scale-110 transition-transform duration-300 cursor-pointer">
                                    Read More
                                </button>
                            </div>
                        </div>
                        <div className="card bg-transparent w-5/6 mx-auto sm:w-96 shadow-sm mr-10">
                            <figure>
                                <img
                                    src={image2}
                                    alt="Shoes"
                                    className="bg-white" />
                            </figure>
                            <div className="card-body p-0 mt-4">
                                <h2 className="card-title text-3xl text-start font-bold">How to care for a Damascus steel knife</h2>
                                <p className='text-md font-semibold text-start'>Damascus is well-known for its contrasting marble light and dark designs made of different metals with unique properties.</p>
                                <button className="btn btn-soft text-white bg-black hover:bg-gray-300 hover:text-black hover:border-none rounded-none w-40 dark:text-black hover:scale-110 transition-transform duration-300 cursor-pointer">
                                    Read More
                                </button>
                            </div>
                        </div>
                        <div className="card bg-transparent w-5/6 mx-auto sm:w-96 shadow-sm mr-10">
                            <figure>
                                <img
                                    src={image3}
                                    alt="Shoes"
                                    className="bg-white" />
                            </figure>
                            <div className="card-body p-0 mt-4">
                                <h2 className="card-title text-3xl text-start font-bold">Crafting Damascus Knives: Workshop</h2>
                                <p className='text-md font-semibold text-start'>Every morning, I wake up early and make my way to my workshop on the farm. The sounds of roosters crowing fill the air, and I take a deep breath</p>
                                <button className="btn btn-soft text-white bg-black hover:bg-gray-300 hover:text-black hover:border-none rounded-none w-40 dark:text-black hover:scale-110 transition-transform duration-300 cursor-pointer">
                                    Read More
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article
