import { useEffect, useState } from "react";
import { useFirebase } from "../firebase";

const AdminPanel = () => {

    const firebase = useFirebase();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [finalPrice, setFinalPrice] = useState("")
    const [availableStock, setAvailableStock] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [products, setProducts] = useState<any[]>([])
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null);

    // for checkout items 
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

    useEffect(() => {
        const fetchData = async () => {
            const allProducts = await firebase.getAllProduct();
            setProducts(allProducts);
            console.log(allProducts);

        };
        fetchData();
    }, []);

    return (
        <div>
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
            <div className="flex flex-col justify-center items-center px-8">
                {/* <h1 className="text-center text-3xl underline ">Add New Product</h1> */}
                {showAddProduct &&
                    <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 w-full max-w-3xl">
                        <input onChange={e => setTitle(e.target.value)} value={title} type="text" placeholder="Title" className="input" />
                        <input onChange={e => setDescription(e.target.value)} value={description} type="text" placeholder="Description" className="input" />
                        <input onChange={e => setPrice(e.target.value)} value={price} type="number" placeholder="Price" className="input" />
                        <input onChange={e => setFinalPrice(e.target.value)} value={finalPrice} type="number" placeholder="Final Price" className="input" />
                        <input onChange={e => setAvailableStock(e.target.value)} value={availableStock} type="number" placeholder="Available Stock" className="input" />
                        <input onChange={e => setImageUrl(e.target.value)} value={imageUrl} type="text" placeholder="Image URL" className="input" />
                        <button
                            type="button"
                            className="btn btn-success text-white"
                            onClick={() => {
                                if (editingId) {
                                    // Update product
                                    firebase.updateProduct(editingId, {
                                        title,
                                        description,
                                        price,
                                        finalPrice,
                                        availableStock,
                                        imageUrl,
                                    });
                                    setEditingId(null); // Exit editing mode
                                } else {
                                    // Add product
                                    firebase.addProduct(
                                        title,
                                        description,
                                        price,
                                        finalPrice,
                                        availableStock,
                                        imageUrl
                                    );
                                }

                                // Clear form after submit
                                setTitle("");
                                setDescription("");
                                setPrice("");
                                setFinalPrice("");
                                setAvailableStock("");
                                setImageUrl("");
                                setShowAddProduct(false);
                            }}
                        >
                            {editingId ? "Update" : "Submit"}
                        </button>

                    </form>}
            </div>


            <div className="w-5/6 mx-auto">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Description</th>
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
                                        <button onClick={() => firebase.deleteProduct(product.id)} className="btn btn-ghost btn-xs">Delete</button>
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
                                <th>Price</th>
                                <th>Final Price</th>
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
                                            {product.availableStock}
                                        </td>
                                        <td>
                                            {product.price}
                                        </td>
                                        <td>
                                            {product.finalPrice}
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
                                <td></td>
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
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{shippingCost}</td>
                            </tr>
                            <tr>
                                <td className='font-bold text-3xl'>Total </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className=" text-2xl">{total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default AdminPanel
