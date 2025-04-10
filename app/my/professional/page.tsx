"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfessionalPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/my/professional/dashboard");
  }, [router]);

  return null;
}
