"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { api } from "@/convex/_generated/api";
import { templates } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const TemplateGallery = () => {
  const [isCreating,setIsCreating] = useState<boolean>(false);


  const user = useQuery(api.document.UserByConvex);


  const isAdmin = user?.organization_id && user?.organization_role === "org:admin";
  const isPersonalTrail = user?.organization_id === null || user?.organization_id === "null";

  const router = useRouter()

  const createTrail = useMutation(api.document.createPaperTail)

  const onTemplateClick = (title:string,initialContent:string) =>{
    setIsCreating(true)
    createTrail({title,initialContent})
    .then((documentId)=>{
      router.push(`/trail/${documentId}`)
    })
    .finally(()=> setIsCreating(false))
  }

  return (
    <div className="">
      <div className="max-w-screen-xl mx-auto py-6 px-16 flex flex-col gap-y-4">
        <h3 className="font-medium">Start a new Trail</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map(({ id, imageUrl, label }) => (
              <CarouselItem
                key={id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
              >
                <div
                  className={cn(
                    "aspect-[3/4] flex flex-col gap-y-2.5",
                    isCreating && "pointer-events-none opacity-50",!isAdmin && 'cursor-not-allowed', isAdmin && isPersonalTrail && 'cursor-pointer'
                  )}
                >
                  <button 
                    disabled={isCreating || (!isAdmin && !isPersonalTrail)}
                    onClick={() => onTemplateClick(label, "")}
                    style={{
                        backgroundImage:`url(${imageUrl})`,
                        backgroundSize:'cover',
                        backgroundPosition:"center",
                        backgroundRepeat:'no-repeat'
                    }}
                    className={cn("size-full rounded-sm border cursor-pointer transition flex flex-col items-center justify-center gap-y-4 bg-white", !isAdmin && !isPersonalTrail && 'cursor-not-allowed' )}
                   />
                    <p className="text-sm font-medium truncate">{label}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
