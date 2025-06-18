import { MainPageInfoContainer } from "@/components/shared/MainPageInfoContainer/MainPageInfocontainer";
import { TableContainer } from "@/components/shared/TableContainer/TableContainer";
import { MainPageClientCard } from "@/components/ui/MainPageCards/MainPageClientCard";
import { MainPageTaskCard } from "@/components/ui/MainPageCards/MainPageTaskCard";
import { MainPageDealCard } from "@/components/ui/MainPageCards/MainPageDealCard";

import {
  ColumnDefinition,
  StatisticsI,
  MainPageInfoDesktopI,
} from "@/utils/types";
import { useMemo } from "react";
import { useLoaderStore } from "@/store/useLoaderStore";
import { ButtonUi } from "@/components/ui/ButtonUi";

import { useModalStore } from "@/store/modalStore";

export const MainPageInfoDesktop = ({
  params,
}: {
  params: MainPageInfoDesktopI;
}) => {
  const { statisticsTableData, clients, deals, tasks } = params;

  const { openModal, closeModal } = useModalStore();

  const { isLoading } = useLoaderStore();

  const statisticsColumns: ColumnDefinition<StatisticsI>[] = useMemo(
    () => [
      {
        key: "name",
        label: "",
        render: (value: number | string) => (
          <span className="dark:text-white font-bold">{value}</span>
        ),
      },
      {
        key: "on_today",
        label: "на сегодня",
        render: (value: number | string) => (
          <span className="text-blue-500 font-bold">{value}</span>
        ),
      },
      {
        key: "today",
        label: "за сегодня",
        render: (value: number | string) => (
          <span className="text-emerald-500 font-bold">{value}</span>
        ),
      },
      {
        key: "week",
        label: "за неделю",
        render: (value: number | string) => (
          <span className="text-emerald-500 font-bold">{value}</span>
        ),
      },
      {
        key: "month",
        label: "за месяц",
        render: (value: number | string) => (
          <span className="text-emerald-500 font-bold">{value}</span>
        ),
      },
      {
        key: "quarter",
        label: "за квартал",
        render: (value: number | string) => (
          <span className="text-emerald-500 font-bold">{value}</span>
        ),
      },
    ],
    []
  );

  return (
    <div className="hidden md:flex flex-col gap-10">
      {statisticsTableData && (
        <TableContainer<StatisticsI>
          tableData={statisticsTableData}
          columns={statisticsColumns}
          isLoading={isLoading}
        />
      )}

      <MainPageInfoContainer
        title="Топ 10 активных клиентов"
        pageType="clients"
        actionButton={
          <ButtonUi
            onClick={() => {
              openModal({
                formFieldKey: "client",
                title: "Новый клиент",
                requestLink: "api/clients",
                modalType: "new",
                primaryAction: {
                  text: "Создать",
                  type: "submit",
                  variant: "submit",
                },
                secondaryAction: {
                  text: "Отмена",
                  variant: "default",
                  onClick: closeModal,
                },
              });
            }}
            variant="primary"
            disabled={isLoading}
            label={"Новый клиент"}
          />
        }
      >
        {clients?.length > 0
          ? clients?.map((client) => (
              <MainPageClientCard
                key={client?.id}
                name={client.name}
                company={client.company}
                dealsCount={client?.dealsCount}
              />
            ))
          : null}
      </MainPageInfoContainer>

      <MainPageInfoContainer
        title="Топ 10 активных сделок"
        isGrid={false}
        pageType="deals"
        actionButton={
          <ButtonUi
            onClick={() => {
              openModal({
                formFieldKey: "deal",
                title: "Новая сделка",
                requestLink: "api/deals",
                modalType: "new",
                primaryAction: {
                  text: "Создать",
                  type: "submit",
                  variant: "submit",
                },
                secondaryAction: {
                  text: "Отмена",
                  variant: "default",
                  onClick: closeModal,
                },
              });
            }}
            variant="primary"
            disabled={isLoading}
            label={"Новая сделка"}
          />
        }
      >
        {" "}
        {deals?.length
          ? deals.map((deal) => {
              const clientName =
                clients.find((client) => client?.id === deal?.clientId)?.name ||
                undefined;

              return (
                <MainPageDealCard
                  key={deal?.id}
                  name={deal.name}
                  status={deal.status}
                  clientName={clientName}
                  amount={deal?.amount}
                  created_at={deal?.created_at}
                />
              );
            })
          : null}
      </MainPageInfoContainer>
      <MainPageInfoContainer
        title="Последние 10 задач"
        pageType="tasks"
        actionButton={
          <ButtonUi
            onClick={() => {
              openModal({
                formFieldKey: "task",
                title: "Новая задача",
                requestLink: "api/tasks",
                modalType: "new",
                primaryAction: {
                  text: "Создать",
                  type: "submit",
                  variant: "submit",
                },
                secondaryAction: {
                  text: "Отмена",
                  variant: "default",
                  onClick: closeModal,
                },
              });
            }}
            variant="primary"
            disabled={isLoading}
            label={"Новая задача"}
          />
        }
      >
        {tasks?.length > 0
          ? tasks?.map((task) => (
              <MainPageTaskCard
                key={task?.id}
                name={task.name}
                deal={
                  deals?.find((el) => el?.id === task.dealId)?.name || undefined
                }
                deadline={task?.deadline}
                status={task?.status}
              />
            ))
          : null}
      </MainPageInfoContainer>
    </div>
  );
};
