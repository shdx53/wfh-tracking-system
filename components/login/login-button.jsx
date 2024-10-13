"use client";

// Library
import { useState } from "react";

// Component
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";

export default function LoginButton() {
  const [isPending, setIsPending] = useState(false);
  
  return (
    <Button className="w-full" onClick={() => setIsPending(true)}>
      {isPending ? <Loading className="py-2" /> : "Log in"}
    </Button>
  );
}
