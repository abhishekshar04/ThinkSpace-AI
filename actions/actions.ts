'use server';

import { adminDB } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { createDecipheriv } from "crypto";

export async function createNewDocument() {
    auth.protect();
    const {sessionClaims} = await auth();
    const docCollectionRef = adminDB.collection("documents");
    const docRef = await docCollectionRef.add({
        title: "New Document"
    })

    await adminDB.collection('users').doc(sessionClaims?.email!).collection('rooms').doc(docRef.id).set({
        userId: sessionClaims?.email,
        role: "owner",
        createdAt: new Date(),
        roomId: docRef.id
    });

    return {docId: docRef.id};
}

export async function deleteDocument(roomId: string) {
    auth.protect();
    console.log("Deleting document with roomId: ", roomId);
    try {
        await adminDB.collection("documents").doc(roomId).delete();
        const query = adminDB.collectionGroup("rooms").where("roomId", "==", roomId).get();
        const batch = adminDB.batch();
        (await query).docs.forEach((doc) => {
            batch.delete(doc.ref);
        })
        await batch.commit();
        await liveblocks.deleteRoom(roomId);

        return {success: true};

    } catch (error) {
        console.error("Error deleting document: ", error);
        return {success: false};
    }
}