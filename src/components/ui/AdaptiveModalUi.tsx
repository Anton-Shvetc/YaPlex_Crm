"use client";

import React, { Fragment, ReactNode } from "react";
import {
  Transition,
  DialogPanel,
  TransitionChild,
  DialogTitle,
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
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="min-h-full flex">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="w-full transform bg-white dark:bg-gray-900 flex flex-col overflow-hidden md:rounded-lg md:max-w-[580px] md:m-auto">
                {/* Мобильная шапка с кнопкой назад */}
                <div className="block px-6 py-3 flex md:hidden items-center justify-between">
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
                    </div>
                  )}
                </div>

                {/* Десктопная шапка */}
                <div className="hidden md:block px-6 py-3">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    {title}
                  </DialogTitle>
                </div>

                {/* Основное содержимое */}
                <div className="flex-1 overflow-y-auto px-6 pb-4">
                  {children}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
