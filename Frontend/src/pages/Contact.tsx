import image from "../assets/hero-cart.jpg"

const Contact = () => {



    return (
        <div>
            <div style={{ background: `url(${image})`, height: '300px' }} className='bg-fixed flex flex-col justify-center items-center '>
                <h1 className='text-white text-4xl font-bold my-1'>Contact Us</h1>
                <h1 className='text-white text-xl my-1'>Click on a icon below</h1>
                <nav className="text-white">
                    <div className="grid grid-flow-col gap-4">
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                className="fill-current bg-black rounded-full p-2">
                                <path
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                className="fill-current bg-black rounded-full p-2">
                                <path
                                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                className="fill-current bg-black rounded-full p-2">
                                <path
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                    </div>
                </nav>
            </div>

            <div className="max-w-[1200px] mx-auto ">
                <div className="relative flex flex-col md:flex-row mx-auto z-10 -top-14 w-5/6 md:w-1/2 bg-white shadow-2xl">
                    {/* customer form  */}
                    <form className="m-10 w-full">
                        <div>
                            <h2 className='text-2xl font-bold'>Full Name</h2>
                            <input id="email"  className="border p-2 text-xl w-4/6 my-5" type="text" placeholder="Name here*" />
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold'>Email Address</h2>
                            <input id="email" className="border p-2 text-xl w-4/6 my-5" type="text" placeholder="Email here*" />
                        </div>

                        <div>
                            <h2 className='text-2xl font-bold'>Phone Number</h2>
                            <input id="phone"  className="border p-2 text-xl w-4/6 my-5" type="text" placeholder="Phone*" />

                            <div className="flex flex-col md:flex-row  gap-5">
                                <div className="border-2 border-black w-5/6 md:w-1/2">
                                    <p className="font-semibold p-1">Enquiry Type</p>
                                    <div className="flex items-center">
                                        <input className="border p-2 my-5 mx-1" type="checkbox" />
                                        <span className="text-md">
                                            General Enquiry
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <input className="border p-2 my-5 mx-1" type="checkbox" />
                                        <span className="text-md">
                                            Product Enquiry
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <input className="border p-2 my-5 mx-1" type="checkbox" />
                                        <span className="text-md">
                                            Retail Enquiry
                                        </span>
                                    </div>
                                </div>
                                {/* Second Div  */}
                                <div className="w-5/6 md:w-1/2">
                                    <h1 className="text-2xl font-bold">Become a Retailer</h1>
                                    <p className="font-semibold">Looking for an opportunity to increase your income or expand your business and offer your customers a wider selection of products. Why wait? Enquire today and find out more about this unique opportunity.</p>
                                </div>
                            </div>
                            <textarea  rows={6}  placeholder="Your Message*" className="border p-2 text-xl w-5/6 my-5" />

                            <button type="button" className="btn btn-neutral hover:bg-success hover:border-none w-5/6 mt-5">
                                Submit
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Contact;
