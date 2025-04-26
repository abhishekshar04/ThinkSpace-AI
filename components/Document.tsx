import { useEffect, useState, useTransition } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useDocumentData } from "react-firebase-hooks/firestore"
import CollaborativeEditor from "./CollaborativeEditor"
import useOwner from "@/lib/useOwner"
import DeleteDocument from "./DeleteDocument"
import InviteUser from "./InviteUser"
import ManageUsers from "./ManageUsers"

function Document({id}: {id:string}) {
    const [data, loading, error] = useDocumentData(doc(db, "documents", id));
    const [input , setInput] = useState<string>("")
    const [isUpdating, startTransition] = useTransition()
    const isOwner = useOwner()

    useEffect(() => {
        if(data){
            setInput(data.title)
        }
    }, [data])

    const updateTitle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(input.trim()){
            startTransition(async () => {
                await updateDoc(doc(db, "documents", id), {
                    title: input,
                })
            })
        }
        
    }


  return (
    <div className="flex-1 bg-white h-full p-5">
        <div className="flex max-w-5xl mx-auto justify-between pb-5">
            <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
                {/* Update title */}
                <Input 
                className="bg-white"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                />
                <Button disabled={isUpdating} type="submit" >{isUpdating? "Updating...." : "Update"}</Button>
                {/* If */}
                {isOwner && (
                    <>
                        {/* Invite User */}
                        <InviteUser />
                        {/* Delete Document */}
                        <DeleteDocument />
                    </>
                )}
                {/* Is owner && inviteUser , DeleteDocument */}

            </form>
        </div>

        <div className="flex max-w-6xl items-center mb-5 mx-auto justify-between">
            {/* {Manage Users} */}
            <ManageUsers />
            {/* Avatars */}
        </div>

        <hr className="pb-10 mx-20"/>

        {/* Collaborative Editor */}
        <CollaborativeEditor />
    </div>
  )
}
export default Document