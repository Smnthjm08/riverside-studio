"use client"
import { usePathname } from "next/navigation"

export default function CallRoomPage(){
  const pathname = usePathname();
    return(
        <div className="p-48">
            Hi {pathname}
        </div>
    )
}