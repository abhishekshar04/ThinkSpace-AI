import { auth } from "@clerk/nextjs/server"
import RoomProvider from "@/components/RoomProvider";
async function DocLayout({children, params}: {children: React.ReactNode, params: { id: string }}) {
  const { id } = await params;
    auth.protect();
  return (
    <RoomProvider roomId={id}>{children}</RoomProvider>
  )
}
export default DocLayout