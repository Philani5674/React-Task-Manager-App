import React from 'react';
import { Layout } from 'lucide-react';
import { LoginButton } from '../auth/LoginButton';
import { UserMenu } from '../auth/UserMenu';
import { useAuthStore } from '../../store/useAuthStore';

export function Header() {
  const { user } = useAuthStore();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layout className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
          </div>
          <div>
            {user ? <UserMenu /> : <LoginButton />}
          </div>
        </div>
      </div>
    </header>
  );
}