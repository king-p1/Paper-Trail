"use client"
import Image from "next/image"
import logo from '@/public/paper-trail-logo.png'
import Link from "next/link"
import { DocumentInput } from "./document-input"
import { MenuBar } from "./menu-bar" 
import { SignedIn, UserButton,OrganizationSwitcher } from '@clerk/clerk-react'

export const Navbar = () => {
  return (
    <nav
    className="flex items-center justify-between  "
    >
        <div className="flex gap-2 items-center">
<Link
href='/'
>
        <Image
        src={logo}
        alt="logo"
        width='90'
        height='90'
        />
        </Link>

        <div className="flex flex-col -ml-3">
<DocumentInput/>
<MenuBar/>
        </div>
        </div>
       
       <div className="flex gap-2 items-center p-1.5">

        <SignedIn>
    <OrganizationSwitcher
    afterCreateOrganizationUrl='/'
    afterLeaveOrganizationUrl='/'
    afterSelectOrganizationUrl='/'
    afterSelectPersonalUrl='/'
    />
      <UserButton/>
    </SignedIn>
    </div>
        </nav>
  )
}
