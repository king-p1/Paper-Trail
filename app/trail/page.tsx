"use client"
import { HomeNav } from '@/components/navigations/home-nav'
import { SearchInput } from '@/components/search-input'
import { TemplateGallery } from '@/components/template-gallery'
import { TrailTable } from '@/components/table-components/trails-table'
import { api } from '@/convex/_generated/api'
import { SignedIn, UserButton,OrganizationSwitcher } from '@clerk/clerk-react'
import {  usePaginatedQuery } from 'convex/react'
import React from 'react'
import { TbLoader3 } from 'react-icons/tb'
import { useSearchParams } from '@/hooks/use-seearch-param'


const TrailPage = () => {

const [search] = useSearchParams()

  const {loadMore,isLoading,results,status} = usePaginatedQuery(api.document.getPaperTrails,{search},{initialNumItems:4})



  return (
    <div className='w-full flex flex-col p-2 gap-4'>

      <div className="flex items-center justify-between gap-3">
      <HomeNav/>
      <SearchInput/>
    <SignedIn>
    <OrganizationSwitcher
    afterCreateOrganizationUrl='/trail'
    afterLeaveOrganizationUrl='/trail'
    afterSelectOrganizationUrl='/trail'
    afterSelectPersonalUrl='/trail'
    />
      <UserButton />
    </SignedIn>
      </div>

  <TemplateGallery/>

  {isLoading ? (
    <div className='w-full flex items-center justify-center'>
          <TbLoader3 size={56} className='animate-spin'/>
    </div>
  ) :(
    <TrailTable
    trails={results}
    loadMore={loadMore}
    status={status}
/>
  )}


    </div>
  )
}

export default TrailPage