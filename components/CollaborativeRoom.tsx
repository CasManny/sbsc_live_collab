'use client'
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense"
import LoaderPage from "./Loader"
import Header from "./Header"
import { useEffect, useRef, useState } from "react"
import { Input } from "./ui/input"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { Editor } from "./editor/Editor"
import ActiveCollaborators from "./ActiveCollaborators"
import ShareModal from "./ShareModal"
import { updateDocument } from "@/lib/actions/rooms.action"
import { Edit } from "lucide-react"

const CollaborativeRoom = ({roomId, roomMetadata, currentUserType, users}: CollaborativeRoomProps) => {
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [documentTitle, setDocumentTitle] = useState(roomMetadata.title)
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const updateTitleHandler = async (
        e: React.KeyboardEvent<HTMLInputElement>
      ) => {
        if (e.key === "Enter") {
          setLoading(true);
          try {
            if (documentTitle !== roomMetadata.title) {
              const updatedDocument = await updateDocument({roomId: roomId, title: documentTitle});
              if (updatedDocument) {
                setEditing(false);
              }
            }
          } catch (error) {
            console.log(error);
          }
          setLoading(false);
        }
      };
    
      useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          if (
            containerRef.current &&
            !containerRef.current.contains(e.target as Node)
          ) {
            setEditing(false);
            updateDocument({roomId: roomId, title: documentTitle})
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [documentTitle, roomId]);
        
        useEffect(() => {
            if (editing && inputRef.current) {
                inputRef.current.focus()
            }
        }, [editing])

    return (
        <RoomProvider id={roomId}>
            <ClientSideSuspense fallback={<LoaderPage />}>
                <div className="collaborative-room">
                    <Header>
                        <div ref={containerRef} className="flex w-fit flex-1 items-center justify-center gap-2">
                            {editing && !loading ? (
                            <Input
                            type="text"
                            value={documentTitle}
                            ref={inputRef}
                            placeholder="Enter title"
                            onChange={(e) => setDocumentTitle(e.target.value)}
                            onKeyDown={updateTitleHandler}
                            disabled={!editing}
                            className="document-title-input flex-1"
                          />
                            ): (
                                <p className="document-title">{documentTitle}</p>
                            )}

                            {currentUserType === 'editor' && !editing && (<Edit className="w-5 h-5 cursor-pointer" onClick={() => setEditing(true)} />)}

                            {currentUserType !== 'editor' && !editing && (
                                <p className="text-sm">View only</p>
                            )}
                            
                            {loading && <p className="text-sm text-gray-400">saving...</p>}
                        </div>
                        <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
                            <ActiveCollaborators />
                            <ShareModal roomId={roomId} collaborators={users!} creatorId={roomMetadata.creatorId} currentUserType={currentUserType!} />
                        </div>

                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </Header>
                    <Editor roomId={roomId} currentUserType={currentUserType as UserType} />
                </div>
            </ClientSideSuspense>
            
      </RoomProvider>
  )
}

export default CollaborativeRoom