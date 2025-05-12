"use client";

import { enqueueSnackbar, SnackbarProvider } from "notistack";
import AdaptiveNavbar from "./AdaptiveNavbar";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { AdaptiveModalContainer } from "@/components/shared/ModalContainer/AdaptiveModalContainer";
import { FormWrapper } from "@/components/shared/FormWrapper/FormWrapper";
import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { useModalStore } from "@/store/modalStore";

import { ClientForm } from "@/components/feature/ClientForm/ClientForm";
import { DealForm } from "./feature/DealForm/DealForm";
import { Client, Deal, EntityFormMap, Task } from "@/utils/types";
import { FetchService } from "@/services/fetcher";
import { useLoaderStore } from "@/store/useLoaderStore";
import { TaskForm } from "./feature/TaskForm/TaskForm";
import { getParamsData } from "@/services/getParamsData";
import { useClientStore } from "@/store/clientStore";
import { useDealsStore } from "@/store/dealsStore";
import { useTasksStore } from "@/store/tasksStore";

export function Providers({ children }: { children: React.ReactNode }) {
  const { startLoading, stopLoading } = useLoaderStore();

  const { setClients } = useClientStore();
  const { setDeals } = useDealsStore();
  const { setTasks } = useTasksStore();

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
  } = useForm<EntityFormMap[keyof EntityFormMap]>();

  const onSubmit: SubmitHandler<EntityFormMap[keyof EntityFormMap]> = async (
    data
  ) => {
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

        if (formFieldKey === "client")
          getParamsData<Client>(
            `api/clients${pathname === "/" ? "?limits=10" : ""}`,
            setClients
          );
        if (formFieldKey === "deal")
          getParamsData<Deal>(
            `api/deals${pathname === "/" ? "?limits=10" : ""}`,
            setDeals
          );
        if (formFieldKey === "task")
          getParamsData<Task>(
            `api/tasks${pathname === "/" ? "?limits=10" : ""}`,
            setTasks
          );

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
    reset({} as EntityFormMap[keyof EntityFormMap]);
    // setModalState((prev) => ({ ...prev, isOpen: false }));
    closeModal();
  };

  useEffect(() => {
    if (modalType === "edit") {
      reset(formData as Client | Deal | Task);
    } else {
      reset({} as EntityFormMap[keyof EntityFormMap]);
    }
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
        <FormWrapper onSubmit={onSubmit ? handleSubmit(onSubmit) : () => {}}>
          <div className="grid grid-cols-1 gap-4">
            {formFieldKey === "client" && (
              <ClientForm
                register={register as UseFormRegister<Client>}
                errors={errors as FieldErrors<Client>}
              />
            )}
            {formFieldKey === "deal" && (
              <DealForm
                register={register as UseFormRegister<Deal>}
                errors={errors as FieldErrors<Deal>}
              />
            )}
            {formFieldKey === "task" && (
              <TaskForm
                register={register as UseFormRegister<Task>}
                errors={errors as FieldErrors<Task>}
              />
            )}

            {/* <ClientForm register={register} errors={errors} /> */}
          </div>
        </FormWrapper>
      </AdaptiveModalContainer>
    </SnackbarProvider>
  );
}
