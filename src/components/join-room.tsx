import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function JoinRoom() {
  const router = useRouter();
  const [inviteLink, setInviteLink] = useState("");

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
  };

  function handlePushToRoom() {
    router.push(inviteLink);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          Join Room via Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-lg font-semibold">
            Paste the Invite Link
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter the room invitation link to join
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="text-sm">
              Invite Link
            </Label>
            <Input
              id="link"
              placeholder="Paste room link here"
              value={inviteLink}
              onChange={(e) => setInviteLink(e.target.value)}
              className="w-full"
            />
          </div>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={handleCopyLink}
            className="mt-6"
          >
            <span className="sr-only">Copy</span>
            <Copy size={16} />
          </Button>
        </div>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              disabled={!inviteLink}
              className="w-full"
              onClick={handlePushToRoom}
            >
              Join Room
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
