
import Sale from '../pages/Sale';

const Section6 = () => {
    return (
        <div className='max-w-[1200px] mx-auto'>
        <h1 className='text-3xl font-semibold  md:text-5xl ml-10 '>Items On sale</h1>
        <Sale showHeader={false} />
        </div>
    )
}

export default Section6
