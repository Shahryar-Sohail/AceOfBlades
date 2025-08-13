import { useEffect, useState } from "react";
import image from "../assets/hero-cart.jpg"
import { useFirebase } from "../firebase"

const Checkout = () => {
    const { getCheckoutDetails } = useFirebase();
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [shippingCost, setShippingCost] = useState<number>(0);

    useEffect(() => {
        const fetchCheckoutDetails = async () => {
            const data = await getCheckoutDetails();
            if (data) {
                setCartItems(data.items || []);
                setTotal(data.total || 0);
                setShippingCost(data.shippingCost || 0);
            }
        };

        fetchCheckoutDetails();
    }, [getCheckoutDetails]);

    return (
        <div>
            <div style={{ background: `url(${image})`, height: '200px' }} className='bg-fixed flex justify-center items-center '>
                <h1 className='text-white text-4xl font-bold '>Checkout</h1>
            </div>

            <div className="flex flex-col md:flex-row justify-between">

                <div className="m-10">
                    <div>
                        <h2 className='text-2xl font-bold'>Customer Information</h2>
                        <input className="border p-2 text-xl w-4/6 my-5" type="text" placeholder="Name or Email here*" />
                    </div>

                    <div>
                        <h2 className='text-2xl font-bold'>Billing Details</h2>
                        <input className="border p-2 text-xl w-1/2 my-5" type="text" placeholder="First Name*" />
                        <input className="border p-2 text-xl w-1/2 my-5" type="text" placeholder="Last Name*" />
                        <input className="border p-2 text-xl w-full my-5" type="text" placeholder="Company Name*" />
                    </div>

                    <div>
                        <h2 className='text-2xl font-bold'>South Africa</h2>
                        <input className="border p-2 text-xl w-1/2 my-5" type="text" placeholder="House No" />
                        <input className="border p-2 text-xl w-1/2 my-5" type="text" placeholder="Apartment, Suite, etc" />
                        <input className="border p-2 text-xl w-1/3 my-5" type="text" placeholder="Town/City" />
                        <select className="border p-2 text-xl w-1/3 my-5">
                            <option value="Gauteng">Gauteng</option>
                            <option value="Western Cape">Western Cape</option>
                            <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                        </select>
                        <input className="border p-2 text-xl w-1/3 my-5" type="text" placeholder="Postal/Zip Code" />
                        <input className="border p-2 text-xl w-full my-5" type="text" placeholder="Phone*" />
                        <div className="flex items-center">
                            <input className="border p-2 my-5 mx-1" type="checkbox" />
                            <span className="text-xl font-bold">
                                Ship to a Different Address
                            </span>
                        </div>
                            <input className="border p-2 text-xl w-full my-5" type="text" placeholder="Phone*" />
                            <p className="underline">Have a Coupon?</p>

                    </div>
                </div>


                <div className="card border w-5/4 md:w-4/6 shadow-2xl m-5">
                    <div className="w-full overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th></th>
                                    <th></th>
                                    <th>Sub Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {cartItems.map(product => {
                                    return (
                                        <tr key={product.id}>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img src={product.imageUrl} alt={product.title} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="font-bold">{product.title}</div>
                                            </td>
                                            <td>
                                                {product.description}
                                            </td>
                                            <td>
                                                {product.totalPrice || product.finalPrice}
                                            </td>

                                        </tr>
                                    )
                                })}
                                <tr>
                                    <td className='font-bold text-xl'>SubTotal</td>
                                    <td></td>
                                    <td></td>
                                    <td>{total - shippingCost}</td>
                                </tr>
                                <tr>
                                    <td className='font-bold text-xl'>
                                        Shipping: <span className="text-lg font-thin"> {shippingCost === 0
                                            ? "Free Shipping"
                                            : `Express Shipping`} </span></td>
                                    <td></td>
                                    <td></td>
                                    <td>{shippingCost}</td>
                                </tr>
                                <tr>
                                    <td className='font-bold text-3xl'>Total </td>
                                    <td></td>
                                    <td></td>
                                    <td className=" text-2xl">{total}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Checkout
