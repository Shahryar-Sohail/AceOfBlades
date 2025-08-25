import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "../store/slices/productSlice";
import { fetchLatestOrder } from "../store/slices/orderSlice";
import type { RootState, AppDispatch } from "../store/store";
import img from "../assets/customer.png";
import { motion } from "motion/react"

const AdminPanel = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [finalPrice, setFinalPrice] = useState("")
    const [availableStock, setAvailableStock] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null);



    const { items: products = [] } = useSelector(
        (state: RootState) => state.products
    );

    const { customer, cartItems, total, shippingCost } = useSelector(
        (state: RootState) => state.orders
    ) || {};


    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchLatestOrder());
    }, [dispatch]);

    const handleSubmit = () => {
        const productData = {
            title,
            description,
            category,
            price: Number(price),
            finalPrice: Number(finalPrice),
            availableStock: Number(availableStock),
            imageUrl
        };

        if (editingId) {
            dispatch(updateProduct({ id: editingId, updatedData: productData }));
            setEditingId(null);
        } else {
            dispatch(addProduct(productData));
        }

        // Clear form
        setTitle(""); setDescription(""); setPrice(""); setFinalPrice("");
        setAvailableStock(""); setImageUrl(""); setShowAddProduct(false);
    };

    return (
        <div>
            <div className="max-w-[1200px] mx-auto">
                <h1 className="text-center text-4xl">Admin Panel</h1>
                <h1 className="text-center text-4xl">Product Details</h1>
                <div className="flex justify-center p-4">
                    <button
                        className="btn btn-error"
                        onClick={() => setShowAddProduct(prev => !prev)} // toggle
                    >
                        {showAddProduct ? "Close Form" : "Add Product"}
                    </button>
                </div>

                {/* Add New Product  */}
                <div className="flex flex-col justify-center items-center px-8">
                    {/* <h1 className="text-center text-3xl underline ">Add New Product</h1> */}
                    {showAddProduct &&
                        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 w-full max-w-3xl">
                            <input onChange={e => setTitle(e.target.value)} value={title} type="text" placeholder="Title" className="input" />
                            <input onChange={e => setDescription(e.target.value)} value={description} type="text" placeholder="Description" className="input" />
                            <input onChange={e => setCategory(e.target.value)} value={category} type="text" placeholder="Category" className="input" />
                            <input onChange={e => setPrice(e.target.value)} value={price} type="number" placeholder="Price" className="input" />
                            <input onChange={e => setFinalPrice(e.target.value)} value={finalPrice} type="number" placeholder="Final Price" className="input" />
                            <input onChange={e => setAvailableStock(e.target.value)} value={availableStock} type="number" placeholder="Available Stock" className="input" />
                            <input onChange={e => setImageUrl(e.target.value)} value={imageUrl} type="text" placeholder="Image URL" className="input" />
                            <motion.button
                                whileTap={{ scale: 0.1 }}
                                whileHover={{ scale: 1.15 }}
                                onClick={(e) => {
                                    const btn = e.currentTarget;
                                    btn.innerHTML = "✔ Added!";
                                    setTimeout(() => (btn.innerHTML = "Submit"), 1500);
                                    handleSubmit()
                                }}
                                className="btn btn-success text-white"
                                
                            >
                                        { editingId? "Update": "Submit" }
                            </motion.button>

                        </form>}
            </div>

            {/* all products  */}
            <div className="w-5/6 mx-auto">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Stock</th>
                                <th>Price</th>
                                <th>Final Price</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {products.map(product =>
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
                                        {product.category}
                                    </td>
                                    <td>
                                        {product.availableStock}
                                    </td>
                                    <td>
                                        {product.price}
                                    </td>
                                    <td>
                                        {product.finalPrice}
                                    </td>
                                    <th>
                                        <button onClick={() => {
                                            setTitle(product.title);
                                            setDescription(product.description);
                                            setPrice(product.price);
                                            setFinalPrice(product.finalPrice);
                                            setAvailableStock(product.availableStock);
                                            setImageUrl(product.imageUrl);
                                            setEditingId(product.id);
                                            setShowAddProduct(true);
                                        }} className="btn btn-ghost btn-xs">Edit</button>
                                        <button onClick={() => dispatch(deleteProduct(product.id))} className="btn btn-ghost btn-xs">Delete</button>
                                    </th>
                                </tr>
                            )}


                        </tbody>
                        {/* foot */}
                        <tfoot>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Stock</th>
                                <th>Price</th>
                                <th>Final Price</th>
                                <th>Options</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Customer Details */}
            <div className="card w-5/6 mx-auto  my-10 rounded-none">
                <div className="text-3xl text-center">Customer Details</div>
                <div className="w-full overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Company</th>
                                <th>Address</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>


                            <tr>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={img} />
                                            </div>
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">{customer?.firstName + " " + customer?.lastName}</div>
                                </td>
                                <td>
                                    {customer?.email}
                                </td>
                                <td>
                                    {customer?.companyName}
                                </td>
                                <td>
                                    {customer?.houseNo + " " + customer?.apartment + ", " + customer?.townCity + ", " + customer?.province + " " + customer?.postalCode}
                                </td>
                                <td>
                                    {customer?.phone}
                                </td>


                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* check out by user  */}
            <div className="card border border-black w-5/6 mx-auto  my-10 rounded-none">
                <div className="text-3xl text-center">Checkout Details For Admin</div>
                <div className="w-full overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Stock</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Final Price</th>
                                <th>Sub Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {cartItems.map(product => {
                                return (
                                    <tr key={product.id} className="text-center">
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
                                            {product.availableStock}
                                        </td>
                                        <td>
                                            {product.quantity}
                                        </td>
                                        <td>
                                            {product.price}
                                        </td>
                                        <td>
                                            {product.finalPrice}
                                        </td>
                                        <td>
                                            {product.quantity * product.finalPrice}
                                        </td>

                                    </tr>
                                )
                            })}


                            <tr >
                                <td className='font-bold text-xl'>SubTotal</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="text-center" >{total - shippingCost}</td>
                            </tr>
                            <tr>
                                <td className='font-bold text-xl'>
                                    Shipping: <span className="text-lg font-thin"> {shippingCost === 0
                                        ? "Free Shipping"
                                        : `Express Shipping`} </span></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="text-center">{shippingCost}</td>
                            </tr>
                            <tr>
                                <td className='font-bold text-3xl'>Total </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className=" text-2xl text-center">{total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
        </div >
    )
}

export default AdminPanel
