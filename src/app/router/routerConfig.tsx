import { redirect, RouteObject } from "react-router-dom";
import { ErrorPage } from "../../pages/ErrorPage/ui/ErrorPage";
import { Layout } from "@/widgets/Layout/Layout";
import { ROUTES } from "@/shared/routes";
import { EmployeesPage } from "@/pages/EmployeesPage";
import { Suspense } from "react";
import { Loader } from "@/shared/ui";
import { store } from "../store/store";
import { fetchEmployees, selectEmployeesStatus } from "@/entities/Employee";
import { EmployeePage } from "@/pages/EmployeePage";

export const routerConfig: RouteObject[] = [
  {
    path: ROUTES.home,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: () => redirect(ROUTES.employees),
      },
      {
        path: ROUTES.employees,
        element: (
          <Suspense fallback={<Loader fullscreen spinning />}>
            <EmployeesPage />
          </Suspense>
        ),
        loader: () => {
          const status = selectEmployeesStatus(store.getState());
          if (status !== "idle") return null;

          store.dispatch(fetchEmployees());
          return null;
        },
      },
      {
        path: ROUTES.employee,
        loader: () => {
          const status = selectEmployeesStatus(store.getState());
          if (status !== "idle") return null;

          store.dispatch(fetchEmployees());
          return null;
        },
        element: <EmployeePage />,
      },
    ],
  },
];

