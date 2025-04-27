"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { createNewDocument } from "@/actions/actions";

function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const handleCreateNewDocument = () => {
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
      <Button onClick={handleCreateNewDocument} disabled={isPending}>
        {isPending ? "Creating..." : "New Document"}
      </Button>
    </div>
  );
}

export default NewDocumentButton;
