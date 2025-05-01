"use client";

import { SnackbarProvider } from "notistack";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      {children}
    </SnackbarProvider>
  );
}
