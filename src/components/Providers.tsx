"use client";

import { SnackbarProvider } from "notistack";
import Navbar from "./Navbar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Navbar />

      {children}
    </SnackbarProvider>
  );
}
