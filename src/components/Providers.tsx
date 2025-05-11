"use client";

import { SnackbarProvider } from "notistack";
import AdaptiveNavbar from "./AdaptiveNavbar";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { AdaptiveModalContainer } from "@/components/shared/ModalContainer/AdaptiveModalContainer";
import { FormWrapper } from "@/components/shared/FormWrapper/FormWrapper";
import { useForm } from "react-hook-form";
import { useModalStore } from "@/store/modalStore";

import { ClientForm } from "@/components/feature/ClientForm/ClientForm";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {
    isOpenModal,
    modalType,
    formData,
    formFieldKey,
    onSubmit,
    modalTitle,
    closeModal,
  } = useModalStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();

  // const onSubmit = (data: any) => {};

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleCloseModal = () => {
    reset({} as any);
    // setModalState((prev) => ({ ...prev, isOpen: false }));
    closeModal();
  };

  useEffect(() => {
    modalType === "edit" ? reset(formData) : reset({} as any);

    console.log("debug222", formData, modalType);
  }, [formData, modalType]);

  return (
    <SnackbarProvider
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <div className="flex flex-col md:flex-row h-screen overflow-y-hidden bg-white dark:bg-gray-900">
        {pathname !== "/login" && <AdaptiveNavbar />}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>

      <AdaptiveModalContainer
        modalTitle={modalTitle}
        isOpen={isOpenModal}
        onClose={handleCloseModal}
      >
        <FormWrapper
          onSubmit={onSubmit ? handleSubmit(onSubmit) : () => {}}

          // primaryAction={{
          //   text: modalType === "new" ? "Создать" : "Редактировать",
          //   type: "submit",
          //   varinat: "submit",
          //   onClick: () => {},
          // }}
          // secondaryAction={{
          //   text: modalType === "new" ? "Отмена" : "Удалить клиента",
          //   variant: "delete",
          //   onClick: () => closeModal(),
          //   // onClick: () => handleDelete(id),
          // }}
        >
          <div className="grid grid-cols-1 gap-4">
            {formFieldKey === "client" && (
              <ClientForm register={register} errors={errors} />
            )}

            {/* <ClientForm register={register} errors={errors} /> */}
          </div>
        </FormWrapper>
      </AdaptiveModalContainer>
    </SnackbarProvider>
  );
}
