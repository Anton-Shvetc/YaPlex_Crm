// "use client";

// import React, { Fragment, ReactNode } from "react";
// import {
//   Dialog,
//   Transition,
//   TransitionChild,
//   DialogPanel,
//   DialogTitle,
// } from "@headlessui/react";

// type ModalUiProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   children: ReactNode;
//   // primaryAction?: {
//   //   text: string;
//   //   onClick?: () => void;
//   //   className?: string;
//   //   type: "button" | "submit";
//   // };
//   // secondaryAction?: {
//   //   text: string;
//   //   onClick: () => void;
//   //   className?: string;
//   // };
// };

// export const ModalUi: React.FC<ModalUiProps> = ({
//   isOpen,
//   onClose,
//   title,
//   children,
//   // primaryAction,
//   // secondaryAction,
// }) => {
//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={onClose}>
//         <TransitionChild
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black/50" />
//         </TransitionChild>

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4">
//             <TransitionChild
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <DialogPanel className="w-full max-w-md transform rounded-lg bg-white dark:bg-gray-900 p-6 shadow-xl transition-all">
//                 <DialogTitle
//                   as="h3"
//                   className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4"
//                 >
//                   {title}
//                 </DialogTitle>

//                 <div className="mt-2 text-gray-800 dark:text-gray-200">
//                   {children}
//                 </div>

//                 {/* {(primaryAction || secondaryAction) && (
//                   <div className="mt-6 flex gap-3">
//                     {primaryAction && (
//                       <button
//                         type={primaryAction.type}
//                         className={`w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${
//                           primaryAction.className || ""
//                         }`}
//                         onClick={primaryAction.onClick}
//                       >
//                         {primaryAction.text}
//                       </button>
//                     )}
//                     {secondaryAction && (
//                       <button
//                         type="button"
//                         className={`w-full px-4 py-2 bg-gray-200 dark:bg-transparent text-gray-800 dark:text-white border border-gray-400 dark:border-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors ${
//                           secondaryAction.className || ""
//                         }`}
//                         onClick={secondaryAction.onClick}
//                       >
//                         {secondaryAction.text}
//                       </button>
//                     )}
//                   </div>
//                 )} */}
//               </DialogPanel>
//             </TransitionChild>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };
