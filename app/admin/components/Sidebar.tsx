"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { siderbarItems } from "../constants";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Settings, LogOut } from "lucide-react";
export default function Sidebar() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const menuRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement | HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "Enter") return;

    const maxIndex = siderbarItems.length + 2; // +2 for settings and logout

    if (event.key === "Enter") {
      event.currentTarget.click();
      return;
    }

    event.preventDefault();
    const nextIndex = event.key === "ArrowDown"
      ? (index + 1) % maxIndex
      : (index - 1 + maxIndex) % maxIndex;

    const nextElement = menuRefs.current[nextIndex];
    if (nextElement) {
      nextElement.focus();
    }
  };

  // Initialize refs array when component mounts
  useEffect(() => {
    menuRefs.current = new Array(siderbarItems.length + 2).fill(null);
  }, []);

  const getItemStyles = (isActive: boolean, isHovered: boolean) => {
    return `
      ${isActive ? "bg-[#7065F0] text-white" : "text-[#000929] hover:text-[#7065F0]"} my-5
      flex items-center space-x-2 font-medium text-[1.125rem] px-4 py-3 rounded-[8px] w-fit
      transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#7065F0] focus:ring-offset-2
    `;
  };

  return (
    <aside
      className="sticky top-0 shadow-md shadow-white bg-white border-r h-screen w-[220px] flex flex-col overflow-y-auto custom-scrollbar"
      role="navigation"
      aria-label="Main Sidebar"
    >
      {/* Logo Section */}
      <div className="sticky top-0 bg-white w-full px-5 py-3 z-10">
        <Link href="/admin/dashboard" aria-label="Go to homepage">
          <Image
            src="/logo/ezyRentNavLogo.svg"
            width={200}
            height={40}
            tabIndex={0}
            alt="EzyRent Logo"
            className="w-[200px] h-[100px] object-fill"
            priority
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-5">
        <ul role="menu" aria-label="Main Navigation">
          {siderbarItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            const isHovered = hoveredItem === index;

            return (
              <li key={`${item.title}-${index}`} role="menuitem">
                <Link
                  href={item.href}
                  aria-label={`Navigate to ${item.title}`}
                  aria-current={isActive ? "page" : undefined}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  ref={(el) => {
                    menuRefs.current[index] = el;
                  }}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={getItemStyles(isActive, isHovered)}
                >
                  <Icon className="size-5" aria-hidden="true" />
                  <span
                    className={`whitespace-nowrap capitalize ${ isHovered ? "w-fit" : "max-w-[150px] truncate"
                      }`}
                  >
                    {item.title}
                  </span>
                </Link>
              </li>
            );
          })}

          {/* Settings Link */}
          <li role="menuitem">
            <Link
              href="/settings"
              aria-label="Navigate to Settings"
              aria-current={pathname === "/settings" ? "page" : undefined}
              onMouseEnter={() => setHoveredItem(-1)}
              onMouseLeave={() => setHoveredItem(null)}
              ref={(el) => {
                menuRefs.current[siderbarItems.length] = el;
              }}
              onKeyDown={(e) => handleKeyDown(e, siderbarItems.length)}
              className={getItemStyles(pathname === "/settings", hoveredItem === -1)}
            >
              <Settings className="size-5" aria-hidden="true" />
              <span
                className={`whitespace-nowrap capitalize ${hoveredItem === -1 ? "w-fit" : "max-w-[150px] truncate"
                  }`}
              >
                Settings
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto px-5 py-5">
        <Button
          variant="ghost"
          className="w-fit capitalize text-red-500 flex items-center space-x-2 font-medium text-[1.125rem] px-4 py-3 hover:bg-red-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Logout from application"
          onClick={() => {/* Add logout handler */ }}
          ref={(el) => {
            if (el) {
              menuRefs.current[siderbarItems.length + 1] = el as unknown as HTMLAnchorElement;
            }
          }}
          onKeyDown={(e) => handleKeyDown(e, siderbarItems.length + 1)}
        >
          <LogOut className="size-5" aria-hidden="true" />
          <span className="max-w-[150px] truncate whitespace-nowrap">Logout</span>
        </Button>
      </div>
    </aside>
  );
}