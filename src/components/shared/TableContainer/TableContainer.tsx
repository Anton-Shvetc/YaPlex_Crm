import { useClientStore } from "@/store/clientStore";

export const TableContainer = () => {
  const { clients } = useClientStore();

  console.log("clients", clients);
  return (
    <>
      {clients.map((client, index) => (
        <div key={client?.id}>{client?.name}</div>
      ))}
    </>
  );
};
