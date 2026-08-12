import "../index.css";
import { Router } from "./router";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../pages/authentication/react-query";



export const RouterCenter = () => {
  return (
    <>
      <Toaster richColors={true} />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Router} />
      </QueryClientProvider>
    </>
  );
};
