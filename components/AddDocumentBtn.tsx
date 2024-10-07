"use client";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createDocument } from "@/lib/actions/rooms.action";

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();
  const addDocumentHandler = async () => {
    try {
      const room = await createDocument({ userId, email });
      if (room) {
        router.push(`/documents/${room.id}`);
      }
    } catch (error) {
      console.log(`Error creating room`);
    }
  };
  return (
    <Button
      type="submit"
      className="bg-gradient-to-t bg-sbsc/95 shadow-md hover:bg-sbsc/95"
      onClick={addDocumentHandler}
    >
      <Plus className="w-5 h-5 text-white" />
      <p>Start a blank Document</p>
    </Button>
  );
};

export default AddDocumentBtn;
