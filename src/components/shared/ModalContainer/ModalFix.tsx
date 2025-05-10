"use client";

import React from "react";
import { Dialog as HeadlessDialog } from "@headlessui/react";

type DialogProps = Omit<React.ComponentProps<typeof HeadlessDialog>, 'onClose'>;

export function Dialog(props: DialogProps) {
  const noopClose = () => {};
  return <HeadlessDialog onClose={noopClose} {...props} />;
}

/**
 * Компонент для затемнения фона (без функции закрытия)
 */
export const DialogBackdrop: React.FC<React.HTMLProps<HTMLDivElement>> = (props) => {
  return (
    <div 
      {...props} 
      className="fixed inset-0 bg-black/50"
      aria-hidden="true"
    />
  );
};

/**
 * Экспортируем DialogPanel для удобства
 */
export { DialogPanel } from "@headlessui/react"; 