'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Menu } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useWindowResizer } from '@/hooks/useWindowResizer';

type AdminHeaderPropType = {
  title: string | undefined;
  handleClick?: () => void;
  btnTitle?: string;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
};

export default function AdminHeader({
  title,
  handleClick,
  btnTitle,
  setIsMobileMenuOpen
}: AdminHeaderPropType) {
  const handleProfileClick = () => {
    alert('Profile clicked!');
  };
  const { windowWidth } = useWindowResizer();
  const hideTitle = windowWidth <= 768 && handleClick;

  return (
    <header
      className="bg-white py-8 border-b w-full flex items-center justify-between sticky top-0 z-10 px-5"
      role="banner"
      aria-label={`${title} Header`}
    >
      {/* open menu */}
      <Button
        variant="ghost"
        className="lg:hidden p-2 border !size-10 rounded-md bg-white shadow-md"
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label={'Open menu'}
      >
        <Menu className="!size-6" />
      </Button>

      {/* Title */}
      {!hideTitle && (
        <h1
          className="font-bold w-full capitalize text-center lg:w-[250px] truncate text-[#000929] leading-7 text-[1.125rem] lg:text-[2rem]"
          id="header-title"
        >
          {title}
        </h1>
      )}

      {/* Search */}
      <div className="hidden lg:block relative" role="search">
        <label htmlFor="search-input" className="sr-only">
          Search {title}
        </label>
        <Input
          id="search-input"
          placeholder="Search"
          aria-labelledby="search-input"
          className="pl-5 pr-10 text-[1.25rem] w-[450px] h-[60px] rounded-[30px] focus-visible:ring-0 focus-visible:outline-0"
        />
        <Search className="absolute right-4 top-4" aria-hidden="true" />
      </div>

      {/* Action Button */}
      <div className="flex  items-center justify-between">
        {handleClick && (
          <Button
            variant="default"
            className="bg-[#7065F0] first-letter:capitalize h-12 rounded-[30px] capitalize mr-10"
            aria-label={btnTitle}
            onClick={handleClick}
          >
            <span>{btnTitle}</span>
            <Plus aria-hidden="true" />
          </Button>
        )}
        {/* Profile */}
        <Avatar
          className="size-12 cursor-pointer"
          role="button"
          aria-label="User profile"
          tabIndex={0}
          onClick={handleProfileClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleProfileClick();
            }
          }}
        >
          {/* <AvatarImage src="/logo/logo.png" alt="User profile image" /> */}
          <AvatarFallback
            className="size-full rounded-full bg-[#7065F0] text-white text-[1.5rem] flex items-center justify-center"
            aria-hidden="true"
          >
            E
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
