"use client";

import React, { Fragment, ReactNode } from "react";
import {
  Transition,
  DialogPanel,
} from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import { DialogBackdrop } from "@/components/shared/ModalContainer/ModalFix";
import Link from "next/link";

type AdaptiveModalUiProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onBack?: () => void;
  backLink?: string;
};

export const AdaptiveModalUi: React.FC<AdaptiveModalUiProps> = ({
  isOpen,
  onClose,
  title,
  children,
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
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="min-h-full flex">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="w-full transform bg-white dark:bg-gray-900 flex flex-col overflow-hidden md:rounded-lg md:max-w-lg md:m-auto md:max-h-[80vh]">
                {/* Шапка с кнопкой назад */}
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
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
                    <div className="flex items-center justify-between w-full">
                      <BackButton />
                      <button
                        className="rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        onClick={onClose}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Основное содержимое */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                  {children}
                </div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}; 