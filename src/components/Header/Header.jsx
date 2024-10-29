import React, {useState} from 'react'
import {Container,LogoutBtn, Logo} from "../index"
import {Link, useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"

function Header() {
    const authStatus = useSelector((state)=> state.auth.status)
    const navigate = useNavigate()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
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
        <header className='py-3 shadow bg-gray-500'>
            <div className='container mx-auto px-4'>
                <nav className='flex items-center justify-between'>
                    {/* Logo */}
                    <div className='mr-4'>
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
                                        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-white hover:text-black'
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
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
                                className='w-6 h-6 text-white'
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
                                            className='block w-full text-left px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-white'
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ) : null
                            )}
                            {authStatus && (
                                <li>
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header
