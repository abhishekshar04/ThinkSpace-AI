import { ArrowLeftCircle } from "lucide-react";
export default function Home() {
  return (
    <main className="flex space-x-2 items-center animate-pulse">
      <ArrowLeftCircle className="w-12 h-12" />
      <h1 className="text-3xl font-bold">Get Started with making a New Document</h1>
    </main>
  );
}
