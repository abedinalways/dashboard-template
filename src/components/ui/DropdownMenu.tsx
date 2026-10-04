"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/src/lib/utils";

interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
  divider?: boolean;
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
  className?: string;
}

export function DropdownMenu({
  trigger,
  items,
  align = "right",
  className,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <div onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2 w-48 rounded-xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-lg py-1.5 focus:outline-none animate-in fade-in-0 zoom-in-95 duration-150",
            align === "right" ? "right-0 origin-top-right" : "left-0 origin-top-left",
            className
          )}
        >
          {items.map((item) => (
            <React.Fragment key={item.id}>
              {item.divider && (
                <div className="my-1 border-t border-gray-100 dark:border-gray-800" />
              )}
              <button
                type="button"
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center w-full gap-2.5 px-3.5 py-2 text-xs font-medium text-left transition-colors cursor-pointer",
                  item.danger
                    ? "text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                {item.icon && <span className="w-4 h-4 shrink-0">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
