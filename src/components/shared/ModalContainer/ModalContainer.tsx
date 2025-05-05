"use client";

import React from "react";
import { ModalUi } from "@/components/ui/ModalUi";

import { DealFormData } from "@/components/feature/DealForm/DealForm";
import { TaskFormData } from "@/components/feature/TaskForm/TaskForm";

export type ModalsContainerProps = {
  modalTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  children: React.ReactNode;
};

export type EntityTypeMap = {
  client: ClientFormData;
  deal: DealFormData;
  task: TaskFormData;
};

export type ClientFormData = {
  name: string;
  phone: string;
  company: string;
  website: string;
  email: string;
  comment: string;
};

export const ModalContainer = ({
  modalTitle,
  isOpen,
  onClose,

  children,
}: ModalsContainerProps) => {
  return (
    <ModalUi isOpen={isOpen} title={modalTitle} onClose={onClose}>
      {children}
    </ModalUi>
  );
};
