import { Link, useNavigate } from "react-router-dom"
import image from "../assets/hero-cart.jpg"
import { useFirebase } from "../firebase"
import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
const Cart = () => {
    const firebase = useFirebase();
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const [shippingCost, setShippingCost] = useState(0);
    const [checkoutDocId, setCheckoutDocId] = useState<string | null>(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            const items = await firebase.getAllCartProduct();
            setCartItems(items);
        };
        fetchCartItems();
    }, [firebase]);

    const fetchCartData = async () => {
        const db = getFirestore(firebase.app);
        const snapshot = await getDocs(collection(db, "cart"));
        setCartItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const handleQuantityChange = (id: string, value: number, unitPrice: number) => {
        setQuantities(prev => ({ ...prev, [id]: value }));

        firebase.updateCartProduct(
            id,
            { quantity: value },
            unitPrice
        ).then(() => {
            fetchCartData();
        });
    };

    const getTotalPrice = () => {
        const productsTotal = cartItems.reduce((total, product) => {
            return total + (product.totalPrice || (product.finalPrice * (quantities[product.id] || 1)));
        }, 0);
        return productsTotal + shippingCost;
    };

    const navigate = useNavigate();

    const handleCheckout = async () => {
        const db = getFirestore(firebase.app);
        const total = getTotalPrice();

        try {
            if (checkoutDocId) {
                // update existing document
                const docRef = doc(db, "checkout", checkoutDocId);
                await updateDoc(docRef, {
                    totalPrice: total,
                    shippingCost: shippingCost,
                    cartItems: cartItems,
                    updatedAt: new Date(),
                });
            } else {
                // create new document and save its id
                const docRef = await addDoc(collection(db, "checkout"), {
                    totalPrice: total,
                    shippingCost: shippingCost,
                    cartItems: cartItems,
                    createdAt: new Date(),
                });
                setCheckoutDocId(docRef.id);
            }
            navigate('/checkout');
        } catch (error) {
            console.error("Error saving checkout data:", error);
        }
    };


    return (
        <div>
                <div style={{ background: `url(${image})`, height: '200px' }} className='bg-fixed flex justify-center items-center '>
                    <h1 className='text-white text-4xl font-bold '>YOUR CART</h1>
                </div>
            <div className="max-w-[1200px] mx-auto">

                <div className=" p-10">
                    <h1 className="text-3xl">Your Cart Items</h1>
                    <button className="btn btn-neutral"><Link to="/">Return To SHOP</Link></button>
                </div>
                {/* cart items  */}
                <div className="flex justify-around  ">
                    <div className="w-4/6 overflow-x-auto ">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Total Price</th>
                                    <th>Options</th>
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
                                                <input type="number" min={1}
                                                    step={1} value={quantities[product.id] ?? product.quantity ?? 1} onChange={(e) => handleQuantityChange(product.id, Number(e.target.value), product.finalPrice)} className="bg-black text-white input input-bordered w-16 text-center" />
                                            </td>
                                            <td>
                                                {product.finalPrice}
                                            </td>
                                            <td>
                                                {product.totalPrice || product.finalPrice}
                                            </td>
                                            <th>
                                                <button onClick={() => firebase.deleteCartItem(product.id, fetchCartData)} className="btn btn-error btn-sm text-white">Delete</button>
                                            </th>
                                        </tr>
                                    )
                                })}


                            </tbody>
                            {/* foot */}
                            <tfoot>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Total Price</th>
                                    <th>Options</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="card bg-neutral text-white w-96 shadow-sm m-5 h-96">
                        <div className="card-body p-5">
                            <h2 className="card-title text-4xl">Cart Total</h2>
                            <p className="text-xl py-5">Subtotal: {getTotalPrice()}</p>
                            <div className="text-md">
                                <p>
                                    Shipping Method <br />
                                    <input
                                        type="radio"
                                        name="shipping"
                                        value={0}
                                        onChange={() => setShippingCost(0)}
                                        defaultChecked
                                    /> Free Shipping <br />
                                    <input
                                        type="radio"
                                        name="shipping"
                                        value={750}
                                        onChange={() => setShippingCost(750)}
                                    /> Express Shipping <span className="font-bold underline text-red-400">Rs 750</span> Flat<br />
                                </p>
                            </div>
                            <h1 className="text-3xl py-5">Total: {getTotalPrice()}</h1>
                            <div className="card-actions justify-center">
                                <button className="btn btn-accent-content" onClick={handleCheckout}>Proceed to Checkout</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Cart
