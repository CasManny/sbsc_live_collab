"use client";

import Image from "next/image";
import { useState } from "react";

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

import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { deleteDocument } from "@/lib/actions/rooms.action";

const DeleteBtn = ({ roomId }: { roomId: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteDocumentHandler = async () => {
    setLoading(true);
    try {
      await deleteDocument(roomId);
        setLoading(false);
        setOpen(false)
    } catch (error) {
      setLoading(false);
      console.log(`Error deleting document`);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="min-w-9 rounded-xl bg-transparent hover:bg-sbsc/30 p-2 transition-all">
          <Trash className="w-h h-5 text-rose-600 cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <div className="h-10 w-10 bg-sbsc/30 rounded-full flex items-center justify-center">
            <Trash className="w-h h-5 text-rose-600 cursor-pointer" />
          </div>

          <DialogTitle>Delete document</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this document? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-5">
          <DialogClose asChild className="w-full bg-dark-400 text-white">
            Cancel
          </DialogClose>

          <Button
            variant="destructive"
            onClick={deleteDocumentHandler}
            className="gradient-red w-full"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBtn;
