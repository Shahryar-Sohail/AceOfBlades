import { useEffect, useState } from "react";
import image from "../assets/hero-cart.jpg"
import { useFirebase } from "../firebase"

const Checkout = () => {
    const { getCheckoutDetails, checkOutForm } = useFirebase();
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [shippingCost, setShippingCost] = useState<number>(0);

    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [companyName, setCompanyName] = useState<string>("");
    const [houseNo, setHouseNo] = useState<string>("");
    const [apartment, setApartment] = useState<string>("");
    const [townCity, setTownCity] = useState<string>("");
    const [province, setProvince] = useState<string>("");
    const [postalCode, setPostalCode] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [terms, setTerms] = useState<boolean>(false);

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

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!terms) {
            alert("Please agree to the terms and conditions.");
            return;
        }

        // Prepare the order data
        const formData = {
            customer: {
                email,
                firstName,
                lastName,
                companyName,
                houseNo,
                apartment,
                townCity,
                province,
                postalCode,
                phone,
            },
            shipping: {
                type: shippingCost === 0 ? "Free Shipping" : "Express Shipping",
                cost: shippingCost
            },
            termsAccepted: terms,
            cartItems: cartItems.map(item => ({
                id: item.id,
                title: item.title,
                description: item.description,
                imageUrl: item.imageUrl,
                quantity: item.quantity || 1,
                price: item.price,
                finalPrice: item.finalPrice,
                availableStock: item.availableStock,
            })),
            total,
            createdAt: new Date(),
        };

        checkOutForm(formData);
    };

    return (
        <div>
            <div style={{ background: `url(${image})`, height: '200px' }} className='bg-fixed flex justify-center items-center '>
                <h1 className='text-white text-4xl font-bold '>Checkout</h1>
            </div>

            <div className="flex flex-col md:flex-row justify-between">
                {/* customer form  */}
                <form className="m-10">
                    <div>
                        <h2 className='text-2xl font-bold'>Customer Information</h2>
                        <input id="email" onChange={(e) => setEmail(e.target.value)} className="border p-2 text-xl w-4/6 my-5" type="text" placeholder="Name or Email here*" />
                    </div>

                    <div>
                        <h2 className='text-2xl font-bold'>Billing Details</h2>
                        <input id="firstName" onChange={(e) => setFirstName(e.target.value)} className="border p-2 text-xl w-1/2 my-5" type="text" placeholder="First Name*" />
                        <input id="lastName" onChange={(e) => setLastName(e.target.value)} className="border p-2 text-xl w-1/2 my-5" type="text" placeholder="Last Name*" />
                        <input id="companyName" onChange={(e) => setCompanyName(e.target.value)} className="border p-2 text-xl w-full my-5" type="text" placeholder="Company Name*" />
                    </div>

                    <div>
                        <h2 className='text-2xl font-bold'>South Africa</h2>
                        <input id="houseNo" onChange={(e) => setHouseNo(e.target.value)} className="border p-2 text-xl w-1/2 my-5" type="text" placeholder="House No" />
                        <input id="apartment" onChange={(e) => setApartment(e.target.value)} className="border p-2 text-xl w-1/2 my-5" type="text" placeholder="Apartment, Suite, etc" />
                        <input id="townCity" onChange={(e) => setTownCity(e.target.value)} className="border p-2 text-xl w-1/3 my-5" type="text" placeholder="Town/City" />
                        <select id="province" onChange={(e) => setProvince(e.target.value)} className="border p-2 text-xl w-1/3 my-5">
                            <option value="Gauteng">Gauteng</option>
                            <option value="Western Cape">Western Cape</option>
                            <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                        </select>
                        <input id="postalCode" onChange={(e) => setPostalCode(e.target.value)} className="border p-2 text-xl w-1/3 my-5" type="text" placeholder="Postal/Zip Code" />
                        <input id="phone" onChange={(e) => setPhone(e.target.value)} className="border p-2 text-xl w-full my-5" type="text" placeholder="Phone*" />
                        <div className="flex items-center">
                            <input className="border p-2 my-5 mx-1" type="checkbox" />
                            <span className="text-xl font-bold">
                                Ship to a Different Address
                            </span>
                        </div>
                        <input className="border p-2 text-xl w-full my-5" type="text" placeholder="Phone*" />
                        <p className="underline">Have a Coupon?</p>
                        <p className="mt-5 font-semibold">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>

                        <div className="flex items-center mt-5">
                            <input id="terms" onChange={(e) => setTerms(e.target.checked)} type="checkbox" className="mr-1 w-4 h-4" />
                            <p className="font-bold ">I have read and agree to the website terms and conditions</p>
                        </div>
                        <button onClick={handleSubmit} type="button" className="btn btn-neutral hover:bg-success hover:border-none w-5/6 mt-5">
                            Place Order <span className="font-bold"> RS {total} </span>
                        </button>
                    </div>
                </form>

                {/* billing details  */}
                <div className="card border w-5/4 md:w-4/6 h-5/6 shadow-2xl m-5">
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
