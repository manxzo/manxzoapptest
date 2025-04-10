"use client";

import { useRouter } from "next/navigation";
import { FuzzyText } from "@/components/Reactbits";
import { useEffect, useState } from "react";

export default function MyPage() {
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      router.push("/");
    }
  }, [countdown, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover={true}
        fontSize={72}
      >
        404
      </FuzzyText>
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover={true}
        fontSize={36}
      >
        You seem lost buddy. Lets get you back on track.
      </FuzzyText>
      <FuzzyText
        baseIntensity={0.1}
        hoverIntensity={0.5}
        enableHover={true}
        fontSize={24}
      >
        Redirecting to home in {countdown}...
      </FuzzyText>
    </div>
  );
}
