"use client";
import { Dock } from "@/components/Reactbits";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import {
  HomeIcon,
  UserIcon,
  FileIcon,
  MessageSquareIcon,
  BriefcaseBusinessIcon,
  NewspaperIcon,
  BanIcon,
  RotateCcwIcon,
} from "lucide-react";

const AdminDock = ({ className }: { className?: string }) => {
  const router = useRouter();
  const [type, setType] = useState<"casual" | "professional">("professional");
  const navItems =
    type === "casual"
      ? siteConfig.adminCasualItems
      : siteConfig.adminProfessionalItems;
  const toggleTypeChange = () => {
    setType(type === "casual" ? "professional" : "casual");
  };
  const iconFinder = (label: string) => {
    switch (label) {
      case "Dashboard":
        return <HomeIcon className={type === "casual" ? "text-purple-500" : "text-blue-500"} />;
      case "Portfolio":
        return <FileIcon className={type === "casual" ? "text-purple-500" : "text-blue-500"} />;
      case "Profile":
        return <UserIcon className={type === "casual" ? "text-purple-500" : "text-blue-500"} />;
      case "Projects":
        return <BriefcaseBusinessIcon className={type === "casual" ? "text-purple-500" : "text-blue-500"} />;
      case "Posts":
        return <NewspaperIcon className={type === "casual" ? "text-purple-500" : "text-blue-500"} />;
      case "Messages":
        return <MessageSquareIcon className={type === "casual" ? "text-purple-500" : "text-blue-500"} />;
      default:
        return <BanIcon />;
    }
  };
  const items = navItems.map((item) => {
    return {
      label: type === "casual" ? `${item.label} (Casual)` : `${item.label} (Professional)`,
      icon: iconFinder(item.label),
      onClick: () => router.push(item.href),
    };
  });
  const itemsWithToggle = [...items, {
    label: "Toggle",
    icon: <RotateCcwIcon size={16} className="text-red-400"/>,
    onClick: toggleTypeChange,
  }];
  return <Dock items={itemsWithToggle} className={className} />;
};
export default AdminDock;
