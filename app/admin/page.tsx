"use client";
import { FuzzyText } from "@/components/Reactbits";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, ArrowLeft, ArrowRight } from "lucide-react";
import { Button, Input, Card, CardBody, CardFooter } from "@heroui/react";

export default function AdminPage() {
  const KONAMI_SEQUENCE = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      setInputSequence((prevSequence) => {
        const newSequence = [...prevSequence, e.key];
        if (newSequence.length > KONAMI_SEQUENCE.length) {
          newSequence.shift();
        }
        if (JSON.stringify(newSequence) === JSON.stringify(KONAMI_SEQUENCE)) {
          setShowOverlay(true);
        }
        return newSequence;
      });
    };

    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, []);

  const handleLogin = () => {
    // Handle login logic here
    console.log("Login attempt with:", email, password);
  };

  const renderKeyIcon = (key: string) => {
    switch (key) {
      case "ArrowUp":
        return <ArrowUp className="h-6 w-6" />;
      case "ArrowDown":
        return <ArrowDown className="h-6 w-6" />;
      case "ArrowLeft":
        return <ArrowLeft className="h-6 w-6" />;
      case "ArrowRight":
        return <ArrowRight className="h-6 w-6" />;
      default:
        return <span className="text-xl font-bold">{key}</span>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover={true}
        fontSize={36}
      >
        {showOverlay
          ? "Alright fine, maybe you are an admin."
          : "Are you an admin?"}
      </FuzzyText>

      {showOverlay ? (
        <Card className="bg-black border-white border-2 w-1/4">
          <CardBody className="gap-4">
            <Input
              label="Email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired
              variant="bordered"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
              variant="bordered"
            />
          </CardBody>
          <CardFooter className="flex justify-center">
            <Button
              onPress={handleLogin}
              color="secondary"
              variant="bordered"
              className="w-full"
            >
              Login
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="flex flex-row items-center justify-center gap-2 p-4 border rounded-md">
          {inputSequence.map((key, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-12 h-12 rounded-md"
            >
              {renderKeyIcon(key)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
