import { RoomTable } from "@/components/room-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function RoomPage() {
 return (
   <main className="w-full min-h-screen p-16">
     <div className="max-w-[1400px] mx-auto px-6">
       <div className="py-8 flex justify-between items-center">
         <h1 className="text-2xl font-bold">Manage Rooms</h1>
         <Button> <Plus/> New Room</Button>
       </div>
       <section><RoomTable /></section>
     </div>
   </main>
 );
}