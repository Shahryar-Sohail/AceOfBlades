import knife from '../assets/knife.png';

const Section4 = () => {
  return (
    <div className='bg-black block lg:flex justify-center items-center py-10'>
      <div className=' block lg:flex max-w-[1200px] mx-auto'>
        <img src={knife} alt="Knife" className='w-5/6 lg:w-1/3 mx-auto' />

        <div className="w-full lg:w-2/4 p-5 text-white text-right">
          <h1 className="text-3xl font-semibold  md:text-5xl">OUR CRAFTER</h1>
          <p className="text-lg font-semibold">B A R B A R O S</p>
          <p className="text-lg">We are Ace of Blades and just like you, we appreciate the finest craftsmanship for the most rugged terrain. We are here to share a passion for only the sharpest and more beautiful Damascus blades, no bells and hunting whistles, just beautiful and finely crafted blades.
          </p>
          <p className="text-lg mt-5">
            The crafting process of each knife is a humble journey indeed, an experience we hope to share with you. Handcrafted by only the best, we believe each blade tells a story, captures a memory and holds the potential to add to your unique story. Made from only the finest Damascus, Carbon and stainless steel, our knives are perfect for the wild terrain or for the collection in the glass case.</p>
        </div>
      </div>
    </div>
  )
}

export default Section4
