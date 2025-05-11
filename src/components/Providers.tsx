"use client";

import { enqueueSnackbar, SnackbarProvider } from "notistack";
import AdaptiveNavbar from "./AdaptiveNavbar";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { AdaptiveModalContainer } from "@/components/shared/ModalContainer/AdaptiveModalContainer";
import { FormWrapper } from "@/components/shared/FormWrapper/FormWrapper";
import { SubmitHandler, useForm } from "react-hook-form";
import { useModalStore } from "@/store/modalStore";

import { ClientForm } from "@/components/feature/ClientForm/ClientForm";
import { DealForm } from "./feature/DealForm/DealForm";
import { EntityFormMap } from "@/utils/types";
import { FetchService } from "@/services/fetcher";
import { useLoaderStore } from "@/store/useLoaderStore";
import { TaskForm } from "./feature/TaskForm/TaskForm";

export function Providers({ children }: { children: React.ReactNode }) {
  const { startLoading, stopLoading } = useLoaderStore();

  const pathname = usePathname();
  const {
    isOpenModal,
    modalType,
    formData,
    formFieldKey,
    requestLink,
    modalTitle,
    closeModal,
  } = useModalStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (!requestLink) return;
    try {
      startLoading();
      let response;

      if (modalType === "new") {
        response = await new FetchService().POST(requestLink, data).send();
      } else if (modalType === "edit") {
        // Для PUT запроса обычно нужно добавлять ID в URL
        response = await new FetchService()
          .PUT(`${requestLink}/${data.id}`, data) // предполагая, что itemId есть в modalState
          .send();
      } else {
        throw new Error("Неизвестный тип операции");
      }

      const { success, message } = response;

      enqueueSnackbar(message, { variant: success ? "success" : "error" });

      if (success) {
        // reset();
        // setModalState((prev) => ({ ...prev, isOpen: false }));
        closeModal();

        // if (updateTableData) updateTableData();
      }
      stopLoading();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Ошибка при создании ", { variant: "error" });
    }
  };

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
            {formFieldKey === "deal" && (
              <DealForm register={register} errors={errors} />
            )}
            {formFieldKey === "task" && (
              <TaskForm register={register} errors={errors} />
            )}

            {/* <ClientForm register={register} errors={errors} /> */}
          </div>
        </FormWrapper>
      </AdaptiveModalContainer>
    </SnackbarProvider>
  );
}
