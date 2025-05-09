"use client";

import React, { Fragment, ReactNode } from "react";
import {
  Dialog,
  Transition,
  DialogPanel,
} from "@headlessui/react";
import Link from "next/link";

type AdaptiveModalUiProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  primaryAction?: {
    text: string;
    onClick?: () => void;
    className?: string;
    type: "button" | "submit";
  };
  secondaryAction?: {
    text: string;
    onClick: () => void;
    className?: string;
    type: "button" | "submit";
  };
  onBack?: () => void;
  backLink?: string;
};

export const AdaptiveModalUi: React.FC<AdaptiveModalUiProps> = ({
  isOpen,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
  onBack,
  backLink,
}) => {
  const handleBackAction = () => {
    if (onBack) {
      onBack();
    } else {
      onClose();
    }
  };

  const BackButton = () => (
    <button
      onClick={handleBackAction}
      className="flex items-center text-gray-700 dark:text-gray-300"
      aria-label="Назад"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      <span className="ml-2">{title}</span>
    </button>
  );

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Фоновое затемнение */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        {/* Десктопное модальное окно (md:flex) / Мобильное модальное окно (flex md:hidden) */}
        <div className="fixed inset-0 overflow-y-auto">
          {/* Десктопная версия - центрированное модальное окно */}
          <div className="hidden md:flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform rounded-lg bg-white dark:bg-gray-900 p-6 shadow-xl transition-all">
                <div className="mb-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    {title}
                  </h2>
                </div>

                <div className="mt-2 text-gray-800 dark:text-gray-200">
                  {children}
                </div>

                {(primaryAction || secondaryAction) && (
                  <div className="mt-6 flex gap-3">
                    {primaryAction && (
                      <button
                        type={primaryAction.type}
                        className={`w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${
                          primaryAction.className || ""
                        }`}
                        onClick={primaryAction.onClick}
                      >
                        {primaryAction.text}
                      </button>
                    )}
                    {secondaryAction && (
                      <button
                        type={secondaryAction.type}
                        className={`w-full px-4 py-2 bg-gray-200 dark:bg-transparent text-gray-800 dark:text-white border border-gray-400 dark:border-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors ${
                          secondaryAction.className || ""
                        }`}
                        onClick={secondaryAction.onClick}
                      >
                        {secondaryAction.text}
                      </button>
                    )}
                  </div>
                )}
              </DialogPanel>
            </Transition.Child>
          </div>

          {/* Мобильная версия */}
          <div className="flex md:hidden min-h-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-full"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-full"
            >
              <DialogPanel className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col overflow-hidden">
                {/* Шапка с кнопкой назад */}
                <div className="px-4 py-4 border-b mb-[102px] border-gray-200 dark:border-gray-700 flex items-center">
                  {backLink ? (
                    <Link
                      href={backLink}
                      className="flex items-center text-gray-700 dark:text-gray-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                      <span className="ml-2">{title}</span>
                    </Link>
                  ) : (
                    <BackButton />
                  )}
                </div>

                {/* Основное содержимое */}
                <div className="flex-1 overflow-y-auto p-4 [&_.grid]:grid-cols-1 [&_.col-span-2]:col-span-1">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {title}
                  </h2>
                  {children}
                </div>

                {/* Кнопка сохранения */}
                {primaryAction && (
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      type={primaryAction.type}
                      className={`w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ${
                        primaryAction.className || ""
                      }`}
                      onClick={primaryAction.onClick}
                    >
                      {primaryAction.text}
                    </button>
                  </div>
                )}
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}; 