'use client'

import { useOthers } from "@liveblocks/react/suspense"
import { useSelf } from "@liveblocks/react/suspense"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
function Avatars() {
    const others = useOthers();
    const self = useSelf();
    const all = [self, ...others]
  return (
    <div className="flex items-center gap-2">
        <p className="font-light text-sm">User currently editing this page:</p>
        <div className="flex -space-x-5">
            {all.map((other, i) => (
                <TooltipProvider key={other?.id + i}>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="border-2 hover:z-50">
                        <AvatarImage src={other?.info.avatar} />
                        <AvatarFallback>{other.info.name}</AvatarFallback>
                    </Avatar>
                </TooltipTrigger>
                  <TooltipContent>
                    <p>{self?.id === other?.id ? 'You' : other?.info.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
            ))}

        </div>
    </div>
  )
}
export default Avatars