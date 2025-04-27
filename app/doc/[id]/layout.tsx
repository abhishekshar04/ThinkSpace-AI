import { auth } from "@clerk/nextjs/server";
import RoomProvider from "@/components/RoomProvider";

// Defining LayoutProps interface
interface LayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

async function DocLayout({ children, params }: LayoutProps) {
  // Extract the id directly from params
  const { id } = params;

  // Protect the route with Clerk authentication
  auth.protect();

  return (
    <RoomProvider roomId={id}>
      {children}
    </RoomProvider>
  );
}

export default DocLayout;
