"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CasualPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/my/casual/dashboard");
  }, [router]);

  return null;
}
