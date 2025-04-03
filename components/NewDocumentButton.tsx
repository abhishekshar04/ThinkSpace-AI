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
    startTransition(async () => {
      const { docId } = await createNewDocument();

      if (!docId) {
        console.error("Error: docId is undefined");
        return;
      }

      const newPath = `/doc/${docId}`;
      if (pathname !== newPath) {
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
