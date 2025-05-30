'use client'
import { useRoom, useSelf } from "@liveblocks/react/suspense"
import { useEffect, useState } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs"
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-ui/styles/dark/media-query.css";
import "@liveblocks/react-tiptap/styles.css";
import "@blocknote/shadcn/style.css";
import "@blocknote/core/fonts/inter.css"
import stringToColor from "@/lib/stringToColor";
import { useCreateBlockNoteWithLiveblocks } from "@liveblocks/react-blocknote";
type EditorProps = {
    doc: Y.Doc;
    provider: LiveblocksYjsProvider;
    darkMode: boolean;
}

function BlockNote({ doc, provider, darkMode }: EditorProps) {
    const userInfo = useSelf((me) => me.info);
    const editor= useCreateBlockNoteWithLiveblocks({
        collaboration: {
            provider: provider,
            fragment: doc.getXmlFragment("document-store"),
            user:{
                name: userInfo?.name,
                color: stringToColor(userInfo?.email),
            }
    },
})
  return (
    <div className="relative max-w-6xl mx-auto">
        <BlockNoteView
            className="min-h-screen"
            theme={darkMode ? "dark" : "light"}
            editor={editor}
            slashMenu={true} 
        />
    </div>
  )
}

function CollaborativeEditor() {
    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc>();
    const [provider, setProvider] = useState<LiveblocksYjsProvider>()
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        const yDoc = new Y.Doc();
        const yProvider = new LiveblocksYjsProvider(room, yDoc);
        setDoc(yDoc);
        setProvider(yProvider);

        return () => {
            yDoc?.destroy();
            yProvider?.destroy();
        }
    },[room])

    if(!doc || !provider) {
        return null;
    }

    const style = `
        hover:text-white
        ${
            darkMode?
            "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700":
            "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
        }
    `
  return (
    <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-end gap-2">
            {/* Translate Document AI */}
            {/* Chat to Document AI */}
            {/* Dark Mode */}
            <Button className={style} onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <SunIcon /> : <MoonIcon />}
            </Button>
        </div>

        {/* BlockNote */}
        <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
    </div>
  )
}
export default CollaborativeEditor