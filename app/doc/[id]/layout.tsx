import { auth } from "@clerk/nextjs/server";
import RoomProvider from "@/components/RoomProvider";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ id: string }>;
};

async function DocLayout({ children, params }: LayoutProps) {
  const { id } = await params;  // Wait for the params promise to resolve
  auth.protect();

  return (
    <RoomProvider roomId={id}>{children}</RoomProvider>
  );
}

export default DocLayout;
