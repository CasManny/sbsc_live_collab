"use client";
import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import LoaderPage from "@/components/Loader";
import { getClerkUsers, getDocumentUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user: clerkUser } = useUser();
  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth"}
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        return users;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const users = await getDocumentUsers({
          roomId,
          currentUser: clerkUser?.emailAddresses[0].emailAddress!,
          text,
        });
        return users;
      }}
    >
      <ClientSideSuspense fallback={<LoaderPage />}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
