import { Header } from "../Header/ui/Header";
import cls from './Layout.module.scss';
import { Footer } from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useScrollToTop } from "@/shared/hooks/useScrollToTop";

export const Layout = () => {
  useScrollToTop();

	return (
    <div className={cls.layout}>
      <Header />
      <div className={cls.main_wrapper}>
        <main className={cls.main}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};