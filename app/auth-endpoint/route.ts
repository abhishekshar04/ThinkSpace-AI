import { adminDB } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    auth.protect();
    
    // Retrieve session claims
    const { sessionClaims } = await auth();
    
    // Check if sessionClaims exists and has the necessary properties
    if (!sessionClaims || !sessionClaims.email || !sessionClaims.fullName || !sessionClaims.image) {
        return new NextResponse('Invalid session claims', { status: 400 });
    }

    const { room } = await req.json();

    // Prepare session for liveblocks
    const session = liveblocks.prepareSession(sessionClaims.email, {
        userInfo: {
            name: sessionClaims.fullName,
            email: sessionClaims.email,
            avatar: sessionClaims.image,
        },
    });

    // Check if the user is in the room
    const usersInRoom = await adminDB
        .collectionGroup('rooms')
        .where('userId', '==', sessionClaims.email)
        .get();

    const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

    if (userInRoom?.exists) {
        session.allow(room, session.FULL_ACCESS);
        const { body, status } = await session.authorize();
        return new NextResponse(body, { status });
    } else {
        return new NextResponse('You are not in this room', { status: 403 });
    }
}
