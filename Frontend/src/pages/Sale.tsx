import image from '../assets/hero-bg.jpg'
import { useEffect } from "react";
import { motion } from "motion/react"
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts } from "../store/slices/productSlice";
import { addToCart } from "../store/slices/cartSlice";

interface SaleProps {
  showHeader?: boolean;
}

const Sale = ({ showHeader = true }: SaleProps) => {
  const dispatch = useAppDispatch();
  const { items: products, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  if (loading) return <div className="text-center p-4">
    <div className='grid grid-cols-3 gap-6 place-items-center '>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ))}
    </div>
  </div>;
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
      <div className='p-10 flex flex-wrap gap-6 justify-center '>
        {products.map((product) => (
          <div key={product.id} className='hover:scale-110 transition-transform duration-300 cursor-pointer'>
            <Link to={`/pages/${product.id}`} className="card bg-base-100 w-80 shadow-sm ">

              <figure>
                <img
                  src={product.imageUrl}
                  alt={product.title} className='w-80' />
              </figure>
              <div className='border-2 border-black w-fit rounded-3xl p-2 absolute right-0 -top-2 hover:bg-black hover:text-white dark:text-black '>Sale</div>
            </Link>

            <div className="card-body">
              <h2 className="card-title">{product.title}</h2>
              <p>{product.description}</p>
              <p className='text-sm font-semibold'>RS {product.finalPrice} <span className='line-through'>RS {product.price}</span></p>
              <div className="card-actions justify-center">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={window.innerWidth > 768 ? { scale: 1.05 } : undefined}
                  onClick={(e) => {
                    const btn = e.currentTarget;
                    btn.innerHTML = "✔ Added!";
                    setTimeout(() => (btn.innerHTML = "Add To Cart"), 1500);
                    dispatch(addToCart({ ...product, quantity: 1 }))
                  }}
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
