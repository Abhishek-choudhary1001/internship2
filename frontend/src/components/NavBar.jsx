import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const NavBar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount } = useContext(ShopContext);
    const navigate = useNavigate();
    // Check if user is logged in (token exists)
    const isLoggedIn = localStorage.getItem("token");

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        // You can also remove user data if stored
        // localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to='/'>
                <img src={assets.logo} className='w-36' alt="Trendify" />
            </Link>
            <ul className='hidden gap-5 text-sm text-gray-700 sm:flex'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-6'>
                <img 
                    onClick={() => setShowSearch(true)} 
                    src={assets.search_icon} 
                    className='w-5 cursor-pointer' 
                    alt="Search Products" 
                />
                <div className='relative group'>
                    {isLoggedIn ? (
                        <>
                            <img 
                                src={assets.profile_icon} 
                                className='w-5 cursor-pointer' 
                                alt="Your Profile" 
                            />
                            <div className='absolute right-0 hidden pt-4 group-hover:block dropdown-menu'>
                                <div className='flex flex-col gap-2 px-5 py-3 text-gray-500 rounded w-36 bg-slate-100'>
                                    <Link to="/profile" className='cursor-pointer hover:text-black'>Profile</Link>
                                    <Link to="/orders" className='cursor-pointer hover:text-black'>Orders</Link>
                                    <button 
                                        onClick={handleLogout}
                                        className='text-left cursor-pointer hover:text-black'
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <Link to='/login'>
                            <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="Login" />
                        </Link>
                    )}
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="Menu Icon" />
            </div>
            
            {/* INFO: Sidebar menu for smaller screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="Dropdown" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
                    {/* Add login/logout link for mobile */}
                    {isLoggedIn ? (
                        <>
                            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/profile'>PROFILE</NavLink>
                            <button onClick={() => { handleLogout(); setVisible(false); }} className='py-2 pl-6 border text-left'>LOGOUT</button>
                        </>
                    ) : (
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/login'>LOGIN</NavLink>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NavBar;
