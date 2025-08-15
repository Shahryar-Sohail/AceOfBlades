import image1 from "../assets/g7.jpg"
import image2 from "../assets/g1.jpg"
import image3 from "../assets/g2.jpg"
import image4 from "../assets/g3.jpg"
import image5 from "../assets/g4.jpg"
import image6 from "../assets/g5.jpg"
import image7 from "../assets/g6.jpg"
import image8 from "../assets/g7.jpg"
import image9 from "../assets/g8.jpg"
import image10 from "../assets/g9.jpg"

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image7, image4];

const Gallery = () => {
    return (
        <>
            <h1 className="text-center text-3xl font-bold mt-5">Gallery</h1>
            <h1 className="text-center">Photos All Over The World</h1>
            <div className="flex flex-col md:flex-row justify-center items-center flex-wrap gap-5 m-10 max-w-[1200px] mx-auto">
                {images.map((img, idx) => (
                    <div key={idx} className="card bg-base-100 w-full md:w-1/5 shadow-sm p-10 md:p-0">
                        <figure>
                            <img className="w-full h-64 object-cover" src={img} alt={`Gallery image ${idx + 1}`} />
                        </figure>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Gallery
