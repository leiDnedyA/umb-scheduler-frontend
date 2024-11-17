import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            UMass Boston Scheduler
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-foreground hover:text-gray-400 transition-colors">
              Home
            </Link>
            <Link href="/schedule" className="text-foreground hover:text-gray-400 transition-colors">
              Schedule
            </Link>
            <Link href="/about" className="text-foreground hover:text-gray-400 transition-colors">
              About
            </Link>
            {
              status === "authenticated" ?
                <button
                  className="text-foreground hover:text-gray-400 transition-colors"
                  onClick={() => {signOut()}}
                >
                  Sign Out
                </button>
                :
                <Link href="/login" className="text-foreground hover:text-gray-400 transition-colors">
                  Login
                </Link>
            }
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
} 
