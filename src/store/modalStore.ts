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
  formFieldKey?: string;
  requestLink: string | undefined;
  modalTitle: string;
  modalType: "new" | "edit";

  primaryAction: ModalAction | undefined;
  secondaryAction: ModalAction | undefined;
  formData: any;

  openModal: (params: {
    title: string;
    modalType?: "new" | "edit";
    formFieldKey?: string;
    requestLink?: string | undefined;
    primaryAction?: ModalAction;
    secondaryAction?: ModalAction;
    modalId?: string | number | undefined;
    formData?: any;
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
  requestLink: undefined,
  primaryAction: undefined,
  secondaryAction: undefined,
  formData: null,

  openModal: ({
    title,
    modalType,
    formFieldKey,
    requestLink,
    primaryAction,
    secondaryAction,
    modalId,
    formData,
  }) => {
    set({
      isOpenModal: true,
      modalType: modalType || "new",
      requestLink: requestLink,
      formFieldKey: formFieldKey,

      modalTitle: title,
      primaryAction: primaryAction || undefined,
      secondaryAction: secondaryAction || undefined,
      modalId: modalId,
      formData: formData,
    });
  },

  closeModal: () => {
    set({
      modalId: undefined,
      isOpenModal: false,
      requestLink: undefined,
      formFieldKey: "",
      modalTitle: "",
      modalType: "new",
      primaryAction: undefined,
      secondaryAction: undefined,
      formData: null,
    });
  },
}));
