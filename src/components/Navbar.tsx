import Image from "next/image";
import Link from "next/link";
import logoipsum from "@/assets/logoipsum.svg";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="shadow-md">
      <nav className="max-w-5xl m-auto px-3 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logoipsum} alt="logo" width={30} height={30} />
          <span className="text-xl text-black font-bold tracking-tight">
            Job Board
          </span>
        </Link>
        <Button asChild>
          <Link href="/jobs/new">Post a Job</Link>
        </Button>
      </nav>
    </header>
  );
}
