// Library
import Link from "next/link";

// Component
import { Button } from "@/components/ui/button";

export function renderLinkButton({ href, label, onClick }) {
  return (
    <Link
      href={href}
      className="w-full"
      onClick={onClick}
    >
      <Button variant="ghost" className="w-full justify-start font-normal flex">
        {label}
      </Button>
    </Link>
  );
}
