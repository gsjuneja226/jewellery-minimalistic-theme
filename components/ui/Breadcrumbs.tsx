import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-2 text-xs font-sans text-brown-text/70", className)}
    >
      <Link href="/" className="hover:text-espresso transition-colors">
        Home
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="h-3 w-3 text-gold/60 flex-shrink-0" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-espresso transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-espresso font-medium truncate" aria-current="page">
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
