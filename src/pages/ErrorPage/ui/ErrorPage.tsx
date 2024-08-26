import { useRouteError } from "react-router-dom";
import { Alert, AlertType } from "../../../shared/ui/Alert/Alert";
import cls from "./ErrorPage.module.scss";

export const ErrorPage = () => {
	const error = useRouteError();
	console.log(error);

  return (
    <div className={cls.error_page_container}>
      <Alert type={AlertType.Error}>
        Что-то пошло не так. Попробуйте перезагрузить страницу
      </Alert>
    </div>
  );
};
