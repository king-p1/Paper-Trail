import React from 'react'
import { ConvexClientProvider } from "@/components/convex-provider";

const TrailLayout = ({children}:{
    children : React.ReactNode
}) => {
  return (
    <ConvexClientProvider>{children}</ConvexClientProvider>
  )
}

export default TrailLayout