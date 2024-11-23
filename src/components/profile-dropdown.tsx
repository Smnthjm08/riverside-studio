import { auth } from "../../auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  const imageUrl = session?.user?.image;

  return (
    <section>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {" "}
          <Avatar>
            <AvatarImage
              src={imageUrl ? imageUrl : "./google.png"}
              alt="profile"
            />
            <AvatarFallback>LA</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <span
              className={`flex items-center gap-2 text-base transition-all duration-300`}
            >
              <User />
              Profile
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <span
              className={`flex items-center gap-2 text-base transition-all duration-300 hover:text-red-500`}
            >
              <LogOut />
              Logout
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
