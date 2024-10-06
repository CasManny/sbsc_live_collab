import { liveblocks } from "@/lib/liveblocks"
import { getUserColor } from "@/lib/utils"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    const clerkUser = await currentUser()
    if (!clerkUser) redirect('/sign-in')
    const { firstName, lastName, emailAddresses, id, imageUrl } = clerkUser
    const user = {
        id: id,
        info: {
            id,
            name: `${firstName} ${lastName}`,
            avatar: imageUrl,
            email: emailAddresses[0].emailAddress,
            color: getUserColor(id)
        }
    }
    const { status, body } = await liveblocks.identifyUser(
        {
            userId: user.info.email,
            groupIds: []
        },
        { userInfo: user.info}
    )

    return new NextResponse(body, { status})
}