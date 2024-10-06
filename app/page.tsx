import AddDocumentBtn from "@/components/AddDocumentBtn";
import Header from "@/components/Header";
import Notifications from "@/components/Notifications";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const documents = [];
  return (
    <main className="relative min-h-screen flex flex-col container sm:gap-10 sm:px-[2rem]">
      <Header>
        <div className="flex gap-2">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      {documents.length === 0 ? (
        <div className="document-empty-list mx-auto">
          <Image
            src={"/assets/icons/doc.svg"}
            alt="doc"
            width={40}
            height={40}
            className="mx-auto"
          />
          <AddDocumentBtn />
        </div>
      ) : (
        <div className=""></div>
      )}
    </main>
  );
}
