// User menu component
import React, { useState, useRef } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { LogOut, User as UserIcon } from 'lucide-react';

export function UserMenu() {
  const { user, signOut } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, () => setIsOpen(false));

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <UserIcon className="w-8 h-8 p-1 rounded-full bg-gray-200 text-gray-600" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <button
            onClick={() => {
              signOut();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}