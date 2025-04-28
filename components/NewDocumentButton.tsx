"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { createNewDocument } from "@/actions/actions";
import { useAuth } from "@clerk/clerk-react"; // Import Clerk's useAuth hook

function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const { isSignedIn } = useAuth(); // Get the authentication status from Clerk

  const handleCreateNewDocument = () => {
    if (!isSignedIn) {
      console.error("User is not authenticated.");
      return; // Prevent creating a new document if not logged in
    }

    if (isPending) return; // Prevent multiple clicks while document is being created

    startTransition(async () => {
      const { docId } = await createNewDocument();

      if (!docId) {
        console.error("Error: docId is undefined");
        return;
      }

      const newPath = `/doc/${docId}`;

      // If we're on a document path, replace it with the new document's path
      // Check if the current path starts with "/doc/" and replace it entirely
      if (pathname.startsWith("/doc/")) {
        router.replace(newPath); // Replace to avoid concatenation of "/doc/"
      } else {
        // If we're not on a document page, just navigate to the new document
        router.push(newPath);
      }
    });
  };

  return (
    <div>
      {isSignedIn ? (
        <Button onClick={handleCreateNewDocument} disabled={isPending}>
          {isPending ? "Creating..." : "New Document"}
        </Button>
      ) : (
        <Button disabled>
          Please log in to create a new document
        </Button>
      )}
    </div>
  );
}

export default NewDocumentButton;
