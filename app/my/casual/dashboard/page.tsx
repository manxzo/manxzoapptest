"use client";
import { InfiniteMenu } from "@/components/Reactbits";
export default function DashboardPage() {
  const items = [
    {
      image: "https://picsum.photos/300",
      link: "/",
      title: "Item 1",
      description: "This is pretty cool, right?",
    },
    {
      image: "https://picsum.photos/400",
      link: "/",
      title: "Item 2",
      description: "This is pretty cool, right?",
    },
    {
      image: "https://picsum.photos/500",
      link: "/",
      title: "Item 3",
      description: "This is pretty cool, right?",
    },
    {
      image: "https://picsum.photos/600",
      link: "/",
      title: "Item 4",
      description: "This is pretty cool, right?",
    },
  ];

  return (
    <div className="h-screen w-screen mx-auto relative overflow-hidden">
      <InfiniteMenu items={items} />
    </div>
  );
}
