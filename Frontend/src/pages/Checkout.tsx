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

            <div>


                <div className="card border w-1/2 shadow-2xl m-5">
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
