import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
function Footer() {
    return (
        <section className="relative overflow-hidden py-12 bg-gray-600 text-gray-300 border-t-2 border-gray-700">
    <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap -m-6">
            {/* Logo and Copyright Section */}
            <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                <div className="flex h-full flex-col justify-between">
                    <div className="mb-6">
                        <Logo width="120px" /> {/* Adjust logo size for more prominence */}
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">
                            &copy; 2023 Steath094. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>

            {/* Company Section */}
            <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                <div className="h-full">
                    <h3 className="tracking-wide mb-6 text-sm font-semibold uppercase text-gray-400">
                        Company
                    </h3>
                    <ul>
                        <li className="mb-4">
                            <Link
                                className=" text-base font-medium hover:text-white transition-colors duration-300"
                                to="/"
                            >
                                Features
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link
                                className=" text-base font-medium hover:text-white transition-colors duration-300"
                                to="/"
                            >
                                Pricing
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link
                                className=" text-base font-medium hover:text-white transition-colors duration-300"
                                to="/"
                            >
                                Affiliate Program
                            </Link>
                        </li>
                        <li>
                            <Link
                                className=" text-base font-medium hover:text-white transition-colors duration-300"
                                to="/"
                            >
                                Press Kit
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Support Section */}
            <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                <div className="h-full">
                    <h3 className="tracking-wide mb-6 text-sm font-semibold uppercase text-gray-400">
                        Support
                    </h3>
                    <ul>
                        <li className="mb-4">
                            <Link
                                className=" text-base font-medium hover:text-white transition-colors duration-300"
                                to="/"
                            >
                                Account
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link
                                className=" text-base font-medium hover:text-white transition-colors duration-300"
                                to="/"
                            >
                                Help
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link
                                className=" text-base font-medium hover:text-white transition-colors duration-300"
                                to="/"
                            >
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                className=" text-base font-medium hover:text-white transition-colors duration-300"
                                to="/"
                            >
                                Customer Support
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Legals Section */}
            <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                <div className="h-full">
                    <h3 className="tracking-wide mb-6 text-sm font-semibold uppercase text-gray-400">
                        Legals
                    </h3>
                    <ul>
                        <li className="mb-4">
                            <Link
                                className=" text-base font-medium hover:text-white transition-colors duration-300"
                                to="/"
                            >
                                Terms &amp; Conditions
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link
                                className=" text-base font-medium hover:text-white transition-colors duration-300"
                                to="/"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                className=" text-base font-medium hover:text-white transition-colors duration-300"
                                to="/"
                            >
                                Licensing
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

    )
}

export default Footer
