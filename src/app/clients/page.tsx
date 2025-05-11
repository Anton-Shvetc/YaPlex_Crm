"use client";

import { EntityPageContainer } from "@/components/feature/EntityPageContainer/EntityPageContainer";
import { deleteItem } from "@/services/deleteItem";
import { getParamsData } from "@/services/getParamsData";
import { useClientStore } from "@/store/clientStore";
import { useModalStore } from "@/store/modalStore";
import { useLoaderStore } from "@/store/useLoaderStore";
import { formatDate } from "@/utils/formatters";
import { Client, ColumnDefinition } from "@/utils/types";

export default function ClientsPage() {
  const { clients, setClients } = useClientStore();

  const { startLoading, stopLoading } = useLoaderStore();
  const { closeModal } = useModalStore();

  const updateTableData = () => {
    getParamsData<Client>("api/clients", setClients, {
      startLoading,
      stopLoading,
    });
  };

  const clientTableColumns: ColumnDefinition<Client>[] = [
    { key: "name", label: "Имя" },

    { key: "phone", label: "Телефон" },
    { key: "email", label: "Email" },
    { key: "company", label: "Название компании" },
    { key: "website", label: "Сайт" },
    { key: "comment", label: "Комментарий" },
    {
      key: "created_at",
      label: "Добавлен",
      render: (value: number | string) => (
        <span>{formatDate(value.toString())}</span>
      ),
    },
  ];

  const handleDelete = (id: number | undefined) => {
    if (id) {
      deleteItem({
        id: id,
        endpoint: "api/clients",
        onSuccess: () => updateTableData(),
        loaderMethods: {
          startLoading: startLoading,
          stopLoading: stopLoading,
        },
        successMessage: "Клиент успешно деактивирован",
        errorMessage: "Не удалось деактивировать клиента",
      });
    }
  };

  return (
    <EntityPageContainer
      entityType="client"
      // actionButtonText="Новый клиент"
      modalTargetText={(modalType: string) =>
        modalType === "new" ? "Новый клиент" : "Карточка клиента"
      }
      requestLink="api/clients"
      pageTitle="Клиенты"
      tableData={clients}
      columns={clientTableColumns}
      updateTableData={updateTableData}
      primaryActionButton={(modalType: string) => ({
        text: modalType === "new" ? "Создать" : "Редактировать",
        type: "submit",
        varinat: "submit",
        // onClick: () => {},
      })}
      secondaryActionButton={(modalType: string, id: number | undefined) => ({
        text: modalType === "new" ? "Отмена" : "Удалить клиента",
        variant: "delete",
        type: "button",
        onClick: () => (modalType === "new" ? closeModal() : handleDelete(id)),
      })}
      // formComponent={ClientForm}
    />
  );
}
