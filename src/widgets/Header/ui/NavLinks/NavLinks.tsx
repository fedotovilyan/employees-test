import classNames from "classnames";
import { FC } from "react";
import cls from "./NavLinks.module.scss";
import { ButtonLink } from "@/shared/ui";
import { useLocation, useParams } from "react-router-dom";
import { getRoute } from "@/shared/utils/getRoute";
import { ROUTES } from "@/shared/routes";

const items = [
  {
    label: "Главная",
    href: ROUTES.home,
  },
  {
    label: "Сотрудники",
    href: ROUTES.employees,
  },
];

interface NavLinksProps {
	className?: string;
}

export const NavLinks: FC<NavLinksProps> = ({ className }) => {
	const { pathname } = useLocation();
	const params = useParams();

	return (
    <div className={classNames(cls.NavLinks, className)}>
      {items.map((item) => (
        <ButtonLink
          href={item.href}
          key={item.label}
          className={classNames({
            [cls.current]: pathname === getRoute(item.href, params),
            [cls.link]: true,
          })}
        >
          {item.label}
        </ButtonLink>
      ))}
    </div>
  );
};
