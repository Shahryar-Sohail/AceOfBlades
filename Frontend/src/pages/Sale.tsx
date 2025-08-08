import image from '../assets/hero-bg.jpg'
const Sale = () => {
  return (
    <div>
      <div style={{ background: `url(${image})`, height: '200px'}} className='bg-fixed flex justify-center items-center'>
        <h1 className='text-white text-4xl font-bold'>ITEMS ON SALE</h1>
      </div>
    </div>
  )
}

export default Sale
