import { getRoom } from "@/actions/room";
import  CreateRoom from "@/components/create-room";
import { RoomTable } from "@/components/room-table";

export default async function RoomPage() {
  const roomData = await getRoom();

  return (
    <main className="w-full min-h-screen p-16">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="py-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Rooms</h1>
          {/* <Button>
            {" "}
            <Plus /> New Room
          </Button> */}
          <CreateRoom />
        </div>
        <section>
          <RoomTable roomData={roomData} />
        </section>
      </div>
    </main>
  );
}
