"use client";

import React from "react";
import { AdaptiveModalUi } from "@/components/ui/AdaptiveModalUi";
import { Client, Deal, Task } from "@/utils/types";

export type AdaptiveModalContainerProps = {
  modalTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  children: React.ReactNode;
  onBack?: () => void;
  backLink?: string;
};

export type EntityTypeMap = {
  client: Client;
  deal: Deal;
  task: Task;
};

export const AdaptiveModalContainer = ({
  modalTitle,
  isOpen,
  onClose,
  children,
  onBack,
  backLink,
}: AdaptiveModalContainerProps) => {
  return (
    <AdaptiveModalUi 
      isOpen={isOpen} 
      title={modalTitle} 
      onClose={onClose}
      onBack={onBack}
      backLink={backLink}
    >
      {children}
    </AdaptiveModalUi>
  );
}; 