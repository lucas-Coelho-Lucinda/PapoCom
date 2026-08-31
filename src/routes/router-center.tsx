import "../index.css";
import { Router } from "./router";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../pages/authentication/react-query";
import { CollpasedProvider } from "../context/collapsed";

export const RouterCenter = () => {
  return (
    <>
      <Toaster richColors={true} />

      <QueryClientProvider client={queryClient}>
        <CollpasedProvider>
          <RouterProvider router={Router} />
        </CollpasedProvider>
      </QueryClientProvider>
    </>
  );
};
