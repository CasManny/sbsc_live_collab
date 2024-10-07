"use client";
import { useSelf } from "@liveblocks/react/suspense";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import UserTypeSelector from "./UserTypeSelector";
import { updateDocumentAccess } from "@/lib/actions/rooms.action";
import Collaborator from "./Collaborator";

const ShareModal = ({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareDocumentDialogProps) => {
  const [open, setopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelf(); // Knowing which user is trying to make the change
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<UserType>("viewer");

    const shareDocumentHandler = async () => {
        setLoading(true)
        await updateDocumentAccess({roomId, email, userType: userType as UserType, updatedBy: user.info})
        setLoading(false)
  };
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        <Button className="gradient-blue flex h-9 gap-1 px-4" disabled={currentUserType !== 'editor'}>
          <Image
            src={"/assets/icons/share.svg"}
            alt="share"
            width={20}
            height={20}
            className="min-w-4 md:size-5"
          />
          <p className="mr-1 hidden sm:block">Share</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog text-black">
        <DialogHeader>
          <DialogTitle>Manage who can view this project</DialogTitle>
          <DialogDescription>
           Select which user can view and edit this document.
          </DialogDescription>
              </DialogHeader>
              <Label htmlFor="email" className="mt-6">Email Address</Label>
              <div className="flex items-center gap-3">
                  <div className="flex flex-1 rounded-md">
                      <Input id="email" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} className="share-input" />
                      <UserTypeSelector userType={userType} setUserType={setUserType} />
                  </div>
                  <Button type="submit" disabled={loading} onClick={shareDocumentHandler} className="gradient-blue flex h-full gap-1 px-5">
                      {loading ? 'Sending...' : "Invite"}
                  </Button>
              </div>
              <div className="my-2 space-y-2">
                  <div className="flex flex-col">
                      {collaborators.map((collaborator) => (
                          <Collaborator key={collaborator.id} roomId={roomId} creatorId={creatorId} email={collaborator.email} collaborator={collaborator} user={user.info} />
                      ))}
                  </div>
              </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
