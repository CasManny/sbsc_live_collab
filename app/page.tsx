import AddDocumentBtn from "@/components/AddDocumentBtn";
import DeleteBtn from "@/components/DeleteBtn";
import Header from "@/components/Header";
import Notifications from "@/components/Notifications";
import { getDocuments } from "@/lib/actions/rooms.action";
import { dateConverter } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const roomDocuments = await getDocuments({
    email: user.emailAddresses[0].emailAddress,
  });
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
      {roomDocuments?.data.length === 0 ? (
        <div className="document-empty-list mx-auto gap-2">
          <Image
            src={"/assets/icons/doc.svg"}
            alt="doc"
            width={40}
            height={40}
            className="mx-auto"
          />
          <AddDocumentBtn
            userId={user.id}
            email={user.emailAddresses[0].emailAddress}
          />
        </div>
      ) : (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-xl font-bold">All Documents</h3>
            <AddDocumentBtn
              userId={user.id}
              email={user.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className="document-ul">
            {roomDocuments?.data.map(({ id, metadata, createdAt }: any) => (
              <li className="document-list-item">
                <Link
                  href={`/documents/${id}`}
                  className="flex items-center flex-1 gap-4"
                >
                  <div className="hidden rounded-md bg-dark-500 sm:block">
                    <Image
                      src={"/assets/icons/doc.svg"}
                      alt="doc"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-lg font-semibold">
                      {metadata.title}{" "}
                    </p>
                    <p className="text-sm font-light">
                      created about {dateConverter(createdAt)}
                    </p>
                  </div>

                </Link>
                <DeleteBtn roomId={id} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
