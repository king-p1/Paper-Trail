"use client";
import Image from "next/image";
import logo from "@/public/paper-trail-logo.png";
import Link from "next/link";
import { DocumentInput } from "./document-input";
import { MenuBar } from "./menu-bar";
import { SignedIn, UserButton, OrganizationSwitcher } from "@clerk/clerk-react";
import { Avatars } from "@/app/trail/[documentId]/tools/avatar";
import { UserInbox } from "@/app/trail/[documentId]/tools/inbox";
import { NavProps } from "@/types";

export const Navbar = ({trailData}:NavProps) => {
  return (
    <nav className="flex items-center justify-between  ">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image src={logo} alt="logo" width="90" height="90" />
        </Link>

        <div className="flex flex-col -ml-4">
          <DocumentInput   trailData={trailData} />
          <MenuBar trailData={trailData} />
        </div>
      </div>

      <div className="flex gap-2 items-center p-1.5">
        <UserInbox />
        <Avatars />
        <SignedIn>
          <OrganizationSwitcher
            afterCreateOrganizationUrl="/"
            afterLeaveOrganizationUrl="/"
            afterSelectOrganizationUrl="/"
            afterSelectPersonalUrl="/"
          />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};
