'use client'
import { useState } from "react"
import { MenuIcon } from "lucide-react"
import NewDocumentButton from "./NewDocumentButton"
import { useCollection } from "react-firebase-hooks/firestore"
import SidebarOption from "./SidebarOption"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { useUser } from "@clerk/nextjs"
import { collectionGroup, DocumentData, query, where } from "firebase/firestore"
import { db } from "@/firebase"
import { useEffect } from "react"
  
interface RoomDocument extends DocumentData{
    createdAt: string;
    role: "owner" | "editor";
    roomId: string;
    userId: string;
}
  
function Sidebar() {
    const [groupedData, setGroupedData] = useState<{
        owner: RoomDocument[];
        editor: RoomDocument[];
    }>({
        owner: [],
        editor: []
    });
    const {user} = useUser()
    const [data] = useCollection(
        user && (
            query(collectionGroup(db,'rooms'), 
            where("userId", "==", user.emailAddresses[0].toString() )) 
        )
    )

    useEffect(() => {
        if(!data){
            return;
        }
        const grouped = data.docs.reduce<{
            owner: RoomDocument[];
            editor: RoomDocument[];
        }>((acc, doc) => {
            const room = doc.data() as RoomDocument;
            if(room.role === "owner"){
                acc.owner.push({
                    id: doc.id,
                    ...room
                });
            }else if(room.role === "editor"){
                acc.editor.push({
                    id: doc.id,
                    ...room
                });
            }
            return acc;
        },{
            owner: [],
            editor: []
        })

        setGroupedData(grouped);
    },[data])
    const menuOptions = (
        <>
        <NewDocumentButton />
        {/* My documents */}
        <div className="flex py-4 flex-col space-y-3 md:max-w-36">
            {groupedData.owner.length === 0 ? (
                <h2>No documents found</h2>
            ): (
                <>
                    <h2 className="text-xl text-gray-500">My documents</h2>
                    {groupedData.owner.map((room) => (
                        <SidebarOption key={room.id} id={room.id} href={`/doc/${room.id}`} />
                    ))}
                </>
                
            )}
            {/* Shared with me */}
            {groupedData.editor.length !== 0 && (
                <>
                    <h2 className="text-sm font-semibold text-gray-500">Shared with me</h2>
                    {groupedData.editor.map((room) => (
                        <SidebarOption key={room.id} id={room.id} href={`/doc/${room.id}`} />
                    ))}
                </>
            )}
        </div>
        
        {/* List */}

        
        {/* List */}
        </>
    );
  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger><MenuIcon/></SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <div>{menuOptions}</div>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
        <div className="hidden md:inline">
            {menuOptions}
        </div>
    </div>
  )
}
export default Sidebar