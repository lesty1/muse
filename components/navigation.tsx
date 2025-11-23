'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SearchBar from "./search-bar";

const navLinks = [
    { href: "/", label: "Discover" },
    { href: "/journey", label: "Journey" },
    { href: "/references", label: "References" },
    { href: "/marketplace", label: "Marketplace" },
];

export function Navigation() {
    const pathname = usePathname();

    return (
        <div className="flex w-full items-center">
            <nav className="flex items-center gap-6 text-sm font-medium">
                {navLinks.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className={cn(
                            "transition-colors hover:text-foreground/80",
                            pathname === href ? "text-foreground" : "text-foreground/60"
                        )}
                    >
                        {label}
                    </Link>
                ))}
            </nav>
            <div className="w-full max-w-xs ml-6">
                <SearchBar />
            </div>
        </div>
    );
}
