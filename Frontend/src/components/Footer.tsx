

const Footer = () => {
    return (
        <div>
            <footer className="footer footer-horizontal footer-center bg-black text-white rounded p-10 ">
                <nav className="grid grid-flow-col gap-4">
                    <a className="link link-hover">Home</a>
                    <a className="link link-hover">Privacy Policy</a>
                    <a className="link link-hover">Shipping and Returns</a>
                    <a className="link link-hover">Terms and Conditions</a>
                </nav>
             
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
                </aside>
                <div className="border-t-2 border-white w-full pt-5">
<h1 className="italic">Developed By <span className="underline font-semibold cursor-pointer"> Shahryar Sohail</span></h1>
                </div>
            </footer>
        </div>
    )
}

export default Footer
