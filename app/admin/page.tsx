"use client";
import { FuzzyText } from "@/components/Reactbits";
export default function AdminPage() {
  return (
    <div>
      <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true}>
        Are you an admin?
      </FuzzyText>
    </div>
  );
}
