import image from '../assets/hero-bg.jpg'
import { useFirebase } from "../firebase";
import { useEffect, useState } from "react";
import { motion } from "motion/react"
import { Link } from "react-router-dom";

interface SaleProps {
  showHeader?: boolean; // default false if not passed
}


const Sale = ({ showHeader = true }: SaleProps) => {
  const firebase = useFirebase();
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await firebase.getAllProduct();
      setProducts(products);
    };
    fetchProducts();
  }, [firebase]);

  return (
    <div>
      {showHeader && (
        <div
          style={{ background: `url(${image})`, height: '200px' }}
          className='bg-fixed flex justify-center items-center '
        >
          <h1 className='text-white text-4xl font-bold'>ITEMS ON SALE</h1>
        </div>
      )}
      {/* Cards Here below */}
      <div className='p-10 flex flex-wrap gap-4 justify-center '>
        {products.map((product) => (
          <div>
            <Link to={`/pages/${product.id}`} key={product.id} className="card bg-base-100 w-80 shadow-sm">

              <figure>
                <img
                  src={product.imageUrl}
                  alt={product.title} className='w-80' />
              </figure>
            </Link>

            <div className="card-body">
              <h2 className="card-title">{product.title}</h2>
              <p>{product.description}</p>
              <p className='text-sm font-semibold'>RS {product.finalPrice} <span className='line-through'>RS {product.price}</span></p>
              <div className="card-actions justify-center">
                <motion.button
                  whileTap={{ scale: 0.1 }}
                  whileHover={{ scale: 1.15 }}
                  onClick={() => firebase.addToCart(product)}
                  className="btn btn-neutral text-white rounded-3xl"
                >
                  Add To Cart
                </motion.button>
              </div>
            </div>
          </div>
        ))}


      </div>
    </div>
  )
}

export default Sale
