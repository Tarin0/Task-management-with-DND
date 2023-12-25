import { Link, NavLink } from "react-router-dom";
import { useContext} from "react";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);


    const handleLogout = () => {
        logOut().then((result) => console.log(result));
    };
    
    return (
        <div>
            <div className="navbar flex flex-col lg:flex-row bg-gray-200 ">
                <div className="flex-1">
                    <h4 className="text-3xl font-medium">Task Management</h4>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 text-xl text-orange-900">
                        <li>
                            <NavLink to="/">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">
                               About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">
                                Contact Us
                            </NavLink>
                        </li>
                        {
                            user?.email ?
                            <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full -pb-10">
                                    <img src={user.photoURL} alt={user.displayName} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <button className="btn btn-sm  btn-ghost">{user.displayName}</button>

                                </li>
                                
                                <li>
                                    <Link to="/dashboard" className="btn btn-sm  btn-ghost">Dashboard</Link>

                                </li>
                                
                                <li>
                                    <button className="btn btn-sm  btn-ghost"
                                        onClick={handleLogout}
                                    >Logout</button>

                                </li>
                            </ul>
                        </div>
                                :
                                <li>
                                    <NavLink to="/login">
                                        Login
                                    </NavLink>
                                </li>

                        }
                      
                    </ul>

                </div>
            </div>
            <div className="">
                <img src="/public/3d-render-checklist-alarm-clock-project-plan.jpg" alt="" />
            </div>
        </div>
    );
};

export default Navbar;