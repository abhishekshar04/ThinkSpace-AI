'use client'
import {LiveblocksProvider} from "@liveblocks/react/suspense"
function LiveBlocksProvider({children}: {children: React.ReactNode}) {
  console.log(process.env.NEXT_PUBLIC_LIVEBLOCK_PUBLIC_KEY)
    if(!process.env.NEXT_PUBLIC_LIVEBLOCK_PUBLIC_KEY){
        throw new Error("Missing LiveBlocks public key in environment variables")
    }
  return (
    <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"}>{children}</LiveblocksProvider>
  );
}
export default LiveBlocksProvider