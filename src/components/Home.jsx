import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/FJRyHJC/4881247.jpg)' }}>
                <div className="hero-overlay bg-opacity-40"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello There....</h1>
                        <Link to="/login" className="btn bg-green-400">Let’s Explore</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;