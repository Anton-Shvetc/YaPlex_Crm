import { create } from "zustand";
import { ReactNode } from "react";
import React from "react";

interface ModalAction {
  text: string;
  type?: "button" | "submit";
  variant?: "submit" | "delete" | "default";
  className?: string;
  modalId?: string | number | undefined;
  onClick?: () => void;
  closeModal?: () => void;
}

interface ModalState {
  modalId?: string | number | undefined;
  isOpenModal: boolean;
  formFieldKey: string;

  modalTitle: string;
  modalType: "new" | "edit";

  primaryAction: ModalAction | undefined;
  secondaryAction: ModalAction | undefined;
  formData: any;
  onSubmit: any;

  openModal: (params: {
    title: string;
    modalType?: "new" | "edit";
    formFieldKey?: string;
    primaryAction?: ModalAction;
    secondaryAction?: ModalAction;
    modalId?: string | number | undefined;
    formData?: any;
    onSubmit?: any;
  }) => void;
  onClick?: () => void;
  closeModal: () => void;
}
export const useModalStore = create<ModalState>((set) => ({
  modalId: undefined,
  isOpenModal: false,
  formFieldKey: "",
  modalTitle: "",
  modalType: "new",
  primaryAction: undefined,
  secondaryAction: undefined,
  formData: null,
  onSubmit: undefined,

  openModal: ({
    title,
    modalType,
    formFieldKey,

    primaryAction,
    secondaryAction,
    modalId,
    formData,
    onSubmit,
  }) => {
    set({
      isOpenModal: true,
      modalType: modalType || "new",

      formFieldKey: formFieldKey,

      modalTitle: title,
      primaryAction: primaryAction || undefined,
      secondaryAction: secondaryAction || undefined,
      modalId: modalId,
      formData: formData,
      onSubmit: onSubmit,
    });
  },

  closeModal: () => {
    set({
      modalId: undefined,
      isOpenModal: false,

      formFieldKey: "",
      modalTitle: "",
      modalType: "new",
      primaryAction: undefined,
      secondaryAction: undefined,
    });
  },
}));
