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
  primaryAction,
  secondaryAction,
  onBack,
  backLink,
}: AdaptiveModalContainerProps) => {
  return (
    <AdaptiveModalUi 
      isOpen={isOpen} 
      title={modalTitle} 
      onClose={onClose}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
      onBack={onBack}
      backLink={backLink}
    >
      {children}
    </AdaptiveModalUi>
  );
}; 