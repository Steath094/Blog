import React, {useState} from 'react'
import {Container,LogoutBtn, Logo} from "../index"
import {Link, useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import { AuthService } from '../../appwrite/auth'

function Header() {
    const authStatus = useSelector((state)=> state.auth.status)
    const navigate = useNavigate()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const userData = useSelector((state) => state.auth.userData);
    
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const openProfileModal = () => {
        setDropdownOpen(false); // Close dropdown when profile is clicked
        setModalOpen(true); // Open profile modal
    };

    const closeModal = () => {
        setModalOpen(false); // Close modal
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: authStatus
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
    return (
        <header className='py-3 shadow bg-[#ffffff]'>
            <div className='container mx-auto px-4'>
                <nav className='flex items-center justify-between'>
                    {/* Logo */}
                    <div className='mx-8'>
                        <Link to='/'>
                            <Logo />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className='hidden md:flex ml-auto space-x-4'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-black text-inter hover:text-black'
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                           <li className="relative inline-block">
                           {authStatus && (
                               <div
                                   className="w-8 h-8 rounded-full bg-cover cursor-pointer"
                                   style={{ backgroundImage: `url(../images/userlogo.png)` }}
                                   onClick={toggleDropdown}
                               ></div>
                           )}
               
                           {/* Dropdown Menu */}
                           {dropdownOpen && (
                               <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-20">
                                   <li
                                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                       onClick={openProfileModal}
                                   >
                                       User Profile
                                   </li>
                                   <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                       <LogoutBtn />
                                   </li>
                               </ul>
                           )}
               
                           {/* Profile Modal */}
                           {modalOpen && (
                               <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
                                   <div className="bg-white p-6 rounded-lg w-96">
                                       <div className="flex justify-between items-center">
                                           <h2 className="text-xl font-semibold">User Profile</h2>
                                           <button onClick={closeModal} className="text-gray-500">
                                               ✖
                                           </button>
                                       </div>
                                       <div className="mt-4 flex items-center space-x-4">
                                           <div
                                               className="w-16 h-16 rounded-full bg-cover"
                                               style={{ backgroundImage: `url(../images/userlogo.png)` }}
                                           ></div>
                                           <div>
                                               <p className="font-medium">{userData.name}</p>
                                               <p className="text-sm text-gray-600">{userData.email}</p>
                                           </div>
                                       </div>
                                       <div className="mt-6 text-right">
                                           <button
                                               onClick={closeModal}
                                               className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                                           >
                                               Close
                                           </button>
                                       </div>
                                   </div>
                               </div>
                           )}
                       </li>
                        )}
                    </ul>

                    {/* Mobile Hamburger Menu Icon */}
                    <div className='md:hidden'>
                        <button
                            onClick={toggleMobileMenu}
                            className='focus:outline-none'
                        >
                            <svg
                                className='w-6 h-6 text-black'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M4 6h16M4 12h16m-7 6h7'
                                />
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className='md:hidden mt-4'>
                        <ul className='flex flex-col space-y-4'>
                            {navItems.map((item) =>
                                item.active ? (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => {
                                                navigate(item.slug);
                                                toggleMobileMenu();
                                            }}
                                            className='block w-full text-left px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-black'
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ) : null
                            )}
                            {authStatus && (
                                <>
                                {authStatus && (
                                    <li
                                    className="block w-full text-left px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-black"
                                    onClick={openProfileModal}>
                                    User Profile
                                    </li>
                                )}
                                {authStatus && (
                                    <li className="block w-full text-left px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-black">
                                    <LogoutBtn />
                                </li>
                                )}
                                {modalOpen && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
                                        <div className="bg-white p-6 rounded-lg w-96">
                                            <div className="flex justify-between items-center">
                                                <h2 className="text-xl font-semibold">User Profile</h2>
                                                <button onClick={closeModal} className="text-gray-500">
                                                    ✖
                                                </button>
                                            </div>
                                            <div className="mt-4 flex items-center space-x-4">
                                                <div
                                                    className="w-16 h-16 rounded-full bg-cover"
                                                    style={{ backgroundImage: `url(../images/userlogo.png)` }}
                                                ></div>
                                                <div>
                                                    <p className="font-medium">{userData.name}</p>
                                                    <p className="text-sm text-gray-600">{userData.email}</p>
                                                </div>
                                            </div>
                                            <div className="mt-6 text-right">
                                                <button
                                                    onClick={closeModal}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                </>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header
