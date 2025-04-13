'use client'
import {LiveblocksProvider} from "@liveblocks/react/suspense"
function LiveBlocksProvider({children}: {children: React.ReactNode}) {
    if(!process.env.live_block_public_key){
        throw new Error("Missing LiveBlocks public key in environment variables")
    }
  return (
    <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"}>{children}</LiveblocksProvider>
  );
}
export default LiveBlocksProvider