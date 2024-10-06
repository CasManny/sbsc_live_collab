"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import LoaderPage from "@/components/Loader";

const Provider = ({children}: { children: React.ReactNode}) => {
  return (
    <LiveblocksProvider authEndpoint={'/api/liveblocks-auth'}>
        <ClientSideSuspense fallback={<LoaderPage />}>
          {children}
        </ClientSideSuspense>
    </LiveblocksProvider>
  )
}

export default Provider