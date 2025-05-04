"use client";

import React from "react";
import { ModalUi } from "@/components/ui/ModalUi";

import { DealFormData } from "@/components/feature/DealForm/DealForm";
import { TaskFormData } from "@/components/feature/TaskForm/TaskForm";

import { FieldValues } from "react-hook-form";

type ModalsContainerProps<T> = {
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

export const ModalContainer = <T extends FieldValues>({
  modalTitle,
  isOpen,
  onClose,

  children,
}: ModalsContainerProps<T>) => {
  return (
    <ModalUi isOpen={isOpen} title={modalTitle} onClose={onClose}>
      {children}
    </ModalUi>
  );
};
