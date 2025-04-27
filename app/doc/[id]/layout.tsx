import { auth } from "@clerk/nextjs/server";
import RoomProvider from "@/components/RoomProvider";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  params: { id: string };
};

async function DocLayout({ children, params }: LayoutProps) {
  auth.protect();
  
  return (
    <RoomProvider roomId={params.id}>{children}</RoomProvider>
  );
}

export default DocLayout;
