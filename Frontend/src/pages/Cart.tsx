import { Link, useNavigate } from "react-router-dom";
import image from "../assets/hero-cart.jpg";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCartFromDB, removeFromCartDB, updateCartQuantity } from "../store/slices/cartSlice";
import { doc, updateDoc, getFirestore, addDoc, collection } from "firebase/firestore";
import { app } from "../firebase";
import { motion } from "motion/react"

const Cart = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { items: cartItems } = useAppSelector((state) => state.cart);

    const [shippingCost, setShippingCost] = useState(0);
    const [checkoutDocId, setCheckoutDocId] = useState<string | null>(null);

    // Load cart items from Firebase
    useEffect(() => {
        dispatch(fetchCartFromDB());
    }, [dispatch]);

    const handleQuantityChange = (id: string, value: number) => {
        const product = cartItems.find((item) => item.id === id);
        if (product && product.docId) {
            dispatch(updateCartQuantity({ docId: product.docId, quantity: value }));
        }
    };

    const getTotalPrice = () => {
        const productsTotal = cartItems.reduce(
            (total, product) => total + (product.finalPrice * product.quantity),
            0
        );
        return productsTotal + shippingCost;
    };

    const handleCheckout = async () => {
        const db = getFirestore(app);
        const total = cartItems.reduce(
            (sum, product) => sum + product.finalPrice * product.quantity,
            0
        ) + shippingCost;

        const checkoutData = {
            totalPrice: total,
            shippingCost,
            cartItems: cartItems.map((item) => ({
                id: item.id,
                title: item.title,
                quantity: item.quantity,
                price: item.price,
                finalPrice: item.finalPrice,
                imageUrl: item.imageUrl,
                availableStock: item.availableStock,
                description: item.description,
            })), // only store useful fields
            updatedAt: new Date(),
        };

        try {
            if (checkoutDocId) {
                await updateDoc(doc(db, "checkout", checkoutDocId), checkoutData);
            } else {
                const newDoc = await addDoc(collection(db, "checkout"), {
                    ...checkoutData,
                    createdAt: new Date(),
                });
                setCheckoutDocId(newDoc.id);
            }

            navigate("/checkout");
        } catch (err) {
            console.error("Checkout failed:", err);
        }
    };

    return (
        <div>
            <div
                style={{ background: `url(${image})`, height: "200px" }}
                className="bg-fixed flex justify-center items-center"
            >
                <h1 className="text-white text-4xl font-bold">YOUR CART</h1>
            </div>

            <div className="max-w-[1200px] mx-auto">
                <div className="p-10">
                    <h1 className="text-3xl">Your Cart Items</h1>
                    <button className="btn btn-neutral">
                        <Link to="/">Return To SHOP</Link>
                    </button>
                </div>

                <div className="block md:flex md:justify-around">
                    {/* cart items */}
                    <div className="w-full md:w-4/6 overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Total Price</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.title}</td>
                                        <td>
                                            <input
                                                type="number"
                                                min={1}
                                                value={product.quantity}
                                                onChange={(e) =>
                                                    handleQuantityChange(product.id, Number(e.target.value))
                                                }
                                                className="bg-black text-white input input-bordered w-16 text-center"
                                            />
                                        </td>
                                        <td>{product.finalPrice}</td>
                                        <td>{product.finalPrice * product.quantity}</td>
                                        <td>
                                            <motion.button
                                                whileTap={{ scale: 0.1 }}
                                                whileHover={{ scale: 1.15 }}
                                                onClick={(e) => {
                                                    const btn = e.currentTarget;
                                                    btn.innerHTML = "❌Removed";
                                                    setTimeout(() => (btn.innerHTML = "Delete"), 1500);
                                                    dispatch(removeFromCartDB(product.docId!))
                                                }
                                                }
                                                className="btn btn-error btn-sm text-white w-20"
                                            >
                                                Delete
                                            </motion.button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* bill details */}
                    <div className="card bg-neutral text-white md:w-96 w-5/6 shadow-sm m-5 h-96">
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
                                    />{" "}
                                    Free Shipping <br />
                                    <input
                                        type="radio"
                                        name="shipping"
                                        value={750}
                                        onChange={() => setShippingCost(750)}
                                    />{" "}
                                    Express Shipping{" "}
                                    <span className="font-bold underline text-red-400">
                                        Rs 750
                                    </span>{" "}
                                    Flat
                                    <br />
                                </p>
                            </div>
                            <h1 className="text-3xl py-5">Total: {getTotalPrice()}</h1>
                            <div className="card-actions justify-center">
                                <button
                                    className="btn btn-accent-content"
                                    onClick={handleCheckout}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
