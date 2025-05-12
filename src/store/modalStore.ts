import { create } from "zustand";

import { Client, Deal, Task } from "@/utils/types";

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
  formData?: Client | Deal | Task | null; 

  openModal: (params: {
    title: string; 
    modalType?: "new" | "edit";
    formFieldKey?: string;
    requestLink?: string | undefined;
    primaryAction?: ModalAction;
    secondaryAction?: ModalAction;
    modalId?: string | number | undefined;
    formData?: Client | Deal | Task | null; 
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
