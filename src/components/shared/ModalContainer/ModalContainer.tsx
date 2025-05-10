// "use client";

// import React from "react";
// import { ModalUi } from "@/components/ui/ModalUi";
// import { Client, Deal, Task } from "@/utils/types";

// export type ModalsContainerProps = {
//   modalTitle: string;
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit?: () => void;
//   children: React.ReactNode;
// };

// export type EntityTypeMap = {
//   client: Client;
//   deal: Deal;
//   task: Task;
// };

// export const ModalContainer = ({
//   modalTitle,
//   isOpen,
//   onClose,

//   children,
// }: ModalsContainerProps) => {
//   return (
//     <ModalUi isOpen={isOpen} title={modalTitle} onClose={onClose}>
//       {children}
//     </ModalUi>
//   );
// };
