import { motion } from "motion/react"
import { useFirebase } from "../firebase";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const ProductDetail = () => {
    const firebase = useFirebase();
    const { id } = useParams();
    const [product, setProduct] = useState<{
        title: string;
        description: string;
        price: number;
        finalPrice: number;
        availableStock: number;
        imageUrl: string;
    } | null>(null);

    useEffect(() => {
        if (id) {
            firebase.fetchProduct(id).then((data: {
                title: string;
                description: string;
                price: number;
                finalPrice: number;
                availableStock: number;
                imageUrl: string;
            }) => {
                if (data) setProduct(data);
            });
        }
    }, [id]);


    return (

        <div>
            {!product ? (<div className="flex mx-auto my-20 w-3/6 flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>) : (
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex mx-auto w-4/6 md:w-1/3">
                        <img src={product?.imageUrl} />
                    </div>

                    <div className="border w-full md:w-1/2 p-5">
                        <h2 className="text-5xl font-semibold my-5">{product?.title}</h2>
                        <p className="text-xl font-semibold my-5">Price: ${product?.price}</p>
                        <p className="text-lg font-semibold">{product?.description}</p>
                        <p className="text-lg font-semibold my-5"> Availability: {product?.availableStock && product.availableStock > 0
                            ? product.availableStock
                            : "Out of Stock"}</p>

                        <div>
                            <motion.button
                                whileTap={{ scale: 0.1 }}
                                whileHover={{ scale: 1.15 }}
                                onClick={() => firebase.addToCart(product)}
                                className="btn btn-neutral text-white rounded-3xl my-10"
                            >
                                Add To Cart
                            </motion.button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}

export default ProductDetail
