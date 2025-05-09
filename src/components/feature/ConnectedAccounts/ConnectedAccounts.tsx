"use client";

import React from 'react';
import Image from 'next/image';
import { ButtonUi } from '@/components/ui/ButtonUi';

interface ConnectedAccount {
  id: string;
  type: 'vk' | 'google';
  connected: boolean;
  username?: string;
}

interface ConnectedAccountsProps {
  accounts: ConnectedAccount[];
  onConnect: (type: 'vk' | 'google') => void;
  showHeader?: boolean;
  className?: string;
}

export function ConnectedAccounts({ 
  accounts, 
  onConnect,
  showHeader = true,
  className = ''
}: ConnectedAccountsProps) {
  const vkAccount = accounts.find(acc => acc.type === 'vk');
  const googleAccount = accounts.find(acc => acc.type === 'google');
  
  return (
    <div className={className}>
      {showHeader && (
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Подключённые аккаунты</h2>
      )}
      
      {/* Мобильная версия - горизонтальное расположение */}
      <div className="flex md:hidden justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image 
            src="/VK.svg" 
            alt="VK" 
            width={33} 
            height={32} 
          />
          {vkAccount?.connected ? (
            <span className="text-sm font-medium text-gray-800 dark:text-white">
              {vkAccount.username}
            </span>
          ) : (
            <ButtonUi
              type="button"
              onClick={() => onConnect('vk')}
              label="Подключить"
              variant="link"
            />
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Image 
            src="/Gmail.svg" 
            alt="Google" 
            width={43} 
            height={32} 
          />
          {googleAccount?.connected ? (
            <span className="text-sm font-medium text-gray-800 dark:text-white">
              {googleAccount.username}
            </span>
          ) : (
            <ButtonUi
              type="button"
              onClick={() => onConnect('google')}
              label="Подключить"
              variant="link"
            />
          )}
        </div>
      </div>

      {/* Десктопная версия - вертикальное расположение с иконками сверху */}
      <div className="hidden md:flex md:flex-row md:gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center w-auto h-auto rounded-md overflow-hidden">
            <Image 
              src="/VK.svg" 
              alt="VK" 
              width={33} 
              height={32} 
            />
          </div>
          {vkAccount?.connected ? (
            <span className="text-sm font-medium text-gray-800 dark:text-white text-center">
              {vkAccount.username?.split(' ').map((part, i) => (
                <span key={i}>
                  {part}
                  {i === 0 && <br />}
                </span>
              ))}
            </span>
          ) : (
            <ButtonUi
              type="button"
              onClick={() => onConnect('vk')}
              label="Подключить"
              variant="link"
            />
          )}
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center w-auto h-auto rounded-md overflow-hidden">
            <Image 
              src="/Gmail.svg" 
              alt="Google" 
              width={43} 
              height={32} 
            />
          </div>
          {googleAccount?.connected ? (
            <span className="text-sm font-medium text-gray-800 dark:text-white text-center">
              {googleAccount.username?.split(' ').map((part, i) => (
                <span key={i}>
                  {part}
                  {i === 0 && <br />}
                </span>
              ))}
            </span>
          ) : (
            <ButtonUi
              type="button"
              onClick={() => onConnect('google')}
              label="Подключить"
              variant="link"
            />
          )}
        </div>
      </div>
    </div>
  );
} 