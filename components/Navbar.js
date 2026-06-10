'use client'
import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

import Link from "next/link";

const Navbar = () => {
    const { data: session } = useSession()
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <nav className='bg-gray-900  text-white flex justify-between px-4 h-16 items-center'>
            <div className="logo font-bold  text-lg flex items-center justify-center">
                <Link href="/" className='flex items-center justify-center'>
                    <img src="/tea.gif" alt="" width={28} className='inline-block mr-2' />
                    <span>GetMeaChai</span>
                </Link>
            </div>

            <ul className='flex justify-between gap-4'>
                <div className='relative'>
                    {session && <>
                        <button onBlur={() => {
                            setTimeout(() => {
                                setShowDropdown(false)
                            }, 100);
                        }} onClick={() => setShowDropdown(!showDropdown)} id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="inline-flex items-center justify-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button">
                            Welcome {session.user.email}
                            <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                            </svg>
                        </button>

                        <div id="dropdownHover" className={`z-10 ${showDropdown ? "" : "hidden"} absolute bg-neutral-primary-medium border left-[85px] border-default-medium rounded-base shadow-lg w-44`}>
                            <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownHoverButton">
                                <li>
                                    <Link href="/dashboard" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading hover:bg-gray-500 rounded">Dashboard</Link>
                                </li>
                                <li>
                                    <Link href="/settings" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading hover:bg-gray-500 rounded">Settings</Link>
                                </li>
                                <li>
                                    console.log(session);
                                    
                                    <Link href={`/${session.user.name}`} className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading hover:bg-gray-500 rounded">Your Page</Link>
                                </li>
                                <li>
                                    <Link href="/logout" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading hover:bg-red-300 rounded">Sign out</Link>
                                </li>
                            </ul>
                        </div>
                    </>}



                    {session &&
                        <button onClick={() => { signOut({ callbackUrl: "/login" }) }} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-full" >Logout</button>
                    }
                    {!session &&
                        <Link href="/login">
                            <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-full" >Login</button>
                        </Link>
                    }
                </div>
            </ul>
        </nav>
    )
}

export default Navbar