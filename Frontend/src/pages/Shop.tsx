import image from '../assets/hero-bg.jpg'

const Shop = () => {
    return (
        <div>
            <div
                style={{ background: `url(${image})`, height: '200px' }}
                className='bg-fixed flex flex-col justify-center items-center '
            >
                <h1 className='text-white text-4xl font-bold'>SHOP</h1>
                <h1 className='text-white text-1xl font-bold'>HOME <span>&gt;&gt;</span> Shop</h1>
            </div>
            <h1 className="text-center text-3xl font-bold mt-5">Gallery</h1>
            <h1 className="text-center">Photos All Over The World</h1>
            <div className="flex flex-col md:flex-row justify-center items-center flex-wrap gap-5 m-10 max-w-[1200px] mx-auto">
                
                <div className="card bg-base-100 image-full w-96 shadow-sm">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Card Title</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop
